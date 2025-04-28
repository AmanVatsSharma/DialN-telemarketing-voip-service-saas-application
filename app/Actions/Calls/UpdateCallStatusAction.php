<?php

declare(strict_types=1);

namespace App\Actions\Calls;

use App\Models\Call;
use App\Models\MessageVariant;
use App\Services\CreditService;
use App\Services\PricingService;
use App\Services\CallSentimentAnalyzer;
use App\Services\SequenceEngine;
use App\Events\CRM\CallCompletedEvent;
use App\Events\CRM\LeadQualifiedEvent;
use Illuminate\Support\Facades\Log;

class UpdateCallStatusAction
{
    public function __construct(
        protected CreditService $creditService,
        protected PricingService $pricingService,
        protected CallSentimentAnalyzer $sentimentAnalyzer,
        protected SequenceEngine $sequenceEngine
    ) {}

    /**
     * Update call status from webhook data
     */
    public function execute(Call $call, array $data): Call
    {
        $updateData = [
            'status' => $this->mapTwilioStatus($data['CallStatus'] ?? $call->status),
        ];

        // Update Twilio Call SID if not already set
        if (isset($data['CallSid']) && !$call->twilio_call_sid) {
            $updateData['twilio_call_sid'] = $data['CallSid'];
        }

        // Update duration if available
        if (isset($data['CallDuration'])) {
            $updateData['duration_seconds'] = (int) $data['CallDuration'];
        }

        // Update pricing if available (actual cost from Twilio)
        $actualCost = null;
        if (isset($data['Price'])) {
            // Twilio returns negative price, convert to positive
            $actualCost = abs((float) $data['Price']);
            $updateData['price'] = $actualCost;
            $updateData['price_unit'] = $data['PriceUnit'] ?? 'USD';
        }

        // Update answered by if available
        if (isset($data['AnsweredBy'])) {
            $updateData['answered_by'] = strtolower($data['AnsweredBy']);
        }

        // Set timestamps
        if ($updateData['status'] === 'in-progress' && !$call->started_at) {
            $updateData['started_at'] = now();
        }

        if (in_array($updateData['status'], ['completed', 'failed', 'canceled', 'busy', 'no-answer'])) {
            $updateData['ended_at'] = now();
        }

        $call->update($updateData);

        // Deduct credit when call is completed with actual cost from Twilio
        if ($updateData['status'] === 'completed' && isset($updateData['duration_seconds']) && $updateData['duration_seconds'] > 0) {
            $this->deductCallCost($call, $actualCost);
        }

        // Update campaign statistics if this is a campaign call
        if ($call->campaign_id && $call->campaign) {
            $this->updateCampaignStatistics($call, $updateData['status']);
        }

        // Update campaign contact status if this is a campaign call
        if ($call->campaign_contact_id && $call->campaignContact) {
            $this->updateContactStatus($call, $updateData['status']);
        }

        // Track message variant performance if variant is assigned
        if ($call->message_variant_id && $call->messageVariant) {
            $this->trackVariantPerformance($call, $updateData['status']);
        }

        // Auto-analyze sentiment if transcript is available and call is completed
        if ($updateData['status'] === 'completed' && !empty($call->transcript_text)) {
            $this->autoAnalyzeSentiment($call);
        }

        // Auto-enroll in follow-up sequences if applicable
        if (in_array($updateData['status'], ['completed', 'no-answer', 'busy', 'failed'])) {
            $this->autoEnrollInSequence($call);
        }

        // Dispatch CRM events for completed calls
        if ($updateData['status'] === 'completed') {
            $this->dispatchCrmEvents($call);
        }

        Log::info('Call status updated', [
            'call_id' => $call->id,
            'status' => $updateData['status'],
        ]);

        return $call->fresh();
    }

