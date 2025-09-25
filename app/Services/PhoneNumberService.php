<?php

namespace App\Services;

use App\Helpers\PhoneNumberHelper;
use App\Models\PhoneNumber;
use App\Models\TwilioGlobalConfig;
use Twilio\Rest\Client as TwilioClient;

class PhoneNumberService
{
    protected $twilio;

    public function __construct()
    {
        // Get Twilio credentials from global config
        try {
            $config = TwilioGlobalConfig::active();
            
            if ($config) {
                $this->twilio = new TwilioClient(
                    $config->account_sid,
                    $config->getDecryptedAuthToken()
                );
            }
        } catch (\Exception $e) {
            // Config table doesn't exist yet or no config, skip initialization
            $this->twilio = null;
        }
    }

    /**
     * Sync available numbers from Twilio
     */
    public function syncAvailableNumbers($countryCode = 'US', $areaCode = null, $limit = 50)
    {
        if (!$this->twilio) {
            throw new \Exception('Twilio not configured. Please configure Twilio in Settings → Twilio.');
        }

        try {
            $options = ['limit' => $limit];
            
            // Add area code filter if provided
            if ($areaCode) {
                $options['areaCode'] = $areaCode;
            }

            $availableNumbers = $this->twilio->availablePhoneNumbers($countryCode)
                ->local
                ->read($options);

            $count = 0;
            $synced = [];
            
            foreach ($availableNumbers as $twilioNumber) {
                $phoneNumber = PhoneNumber::updateOrCreate(
                    ['number' => $twilioNumber->phoneNumber],
                    [
                        'friendly_name' => $twilioNumber->friendlyName ?? $twilioNumber->phoneNumber,
                        'country_code' => $countryCode,
                        'area_code' => PhoneNumberHelper::extractAreaCode($twilioNumber->phoneNumber),
                        'status' => 'available',
                        'capabilities' => [
                            'voice' => $twilioNumber->capabilities->voice ?? false,
                            'sms' => $twilioNumber->capabilities->sms ?? false,
                            'mms' => $twilioNumber->capabilities->mms ?? false,
                        ],
                        'monthly_cost' => 1.00, // Default Twilio cost
                    ]
                );
                $synced[] = $phoneNumber;
                $count++;
            }

            return $synced;
        } catch (\Exception $e) {
            throw new \Exception("Failed to sync Twilio numbers: " . $e->getMessage());
        }
    }

    /**
     * Purchase number from Twilio and mark as assigned
     */
    public function purchaseNumber($phoneNumberOrString, $friendlyName = null)
    {
        if (!$this->twilio) {
            throw new \Exception('Twilio not configured.');
        }

        try {
            // Handle both PhoneNumber model and string
            $numberString = is_string($phoneNumberOrString) ? $phoneNumberOrString : $phoneNumberOrString->number;
            
            $purchasedNumber = $this->twilio->incomingPhoneNumbers->create([
                'phoneNumber' => $numberString,
                'friendlyName' => $friendlyName,
            ]);

            // Create or update the phone number record
            $phoneNumber = PhoneNumber::updateOrCreate(
                ['number' => $numberString],
                [
                    'twilio_sid' => $purchasedNumber->sid,
                    'formatted_number' => PhoneNumberHelper::format($numberString),
                    'friendly_name' => $friendlyName ?? $numberString,
                    'country_code' => 'US', // Default, can be enhanced
                    'area_code' => PhoneNumberHelper::extractAreaCode($numberString),
                    'status' => 'available',
                    'capabilities' => [
                        'voice' => $purchasedNumber->capabilities->voice ?? false,
                        'sms' => $purchasedNumber->capabilities->sms ?? false,
                        'mms' => $purchasedNumber->capabilities->mms ?? false,
                    ],
                    'monthly_cost' => 1.00, // Default Twilio cost
                ]
            );

            return $phoneNumber;
        } catch (\Exception $e) {
            throw new \Exception("Failed to purchase number: " . $e->getMessage());
        }
    }

    /**
     * Assign a phone number to a user
     */
    public function assignNumber(PhoneNumber $phoneNumber, $user)
    {
        // Check if number is available
        if ($phoneNumber->status !== 'available') {
            throw new \Exception('This phone number is not available for assignment.');
        }

        // Update the phone number
        $phoneNumber->update([
            'user_id' => $user->id,
            'status' => 'assigned',
            'assigned_at' => now(),
        ]);

        return $phoneNumber->fresh();
    }

    /**
     * Configure phone number for WebRTC
     */
    public function configureForWebRTC(PhoneNumber $phoneNumber, $twimlAppSid)
    {
        if (!$this->twilio) {
            throw new \Exception('Twilio not configured.');
        }

        if (!$phoneNumber->twilio_sid) {
            throw new \Exception('Phone number does not have a Twilio SID.');
        }

        try {
            $this->twilio->incomingPhoneNumbers($phoneNumber->twilio_sid)
                ->update([
                    'voiceApplicationSid' => $twimlAppSid,
                ]);

            return true;
        } catch (\Exception $e) {
            throw new \Exception("Failed to configure number for WebRTC: " . $e->getMessage());
        }
    }

