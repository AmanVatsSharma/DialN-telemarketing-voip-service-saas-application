<?php

namespace App\Services\SMS;

use App\Models\User;
use App\Models\TwilioCredential;
use Exception;

class SmsProviderFactory
{
    /**
     * Create SMS provider instance for a user
     */
    public static function makeForUser(User $user, string $provider = 'twilio'): SMSProviderInterface
    {
        return match ($provider) {
            'twilio' => (new TwilioSMSProvider())->initializeForUser($user),
            default => throw new Exception("Unsupported SMS provider: {$provider}"),
        };
    }

    /**
     * Create SMS provider instance with credentials
     */
    public static function make(string $provider, $credential): SMSProviderInterface
    {
        return match ($provider) {
            'twilio' => (new TwilioSMSProvider())->initialize($credential),
            default => throw new Exception("Unsupported SMS provider: {$provider}"),
        };
    }

    /**
     * Get list of supported providers
     */
    public static function getSupportedProviders(): array
    {
        return [
            'twilio' => [
                'name' => 'Twilio',
                'supports_mms' => true,
                'description' => 'Twilio SMS & MMS Provider',
            ],
            // Future providers:
            // 'plivo' => [...],
            // 'messagebird' => [...],
        ];
    }
}
