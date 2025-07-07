<?php

namespace App\Http\Controllers\SMS;

use App\Http\Controllers\Controller;
use App\Models\PhoneNumber;
use App\Models\SmsConversation;
use App\Models\SmsMessage;
use App\Models\AiAgentSmsSession;
use App\Jobs\GenerateAISmsResponseJob;
use App\Events\SmsMessageReceived;
use App\Services\SMS\SmsProviderFactory;
use App\Services\CreditService;
use App\Services\PricingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SmsWebhookController extends Controller
{
    /**
     * Handle incoming SMS webhook from provider
     */
    public function handleIncoming(Request $request, string $provider = 'twilio')
    {
        try {
            // Get all request data
            $payload = $request->all();
            
            Log::info('SMS Webhook Received', [
                'provider' => $provider,
                'payload' => $payload,
            ]);

            // Find which SMS phone number received the message
            $toNumber = $payload['To'] ?? null;
            
            if (!$toNumber) {
                Log::error('SMS webhook missing To number', ['payload' => $payload]);
                return response()->xml($this->twilioResponse('Error: Missing recipient number'));
            }

            $phoneNumber = PhoneNumber::where('number', $toNumber)
                ->where('status', 'assigned')
                ->whereRaw("JSON_EXTRACT(capabilities, '$.sms') = true")
                ->first();

            if (!$phoneNumber) {
                Log::warning('SMS received for unregistered number', ['number' => $toNumber]);
                return response()->xml($this->twilioResponse('This number is not configured for SMS.'));
            }

            // Check if AI agent is assigned
            if (!$phoneNumber->ai_agent_id) {
                Log::warning('SMS received but no AI agent assigned', [
                    'phone_number_id' => $phoneNumber->id,
                    'number' => $toNumber,
                ]);
                return response()->xml($this->twilioResponse('No agent assigned to this number.'));
            }

            // Parse incoming message using provider
            $smsProvider = SmsProviderFactory::makeForUser($phoneNumber->user, 'twilio');
            $messageData = $smsProvider->parseIncoming($payload);

            // Find or create conversation
            $conversation = SmsConversation::firstOrCreate(
                [
                    'phone_number_id' => $phoneNumber->id,
                    'contact_phone' => $messageData['from'],
                ],
                [
                    'ai_agent_id' => $phoneNumber->ai_agent_id,
                    'status' => 'active',
                    'last_message_at' => now(),
                ]
            );

            // Update conversation timestamp
            $conversation->updateLastMessageTime();

            // Store incoming message
            $message = SmsMessage::create([
                'conversation_id' => $conversation->id,
                'direction' => 'inbound',
                'message_body' => $messageData['body'],
                'sender_phone' => $messageData['from'],
                'receiver_phone' => $messageData['to'],
                'status' => 'received',
                'ai_generated' => false,
                'provider_message_id' => $messageData['message_id'],
                'num_segments' => $messageData['num_segments'] ?? 1,
                'metadata' => [
                    'media_urls' => $messageData['media_urls'] ?? [],
                ],
            ]);

            // Broadcast to frontend (real-time)
            broadcast(new SmsMessageReceived($message, $conversation))->toOthers();

            // Trigger AI response (async job)
            if ($phoneNumber->aiAgent) {
                GenerateAISmsResponseJob::dispatch(
                    $conversation,
                    $message,
                    $phoneNumber->aiAgent,
                    $phoneNumber
                );
            }

            // Return 200 OK (Twilio expects this)
            return response()->xml($this->twilioResponse());

        } catch (\Exception $e) {
            Log::error('SMS webhook processing failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->xml($this->twilioResponse('Error processing message'), 500);
        }
    }

    /**
     * Handle message status updates (delivery, failed, etc.)
     */
    public function handleStatus(Request $request, string $provider = 'twilio')
    {
        try {
            $payload = $request->all();
            
            Log::info('SMS Status Webhook Received', [
                'provider' => $provider,
                'payload' => $payload,
            ]);

            $messageSid = $payload['MessageSid'] ?? $payload['SmsSid'] ?? null;
            $status = $payload['MessageStatus'] ?? $payload['SmsStatus'] ?? null;

            if (!$messageSid || !$status) {
                return response('OK', 200);
            }

            // Find message by provider ID
            $message = SmsMessage::where('provider_message_id', $messageSid)->first();

            if ($message) {
                $message->update([
                    'status' => $status,
                    'delivered_at' => in_array($status, ['delivered', 'sent']) ? now() : null,
                    'error_message' => $payload['ErrorMessage'] ?? null,
                ]);

                // Deduct credits on successful delivery
                if (in_array($status, ['delivered', 'sent']) && !$message->credits_deducted && $message->direction === 'outbound') {
                    $this->deductSmsCredits($message, $payload);
                }

                Log::info('SMS status updated', [
                    'message_id' => $message->id,
                    'status' => $status,
                ]);
            }

            return response('OK', 200);

        } catch (\Exception $e) {
            Log::error('SMS status webhook failed', [
                'error' => $e->getMessage(),
            ]);

            return response('Error', 500);
        }
    }

    /**
     * Deduct credits for SMS message
     */
    private function deductSmsCredits(SmsMessage $message, array $payload)
    {
        try {
            $conversation = $message->conversation;
            if (!$conversation) {
                Log::warning('Cannot deduct SMS credits: Conversation not found', [
                    'message_id' => $message->id,
                ]);
                return;
            }

            $phoneNumber = $conversation->phoneNumber;
            if (!$phoneNumber) {
                Log::warning('Cannot deduct SMS credits: Phone number not found', [
                    'message_id' => $message->id,
                    'conversation_id' => $conversation->id,
                ]);
                return;
            }

            $user = $phoneNumber->user;
            if (!$user) {
                Log::warning('Cannot deduct SMS credits: User not found', [
                    'message_id' => $message->id,
                    'phone_number_id' => $phoneNumber->id,
                ]);
                return;
            }

            // Get actual cost from Twilio (negative value, so convert to positive)
            $actualCost = isset($payload['Price']) ? abs(floatval($payload['Price'])) : 0;
            
            // Extract country code from receiver phone number
            $countryCode = $this->extractCountryCode($message->receiver_phone);
            
            // Store country code in metadata if not already set
            $metadata = $message->metadata ?? [];
            if (!isset($metadata['country_code'])) {
                $metadata['country_code'] = $countryCode;
                $message->update(['metadata' => $metadata]);
            }
            
            // Get pricing with markup
            $pricingService = app(PricingService::class);
            $pricing = $pricingService->calculateSmsCost(
                $countryCode,
                $message->num_segments ?? 1,
                $user->pricing_tier ?? 'standard'
            );
            
            // Check if user can afford
            $creditService = app(CreditService::class);
            if (!$creditService->canAfford($user, $pricing['charge'])) {
                Log::error('Insufficient credits for SMS', [
                    'message_id' => $message->id,
                    'user_id' => $user->id,
                    'required' => $pricing['charge'],
                    'balance' => $user->credit_balance,
                ]);
                
                // Mark as failed due to insufficient funds
                $message->update([
                    'status' => 'failed',
                    'error_message' => 'Insufficient credits',
                ]);
                return;
            }
            
            // Deduct credits with profit tracking
            DB::beginTransaction();
            try {
                $transaction = $creditService->deductForSms(
                    $user,
                    $message,
                    $actualCost,
                    $pricing['charge']
                );
                
                // Mark as deducted to prevent double charging
                $message->update([
                    'credits_deducted' => true,
                    'transaction_id' => $transaction->id,
                ]);
                
                DB::commit();
                
                Log::info('SMS credits deducted successfully', [
                    'message_id' => $message->id,
                    'user_id' => $user->id,
                    'charged' => $pricing['charge'],
                    'actual_cost' => $actualCost,
                    'profit' => $transaction->profit_amount,
                    'margin' => $transaction->profit_percentage . '%',
                    'transaction_id' => $transaction->id,
                    'segments' => $message->num_segments,
                    'country_code' => $countryCode,
                ]);
                
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (\Exception $e) {
            Log::error('Failed to deduct SMS credits', [
                'message_id' => $message->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    /**
     * Extract country code from phone number
     */
    private function extractCountryCode(string $phoneNumber): string
    {
        // Remove all non-numeric characters
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);
        
        // Common country code mappings (check multi-digit codes first)
        $countryCodeMap = [
            '1' => 'US',     // USA, Canada
            '44' => 'GB',    // UK
            '61' => 'AU',    // Australia
            '91' => 'IN',    // India
            '49' => 'DE',    // Germany
            '33' => 'FR',    // France
            '81' => 'JP',    // Japan
            '55' => 'BR',    // Brazil
            '52' => 'MX',    // Mexico
            '86' => 'CN',    // China
            '34' => 'ES',    // Spain
            '39' => 'IT',    // Italy
            '7' => 'RU',     // Russia
            '82' => 'KR',    // South Korea
            '31' => 'NL',    // Netherlands
        ];
        
        // Check for multi-digit codes first (2-3 digits)
        foreach (['44', '61', '91', '49', '33', '81', '55', '52', '86', '34', '39', '82', '31'] as $code) {
            if (str_starts_with($cleaned, $code)) {
                return $countryCodeMap[$code];
            }
        }
        
        // Check for single-digit codes
        if (str_starts_with($cleaned, '1')) {
            return 'US';
        }
        
        if (str_starts_with($cleaned, '7')) {
            return 'RU';
        }
        
        // Default to US
        return 'US';
    }

    /**
     * Generate Twilio TwiML response
     */
    private function twilioResponse(?string $message = null): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?><Response>';
        
        if ($message) {
            $xml .= '<Message>' . htmlspecialchars($message) . '</Message>';
        }
        
        $xml .= '</Response>';
        
        return $xml;
    }
}
