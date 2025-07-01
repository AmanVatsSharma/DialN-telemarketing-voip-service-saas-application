<?php

namespace App\Http\Controllers;

use App\Enums\DocumentStatus;
use App\Enums\KycStatus;
use App\Enums\KycTier;
use App\Http\Requests\KycBasicRequest;
use App\Http\Requests\KycBusinessRequest;
use App\Http\Requests\KycVerifyPhoneRequest;
use App\Jobs\SendPhoneVerificationSms;
use App\Models\UserKycVerification;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KycController extends Controller
{
    /**
     * Display KYC status page
     */
    public function index(): Response
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        return Inertia::render('settings/kyc/index', [
            'kyc' => $kyc ? [
                'id' => $kyc->id,
                'kyc_tier' => $kyc->kyc_tier,
                'status' => $kyc->status,
                'phone_number' => $kyc->phone_number,
                'phone_verified_at' => $kyc->phone_verified_at?->toISOString(),
                'business_name' => $kyc->business_name,
                'submitted_at' => $kyc->submitted_at?->toISOString(),
                'approved_at' => $kyc->approved_at?->toISOString(),
                'expires_at' => $kyc->expires_at?->toISOString(),
                'rejection_reason' => $kyc->rejection_reason,
                'documents_status' => $kyc->getAllDocumentsStatus(),
                'can_verify_phone' => $kyc->canVerifyPhone(),
                'needs_renewal' => $kyc->needsRenewal(),
            ] : null,
        ]);
    }

    /**
     * Show basic (Tier 1) verification form
     */
    public function showBasic(): Response
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        // Check if already verified or pending
        if ($kyc && ($kyc->isApproved() || $kyc->isPending())) {
            return redirect()->route('kyc.index');
        }

        return Inertia::render('settings/kyc/basic', [
            'kyc' => $kyc,
        ]);
    }

    /**
     * Submit basic (Tier 1) verification - phone number
     */
    public function storeBasic(KycBasicRequest $request): RedirectResponse
    {
        $user = auth()->user();

        DB::beginTransaction();
        try {
            // Create or update KYC record
            $kyc = $user->kycVerification()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'kyc_tier' => KycTier::BASIC->value,
                    'status' => KycStatus::PENDING->value,
                    'phone_number' => $request->phone_number,
                    'phone_verification_code' => $this->generateVerificationCode(),
                    'phone_verification_expires_at' => Carbon::now()->addMinutes(10),
                    'phone_verification_attempts' => 0,
                ]
            );

            // Send verification SMS synchronously
            try {
                SendPhoneVerificationSms::dispatchSync($kyc);
                
                \Log::info('SMS dispatched successfully', [
                    'user_id' => $user->id,
                    'phone' => $request->phone_number,
                ]);
                
            } catch (\Exception $smsException) {
                \Log::error('Failed to send SMS in controller', [
                    'error' => $smsException->getMessage(),
                    'trace' => $smsException->getTraceAsString(),
                    'user_id' => $user->id,
                ]);
                DB::rollBack();
                
                $errorMessage = 'Failed to send verification code. ';
                if (str_contains($smsException->getMessage(), 'Twilio configuration')) {
                    $errorMessage .= 'Twilio is not configured properly.';
                } else {
                    $errorMessage .= $smsException->getMessage();
                }
                
                return back()
                    ->withInput()
                    ->with('error', $errorMessage);
            }

            DB::commit();

            \Log::info('KYC basic verification initiated', [
                'user_id' => $user->id,
                'phone' => $request->phone_number,
            ]);

            return redirect()->route('kyc.verify-phone')
                ->with('success', 'Verification code sent to your phone. Please enter the code to verify.');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Failed to store basic KYC', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $user->id,
            ]);
            return back()
                ->withInput()
                ->with('error', 'Failed to process verification request. Please try again. Error: ' . $e->getMessage());
        }
    }

    /**
     * Show phone verification form
     */
    public function showVerifyPhone(): Response
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        if (!$kyc || !$kyc->phone_number) {
            return redirect()->route('kyc.basic');
        }

        if ($kyc->phone_verified_at) {
            return redirect()->route('kyc.index');
        }

        return Inertia::render('settings/kyc/verify-phone', [
            'phone_number' => $kyc->phone_number,
            'attempts_remaining' => 5 - $kyc->phone_verification_attempts,
            'code_expires_at' => $kyc->phone_verification_expires_at?->toISOString(),
        ]);
    }

    /**
     * Verify phone number with code
     */
    public function verifyPhone(KycVerifyPhoneRequest $request): RedirectResponse
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        if (!$kyc || !$kyc->phone_number) {
            return redirect()->route('kyc.basic')
                ->with('error', 'Please submit your phone number first.');
        }

        if ($kyc->phone_verified_at) {
            return redirect()->route('kyc.index')
                ->with('info', 'Phone number is already verified.');
        }

        // Check if code expired
        if ($kyc->phone_verification_expires_at && $kyc->phone_verification_expires_at->isPast()) {
            return back()->with('error', 'Verification code has expired. Please request a new code.');
        }

        // Check attempts limit
        if ($kyc->phone_verification_attempts >= 5) {
            return back()->with('error', 'Maximum verification attempts exceeded. Please request a new code.');
        }

        // Verify code using Twilio Verify API if available
        $globalConfig = \App\Models\TwilioGlobalConfig::active();
        
        if ($globalConfig) {
            $accountSid = $globalConfig->account_sid;
            $authToken = $globalConfig->getDecryptedAuthToken();
        } else {
            $accountSid = config('services.twilio.sid');
            $authToken = config('services.twilio.token');
        }
        
        $verifyServiceSid = config('services.twilio.verify_service_sid');
        
        if ($verifyServiceSid) {
            // Use Twilio Verify API to check the code
            try {
                if (!$accountSid || !$authToken) {
                    return back()->with('error', 'Twilio is not configured properly.');
                }
                
                $client = new \Twilio\Rest\Client($accountSid, $authToken);
                
                $verificationCheck = $client->verify->v2
                    ->services($verifyServiceSid)
                    ->verificationChecks
                    ->create([
                        'to' => $kyc->phone_number,
                        'code' => $request->code
                    ]);
                
                if ($verificationCheck->status !== 'approved') {
                    $kyc->increment('phone_verification_attempts');
                    \Log::warning('Twilio Verify API verification failed', [
                        'user_id' => $user->id,
                        'status' => $verificationCheck->status,
                        'attempts' => $kyc->phone_verification_attempts + 1,
                    ]);
                    return back()->with('error', 'Invalid verification code. Please try again.');
                }
                
                \Log::info('Twilio Verify API verification successful', [
                    'user_id' => $user->id,
                    'phone_number' => $kyc->phone_number,
                ]);
                
            } catch (\Exception $e) {
                $kyc->increment('phone_verification_attempts');
                \Log::error('Twilio Verify API check failed', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage(),
                ]);
                return back()->with('error', 'Invalid verification code. Please try again.');
            }
        } else {
            // Fallback to manual code verification
            if ($request->code !== $kyc->phone_verification_code) {
                $kyc->increment('phone_verification_attempts');
                return back()->with('error', 'Invalid verification code. Please try again.');
            }
        }

        // Success - verify phone and approve Tier 1
        DB::beginTransaction();
        try {
            $kyc->update([
                'phone_verified_at' => Carbon::now(),
                'status' => KycStatus::APPROVED->value,
                'approved_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addYears(2),
            ]);

            DB::commit();

            return redirect()->route('kyc.index')
                ->with('success', 'Phone number verified! Your KYC has been approved.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to verify phone. Please try again.');
        }
    }

    /**
     * Resend verification code
     */
    public function resendCode(): RedirectResponse
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        if (!$kyc || !$kyc->phone_number) {
            return redirect()->route('kyc.basic')
                ->with('error', 'Please submit your phone number first.');
        }

        if ($kyc->phone_verified_at) {
            return redirect()->route('kyc.index')
                ->with('info', 'Phone number is already verified.');
        }

        try {
            // Generate new code and reset attempts
            $kyc->update([
                'phone_verification_code' => $this->generateVerificationCode(),
                'phone_verification_expires_at' => Carbon::now()->addMinutes(10),
                'phone_verification_attempts' => 0,
            ]);

            // Send new SMS synchronously
            try {
                SendPhoneVerificationSms::dispatchSync($kyc);
            } catch (\Exception $smsException) {
                \Log::error('Failed to send SMS', ['error' => $smsException->getMessage()]);
                return back()->with('error', 'Failed to send verification code: ' . $smsException->getMessage());
            }

            return back()->with('success', 'New verification code sent to your phone.');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send verification code. Please try again.');
        }
    }

    /**
     * Show business (Tier 2) verification form
     */
    public function showBusiness(): Response
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        // Must have Tier 1 first
        if (!$kyc || !$kyc->isBasicTier() || !$kyc->phone_verified_at) {
            return redirect()->route('kyc.index')
                ->with('error', 'Please complete Basic (Tier 1) verification first.');
        }

        // Check if already business tier
        if ($kyc->isBusinessTier() && $kyc->isApproved()) {
            return redirect()->route('kyc.index');
        }

        return Inertia::render('settings/kyc/business', [
            'kyc' => $kyc,
        ]);
    }

    /**
     * Submit business (Tier 2) verification
     */
    public function storeBusiness(KycBusinessRequest $request): RedirectResponse
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        // Must have Tier 1 first
        if (!$kyc || !$kyc->isBasicTier() || !$kyc->phone_verified_at) {
            return redirect()->route('kyc.index')
                ->with('error', 'Please complete Basic (Tier 1) verification first.');
        }

        DB::beginTransaction();
        try {
            // Upload documents
            $idDocumentPath = $request->file('id_document')->store('kyc/id-documents', 'private');
            $businessDocumentPath = $request->file('business_document')->store('kyc/business-documents', 'private');
            $selfiePath = $request->file('selfie_with_id')->store('kyc/selfies', 'private');

            // Update KYC record
            $kyc->update([
                'kyc_tier' => KycTier::BUSINESS->value,
                'status' => KycStatus::PENDING->value,
                // Business info
                'business_name' => $request->business_name,
                'business_registration_number' => $request->business_registration_number,
                'business_type' => $request->business_type,
                'business_address_line1' => $request->business_address_line1,
                'business_address_line2' => $request->business_address_line2,
                'business_city' => $request->business_city,
                'business_state' => $request->business_state,
                'business_postal_code' => $request->business_postal_code,
                'business_country' => $request->business_country,
                // Documents
                'id_document_type' => $request->id_document_type,
                'id_document_path' => $idDocumentPath,
                'id_document_status' => DocumentStatus::PENDING->value,
                'business_document_path' => $businessDocumentPath,
                'business_document_status' => DocumentStatus::PENDING->value,
                'selfie_with_id_path' => $selfiePath,
                'selfie_with_id_status' => DocumentStatus::PENDING->value,
                // Timestamps
                'submitted_at' => Carbon::now(),
                'approved_at' => null,
                'expires_at' => null,
            ]);

            DB::commit();

            return redirect()->route('kyc.index')
                ->with('success', 'Business verification submitted! Our team will review your documents within 24-48 hours.');

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Clean up uploaded files if transaction fails
            if (isset($idDocumentPath)) Storage::disk('private')->delete($idDocumentPath);
            if (isset($businessDocumentPath)) Storage::disk('private')->delete($businessDocumentPath);
            if (isset($selfiePath)) Storage::disk('private')->delete($selfiePath);

            return back()->with('error', 'Failed to submit business verification. Please try again.');
        }
    }

    /**
     * Download document (with authorization check)
     */
    public function downloadDocument(Request $request, string $documentType): mixed
    {
        $user = auth()->user();
        $kyc = $user->kycVerification;

        if (!$kyc) {
            abort(404);
        }

        $path = match ($documentType) {
            'id_document' => $kyc->id_document_path,
            'business_document' => $kyc->business_document_path,
            'selfie_with_id' => $kyc->selfie_with_id_path,
            default => null,
        };

        if (!$path || !Storage::disk('private')->exists($path)) {
            abort(404);
        }

        return Storage::disk('private')->download($path);
    }

    /**
     * Generate 6-digit verification code
     */
    private function generateVerificationCode(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }
}
