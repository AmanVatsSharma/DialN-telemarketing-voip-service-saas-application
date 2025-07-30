<?php

namespace App\Jobs;

use App\Models\TwilioGlobalConfig;
use App\Models\UserKycVerification;
use Illuminate\Foundation\Bus\Dispatchable;
use Twilio\Rest\Client;

class SendPhoneVerificationSms
{
    use Dispatchable;

    public function __construct(
        public UserKycVerification $kyc
    ) {}

    public function handle(): void
    {
        try {
            $user = $this->kyc->user;
            
            // Try to get global Twilio config from database first
            $globalConfig = TwilioGlobalConfig::active();
            
            if ($globalConfig) {
                // Use database config
                $accountSid = $globalConfig->account_sid;
                $authToken = $globalConfig->getDecryptedAuthToken();
                $verifyServiceSid = null; // Global config doesn't have verify service yet
                
                \Log::info('Using TwilioGlobalConfig from database', [
                    'config_id' => $globalConfig->id,
                    'account_sid' => substr($accountSid, 0, 10) . '...',
                ]);
            } else {
                // Fallback to config/env (config() only, not env() as env doesn't work with cached config)
                $accountSid = config('services.twilio.sid');
                $authToken = config('services.twilio.token');
                $verifyServiceSid = config('services.twilio.verify_service_sid');
                
                \Log::info('Using Twilio config from services.php', [
                    'has_config' => !empty($accountSid),
                ]);
            }
            
            if (!$accountSid || !$authToken) {
                \Log::error('Twilio configuration missing', [
                    'has_global_config' => $globalConfig !== null,
                    'has_sid' => !empty($accountSid),
                    'has_token' => !empty($authToken),
                ]);
                throw new \Exception('Twilio is not configured. Please configure Twilio credentials in Settings → Twilio or set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
            }

            $client = new Client($accountSid, $authToken);

            // Use Twilio Verify API if service SID is configured, otherwise fall back to regular SMS
            if ($verifyServiceSid) {
                // Use Twilio Verify API (recommended)
                $verification = $client->verify->v2
                    ->services($verifyServiceSid)
                    ->verifications
                    ->create($this->kyc->phone_number, 'sms');

                \Log::info('Phone verification SMS sent via Twilio Verify API', [
                    'user_id' => $user->id,
                    'phone_number' => $this->kyc->phone_number,
                    'verification_sid' => $verification->sid,
                    'status' => $verification->status,
                    'channel' => 'sms',
                ]);
            } else {
                // Fallback to regular SMS - fetch phone number from Twilio API
                $fromNumber = null;
                
                // Fetch available phone numbers directly from Twilio API
                try {
                    \Log::info('Fetching phone numbers from Twilio API');
                    
                    $incomingNumbers = $client->incomingPhoneNumbers->read(['limit' => 20]);
                    
                    if (count($incomingNumbers) > 0) {
                        // Get first SMS-capable number
                        foreach ($incomingNumbers as $number) {
                            if ($number->capabilities->sms) {
                                $fromNumber = $number->phoneNumber;
                                \Log::info('Found SMS-capable phone number from Twilio API', [
                                    'number' => $fromNumber,
                                    'friendly_name' => $number->friendlyName,
                                    'sid' => $number->sid,
                                ]);
                                break;
                            }
                        }
                        
                        // If no SMS-capable found, use first available
                        if (!$fromNumber && count($incomingNumbers) > 0) {
                            $fromNumber = $incomingNumbers[0]->phoneNumber;
                            \Log::info('Using first available phone number from Twilio API', [
                                'number' => $fromNumber,
                            ]);
                        }
                    } else {
                        \Log::warning('No phone numbers found in Twilio account');
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to fetch phone numbers from Twilio API', [
                        'error' => $e->getMessage(),
                    ]);
                }
                
                if (!$fromNumber) {
                    throw new \Exception('No phone numbers available in your Twilio account. Please purchase a phone number from Twilio Console: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming');
                }

                $message = "Your KYC verification code is: {$this->kyc->phone_verification_code}. Valid for 10 minutes.";

                $response = $client->messages->create(
                    $this->kyc->phone_number,
                    [
                        'from' => $fromNumber,
                        'body' => $message
                    ]
                );

                \Log::info('Phone verification SMS sent via regular SMS', [
                    'user_id' => $user->id,
                    'phone_number' => $this->kyc->phone_number,
                    'message_sid' => $response->sid,
                    'status' => $response->status,
                ]);
            }

        } catch (\Exception $e) {
            \Log::error('Failed to send phone verification SMS', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $this->kyc->user_id,
                'phone_number' => $this->kyc->phone_number ?? 'N/A',
            ]);
            
            throw $e;
        }
    }
}