    /**
     * Deduct call cost from user's credit balance.
     */
    private function deductCallCost(Call $call, ?float $actualCost): void
    {
        try {
            $user = $call->user;
            
            if (!$user) {
                Log::warning('Cannot deduct call cost: User not found', ['call_id' => $call->id]);
                return;
            }

            // Extract country code from phone number (simplified - you might need better logic)
            $countryCode = $this->extractCountryCode($call->to_number);
            
            // Store country code in call metadata if not already set
            if (!isset($call->metadata['country_code'])) {
                $metadata = $call->metadata ?? [];
                $metadata['country_code'] = $countryCode;
                $call->update(['metadata' => $metadata]);
            }

            // Get user's tier (you can add tier field to users table or default to standard)
            $tier = $user->pricing_tier ?? 'standard';

            // Calculate estimated cost with profit margin
            $costData = $this->pricingService->calculateCallCost(
                $call->duration_seconds,
                $countryCode,
                $tier
            );

            // Use actual cost from Twilio if available, otherwise use calculated base cost
            $finalActualCost = $actualCost ?? $costData['base_cost'];
            $estimatedCharge = $costData['charge'];

            // Check if user can afford
            if (!$this->creditService->canAfford($user, $estimatedCharge)) {
                Log::error('Insufficient credits for call', [
                    'call_id' => $call->id,
                    'user_id' => $user->id,
                    'required' => $estimatedCharge,
                    'balance' => $user->credit_balance,
                ]);
                return;
            }

            // Deduct credits using profit-tracking method
            $transaction = $this->creditService->deductForCall(
                $user,
                $call,
                $finalActualCost,
                $estimatedCharge
            );

            Log::info('Call cost deducted successfully', [
                'call_id' => $call->id,
                'user_id' => $user->id,
                'charged' => $estimatedCharge,
                'actual_cost' => $finalActualCost,
                'profit' => $transaction->profit_amount,
                'margin' => $transaction->profit_percentage . '%',
                'transaction_id' => $transaction->id,
                'cost_status' => $actualCost ? 'confirmed' : 'estimated',
            ]);

            // If we only had estimated cost, log for later webhook update
            if (!$actualCost) {
                Log::info('Call cost deducted with estimated pricing - awaiting webhook for actual cost', [
                    'call_id' => $call->id,
                    'transaction_id' => $transaction->id,
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Failed to deduct call cost', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    /**
     * Extract country code from phone number.
     * This is a simplified implementation - you might want to use a library like libphonenumber.
     */
    private function extractCountryCode(string $phoneNumber): string
    {
        // Remove + and spaces
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Common country code mappings
        $countryCodeMap = [
            '1' => 'US',    // USA, Canada
            '44' => 'GB',   // UK
            '61' => 'AU',   // Australia
            '91' => 'IN',   // India
            '49' => 'DE',   // Germany
            '33' => 'FR',   // France
            '81' => 'JP',   // Japan
            '55' => 'BR',   // Brazil
            '52' => 'MX',   // Mexico
        ];

        // Check for multi-digit codes first
        foreach (['44', '61', '91', '49', '33', '81', '55', '52'] as $code) {
            if (str_starts_with($cleaned, $code)) {
                return $countryCodeMap[$code];
            }
        }

        // Check for single-digit codes
        if (str_starts_with($cleaned, '1')) {
            return 'US';
        }

        // Default to US
        return 'US';
    }

    /**
     * Map Twilio status to our status
     */
    private function mapTwilioStatus(string $twilioStatus): string
    {
        return match ($twilioStatus) {
            'queued', 'initiated' => 'initiated',
            'ringing' => 'ringing',
            'in-progress' => 'in-progress',
            'completed' => 'completed',
            'busy' => 'busy',
            'no-answer' => 'no-answer',
            'failed' => 'failed',
            'canceled' => 'canceled',
            default => 'initiated',
        };
    }

    /**
     * Update campaign statistics based on call status
     */
    private function updateCampaignStatistics(Call $call, string $status): void
    {
        $campaign = $call->campaign;
        
        // Increment total_called when call is first answered or completed
        if ($status === 'in-progress' && !$call->getOriginal('started_at')) {
            $campaign->incrementCalled();
        }
        
        // Increment total_answered when call is answered (human or machine)
        if ($status === 'completed' && $call->answered_by && $call->answered_by !== 'unknown') {
            $campaign->incrementAnswered();
        }
        
        // Increment total_failed for failed calls
        if (in_array($status, ['failed', 'busy', 'no-answer', 'canceled'])) {
            $campaign->incrementFailed();
        }
    }

    /**
     * Update campaign contact status based on call status
     */
    private function updateContactStatus(Call $call, string $status): void
    {
        $contact = $call->campaignContact;
        
        if (!$contact) {
            return;
        }
        
        // Update contact status based on call outcome
        if ($status === 'completed') {
            $contact->markAsCompleted();
        } elseif (in_array($status, ['failed', 'busy', 'no-answer', 'canceled'])) {
            // Only mark as failed if max retries exceeded
            if ($contact->call_attempts >= $call->campaign->retry_attempts) {
                $contact->markAsFailed();
            } else {
                // Will be retried
                $contact->update(['status' => 'pending']);
            }
        }
    }

    /**
     * Track message variant performance based on call status
     */
    private function trackVariantPerformance(Call $call, string $status): void
    {
        $variant = $call->messageVariant;
        
        if (!$variant) {
            return;
        }

        try {
            // Track answered calls
            if ($status === 'in-progress' && !$call->getOriginal('started_at')) {
                $variant->recordAnswer();
                Log::info('Variant answer tracked', [
                    'variant_id' => $variant->id,
                    'call_id' => $call->id,
                ]);
            }

            // Track completed calls
            if ($status === 'completed') {
                $variant->recordCompletion();
                
                // Track positive responses based on DTMF or sentiment
                if ($this->isPositiveResponse($call)) {
                    $variant->recordPositiveResponse();
                }
                
                Log::info('Variant completion tracked', [
                    'variant_id' => $variant->id,
                    'call_id' => $call->id,
                    'positive' => $this->isPositiveResponse($call),
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to track variant performance', [
                'variant_id' => $variant->id,
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Determine if the call had a positive response
     */
    private function isPositiveResponse(Call $call): bool
    {
        // Check DTMF responses (e.g., pressing 1 for interest)
        if ($call->dtmf_digits && in_array($call->dtmf_digits, ['1', '11', '111'])) {
            return true;
        }

        // Check sentiment analysis (if available)
        if ($call->sentiment === 'positive' && $call->sentiment_confidence >= 70) {
            return true;
        }

        // Check lead quality score
        if ($call->lead_quality === 'hot' || $call->lead_quality === 'warm') {
            return true;
        }

        return false;
    }

    /**
     * Auto-analyze call sentiment if transcript exists
     */
    private function autoAnalyzeSentiment(Call $call): void
    {
        try {
            // Dispatch analysis asynchronously to not block webhook
            dispatch(function () use ($call) {
                $this->sentimentAnalyzer->analyzeCall($call);
            })->afterResponse();

            Log::info('Sentiment analysis queued', [
                'call_id' => $call->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to queue sentiment analysis', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Auto-enroll contact in follow-up sequence based on call outcome
     */
    private function autoEnrollInSequence(Call $call): void
    {
        try {
            // Only enroll campaign calls that have a campaign contact
            if (!$call->campaign_id || !$call->campaign_contact_id || !$call->campaignContact) {
                return;
            }

            // Dispatch sequence enrollment asynchronously to not block webhook
            dispatch(function () use ($call) {
                $this->sequenceEngine->determineAndEnrollSequence($call);
            })->afterResponse();

            Log::info('Sequence enrollment queued', [
                'call_id' => $call->id,
                'status' => $call->status,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to queue sequence enrollment', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Dispatch CRM webhook events for completed calls
     */
    private function dispatchCrmEvents(Call $call): void
    {
        try {
            // Load necessary relationships
            $call->loadMissing(['campaign', 'campaignContact.contact']);

            // Don't dispatch if required data is missing
            if (!$call->campaign || !$call->campaignContact || !$call->campaignContact->contact) {
                Log::debug('Skipping CRM event dispatch: missing related data', [
                    'call_id' => $call->id,
                ]);
                return;
            }

            $contact = $call->campaignContact->contact;

            // Always dispatch call completed event
            event(new CallCompletedEvent($call, $contact, $call->campaign));

            // Dispatch lead qualified event if this is a hot lead
            if ($this->isQualifiedLead($call)) {
                event(new LeadQualifiedEvent($call, $contact, $call->campaign));
                
                Log::info('Lead qualified event dispatched', [
                    'call_id' => $call->id,
                    'lead_score' => $call->lead_score,
                    'lead_quality' => $call->lead_quality,
                ]);
            }

            Log::debug('CRM events dispatched', [
                'call_id' => $call->id,
                'events' => ['call_completed', $this->isQualifiedLead($call) ? 'lead_qualified' : null],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to dispatch CRM events', [
                'call_id' => $call->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Check if the call represents a qualified lead
     */
    private function isQualifiedLead(Call $call): bool
    {
        // Lead is qualified if:
        // 1. Marked as hot lead quality
        // 2. High lead score (8+)
        // 3. Positive sentiment with high confidence
        return $call->lead_quality === 'hot'
            || $call->lead_score >= 8.0
            || ($call->sentiment === 'positive' && $call->sentiment_confidence >= 0.8);
    }
}
