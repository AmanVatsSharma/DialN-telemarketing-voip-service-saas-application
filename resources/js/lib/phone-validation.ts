/**
 * Phone number validation utility
 * Validates phone numbers in E.164 format
 */

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  formatted?: string;
}

/**
 * Validates a phone number
 * Accepts E.164 format: +[country code][number]
 * Example: +12345678900, +447890123456
 */
export function validatePhoneNumber(phone: string): PhoneValidationResult {
  // Remove whitespace
  const cleaned = phone.trim();

  // Check if empty
  if (!cleaned) {
    return {
      isValid: false,
      error: 'Phone number is required',
    };
  }

  // Check if starts with +
  if (!cleaned.startsWith('+')) {
    return {
      isValid: false,
      error: 'Phone number must start with + (E.164 format)',
    };
  }

  // Remove + for validation
  const numberPart = cleaned.substring(1);

  // Check if contains only digits after +
  if (!/^\d+$/.test(numberPart)) {
    return {
      isValid: false,
      error: 'Phone number can only contain digits after +',
    };
  }

  // Check length (E.164 allows 1-15 digits after country code)
  // Minimum: +1234567890 (10 digits, e.g., US)
  // Maximum: +123456789012345 (15 digits)
  if (numberPart.length < 10) {
    return {
      isValid: false,
      error: 'Phone number is too short (min 10 digits)',
    };
  }

  if (numberPart.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long (max 15 digits)',
    };
  }

  return {
    isValid: true,
    formatted: cleaned,
  };
}

/**
 * Validates multiple phone numbers
 */
export function validatePhoneNumbers(phones: string[]): {
  valid: string[];
  invalid: Array<{ phone: string; error: string }>;
} {
  const valid: string[] = [];
  const invalid: Array<{ phone: string; error: string }> = [];

  phones.forEach((phone) => {
    const result = validatePhoneNumber(phone);
    if (result.isValid && result.formatted) {
      valid.push(result.formatted);
    } else {
      invalid.push({
        phone,
        error: result.error || 'Invalid phone number',
      });
    }
  });

  return { valid, invalid };
}

/**
 * Parse phone numbers from various input formats
 * Supports: comma-separated, newline-separated, space-separated
 */
export function parsePhoneNumbers(input: string): string[] {
  return input
    .split(/[\n,;\s]+/) // Split by newline, comma, semicolon, or space
    .map((phone) => phone.trim())
    .filter((phone) => phone.length > 0);
}
