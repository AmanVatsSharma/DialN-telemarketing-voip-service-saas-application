<?php

declare(strict_types=1);

namespace App\Actions\Calls;

use App\Models\Call;
use App\Models\TwilioGlobalConfig;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

class InitiateCallAction
{
    /**
     * Initiate a manual outbound call using global Twilio configuration
     * 
     * @param User $user The user initiating the call
     * @param array $data Call data including:
     *   - to_number: Required - destination phone number
     *   - from_number: Optional - caller ID (defaults to env TWILIO_PHONE_NUMBER)
     *   - enable_recording: Optional - whether to record the call
     *   - use_device_sdk: Optional - true for browser calls, false for API calls (default: true)
     */
    public function execute(User $user, array $data): Call
    {
        return DB::transaction(function () use ($user, $data) {
            // Get global Twilio configuration
            $config = TwilioGlobalConfig::active();

            if (!$config) {
                throw new Exception('No active Twilio configuration found. Please run: php artisan twilio:configure');
            }

            // Determine caller ID (from number) - use configured phone number
            $fromNumber = $data['from_number'] ?? env('TWILIO_PHONE_NUMBER');

            if (!$fromNumber) {
                throw new Exception('No Twilio phone number available. Please configure TWILIO_PHONE_NUMBER in .env');
            }

            // Create call record for tracking
            $call = Call::create([
                'user_id' => $user->id,
                'call_type' => 'manual',
                'direction' => 'outbound',
                'from_number' => $fromNumber,
                'to_number' => $data['to_number'],
                'status' => 'initiated',
                'enable_recording' => $data['enable_recording'] ?? false,
                'started_at' => now(),
            ]);

            // Check if this is a browser Device SDK call or API call
            $useDeviceSdk = $data['use_device_sdk'] ?? true;

            if ($useDeviceSdk) {
                // For browser calls: Just return the call record
                // The browser Device SDK will handle the actual Twilio connection
                // The TwiML app will receive the call and use the call_id to look up details
                Log::info('Call record created for Device SDK', [
                    'call_id' => $call->id,
                    'to' => $data['to_number'],
                    'from' => $fromNumber,
                ]);

                return $call;
            }

            // For API calls (campaigns, etc.): Create the Twilio call via API
            $client = new Client(
                $config->account_sid,
                $config->getDecryptedAuthToken()
            );

            // Prepare TwiML URL for Softphone
            $twimlUrl = $config->webhook_url . '/twiml/manual-call?call_id=' . $call->id;

            // Prepare webhook URLs  
            $statusCallback = $config->webhook_url . '/webhooks/twilio/calls/' . $call->id . '/status';
            $recordingCallback = ($data['enable_recording'] ?? false)
                ? $config->webhook_url . '/webhooks/twilio/calls/' . $call->id . '/recording'
                : null;

            try {
                // Initiate call via Twilio API
                $twilioCall = $client->calls->create(
                    $data['to_number'], // To
                    $fromNumber,        // From
                    [
                        'url' => $twimlUrl,
                        'method' => 'POST',
                        'statusCallback' => $statusCallback,
                        'statusCallbackMethod' => 'POST',
                        'statusCallbackEvent' => ['initiated', 'ringing', 'answered', 'completed'],
                        'record' => ($data['enable_recording'] ?? false),
                        'recordingStatusCallback' => $recordingCallback,
                        'recordingStatusCallbackMethod' => 'POST',
                        'timeout' => 60,
                    ]
                );

                // Update call with Twilio SID
                $call->update([
                    'twilio_call_sid' => $twilioCall->sid,
                    'status' => 'initiated',
                ]);

                Log::info('API call initiated', [
                    'call_id' => $call->id,
                    'twilio_call_sid' => $twilioCall->sid,
                    'to' => $data['to_number'],
                    'from' => $fromNumber,
                ]);

                return $call->fresh();
            } catch (\Exception $e) {
                $call->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                    'ended_at' => now(),
                ]);

                Log::error('Call initiation failed', [
                    'call_id' => $call->id,
                    'error' => $e->getMessage(),
                    'to' => $data['to_number'],
                ]);

                throw new Exception('Failed to initiate call: ' . $e->getMessage());
            }
        });
    }
}