    /**
     * Release number back to Twilio
     */
    public function releaseNumber(PhoneNumber $phoneNumber)
    {
        if (!$this->twilio) {
            throw new \Exception('Twilio not configured.');
        }

        try {
            if ($phoneNumber->twilio_sid) {
                $this->twilio->incomingPhoneNumbers($phoneNumber->twilio_sid)->delete();
            }

            $phoneNumber->update([
                'status' => 'released',
                'twilio_sid' => null,
                'user_id' => null,
                'released_at' => now(),
            ]);

            return true;
        } catch (\Exception $e) {
            throw new \Exception("Failed to release number: " . $e->getMessage());
        }
    }

    /**
     * Revoke/unassign number from user (keeps number in inventory)
     */
    public function revokeNumber(PhoneNumber $phoneNumber)
    {
        // Don't throw exception if not assigned, just ensure it's cleared
        // This allows idempotent calls (e.g. from failed charge jobs)
        
        $phoneNumber->update([
            'status' => 'available',
            'user_id' => null,
            'assigned_at' => null,
        ]);

        return true;
    }

    /**
     * Get available numbers filtered
     */
    public function getAvailableNumbers($countryCode = null, $areaCode = null, $hasVoice = null, $hasSms = null)
    {
        $query = PhoneNumber::available();

        if ($countryCode) {
            $query->forCountry($countryCode);
        }

        if ($areaCode) {
            $query->where('area_code', $areaCode);
        }

        if ($hasVoice !== null) {
            $query->whereRaw("JSON_EXTRACT(capabilities, '$.voice') = ?", [$hasVoice ? 'true' : 'false']);
        }

        if ($hasSms !== null) {
            $query->whereRaw("JSON_EXTRACT(capabilities, '$.sms') = ?", [$hasSms ? 'true' : 'false']);
        }

        return $query->orderBy('number');
    }

    /**
     * Get enabled countries from Twilio geo-permissions
     */
    public function getEnabledCountries()
    {
        if (!$this->twilio) {
            throw new \Exception('Twilio not configured.');
        }

        try {
            // Get list of all available countries with their permissions
            $availableCountries = $this->twilio->voice->v1->dialingPermissions
                ->countries->read();
            
            $countries = [];
            foreach ($availableCountries as $country) {
                // Only include enabled countries
                $isEnabled = $country->lowRiskNumbersEnabled || 
                            $country->highRiskSpecialNumbersEnabled || 
                            $country->highRiskTollfraudNumbersEnabled;
                
                if ($isEnabled) {
                    $countries[] = [
                        'code' => $country->isoCode,
                        'name' => $country->name,
                        'continent' => $country->continent ?? 'Unknown',
                    ];
                }
            }
            
            // Sort by name
            usort($countries, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });
            
            return $countries;
        } catch (\Exception $e) {
            // If geo-permissions fail, return common countries
            return [
                ['code' => 'US', 'name' => 'United States', 'continent' => 'North America'],
                ['code' => 'GB', 'name' => 'United Kingdom', 'continent' => 'Europe'],
                ['code' => 'CA', 'name' => 'Canada', 'continent' => 'North America'],
                ['code' => 'AU', 'name' => 'Australia', 'continent' => 'Oceania'],
            ];
        }
    }

    /**
     * Get numbers assigned to a specific user
     */
    public function getUserNumbers($userId)
    {
        return PhoneNumber::where('user_id', $userId)
            ->where('status', 'assigned');
    }

    /**
     * Get number statistics
     */
    public function getStatistics()
    {
        return [
            'total' => PhoneNumber::count(),
            'available' => PhoneNumber::available()->count(),
            'assigned' => PhoneNumber::assigned()->count(),
            'requested' => PhoneNumber::requested()->count(),
            'released' => PhoneNumber::where('status', 'released')->count(),
            'total_monthly_cost' => PhoneNumber::assigned()->sum('monthly_cost') ?? 0,
        ];
    }

    /**
     * Get available numbers statistics
     */
    public function getAvailableStats()
    {
        $available = PhoneNumber::available();
        
        return [
            'total_available' => $available->count(),
            'voice_capable' => (clone $available)->whereRaw("JSON_EXTRACT(capabilities, '$.voice') = true")->count(),
            'sms_capable' => (clone $available)->whereRaw("JSON_EXTRACT(capabilities, '$.sms') = true")->count(),
            'average_cost' => round($available->avg('monthly_cost') ?? 0, 2),
        ];
    }
}
