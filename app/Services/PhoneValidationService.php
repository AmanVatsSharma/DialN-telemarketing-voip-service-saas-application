<?php

declare(strict_types=1);

namespace App\Services;

class PhoneValidationService
{
    /**
     * Sanitize and validate phone number to E.164 format
     * This is a simplified version - for production, use libphonenumber-for-php
     */
    public function sanitize(string $phoneNumber, string $defaultCountryCode = '+1'): array
    {
        try {
            // Remove all non-digit characters except +
            $cleaned = preg_replace('/[^0-9+]/', '', trim($phoneNumber));

            if (empty($cleaned)) {
                return [
                    'success' => false,
                    'formatted' => null,
                    'error' => 'Phone number is empty',
                ];
            }

            // Add default country code if not present
            if (!str_starts_with($cleaned, '+')) {
                // Remove leading 0 or 1 if present
                $cleaned = ltrim($cleaned, '01');
                $cleaned = $defaultCountryCode . $cleaned;
            }

            // Basic validation: E.164 format should be 7-15 digits after +
            $digits = ltrim($cleaned, '+');
            $digitCount = strlen($digits);

            if ($digitCount < 7 || $digitCount > 15) {
                return [
                    'success' => false,
                    'formatted' => null,
                    'error' => 'Invalid phone number length',
                ];
            }

            // Ensure it starts with +
            if (!str_starts_with($cleaned, '+')) {
                $cleaned = '+' . $cleaned;
            }

            return [
                'success' => true,
                'formatted' => $cleaned,
                'error' => null,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'formatted' => null,
                'error' => 'Validation error',
            ];
        }
    }

    /**
     * Quick validation check
     */
    public function isValid(string $phoneNumber, string $defaultCountryCode = '+1'): bool
    {
        $result = $this->sanitize($phoneNumber, $defaultCountryCode);
        return $result['success'];
    }
}
