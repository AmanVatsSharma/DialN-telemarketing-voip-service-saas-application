import { useState, useEffect, useCallback } from 'react';

export interface UserNumber {
  id: number;
  number: string;
  formatted_number: string;
  friendly_name: string;
  capabilities: {
    voice: boolean;
    sms: boolean;
    mms: boolean;
  };
}

export interface UseUserNumbersReturn {
  numbers: UserNumber[];
  selectedNumber: UserNumber | null;
  selectNumber: (number: UserNumber) => void;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useUserNumbers(): UseUserNumbersReturn {
  const [numbers, setNumbers] = useState<UserNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<UserNumber | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNumbers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await window.axios.get('/numbers/api/my-numbers');
      
      if (response.data && response.data.numbers) {
        setNumbers(response.data.numbers);
        
        // Check if current selected number is still in the fetched list
        const saved = localStorage.getItem('selected_phone_number');
        const savedNumber = saved ? response.data.numbers.find((n: UserNumber) => n.number === saved) : null;
        
        if (savedNumber) {
          // Saved number still exists, keep it selected
          setSelectedNumber(savedNumber);
        } else if (response.data.numbers.length > 0) {
          // Saved number was revoked or doesn't exist, select first available
          const firstNumber = response.data.numbers[0];
          setSelectedNumber(firstNumber);
          localStorage.setItem('selected_phone_number', firstNumber.number);
        } else {
          // No numbers available, clear selection
          setSelectedNumber(null);
          localStorage.removeItem('selected_phone_number');
        }
      }
    } catch (err) {
      console.error('Failed to fetch user numbers:', err);
      setError('Failed to load your phone numbers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNumbers();
  }, [fetchNumbers]);

  const selectNumber = (number: UserNumber) => {
    setSelectedNumber(number);
    localStorage.setItem('selected_phone_number', number.number);
  };

  const refresh = async () => {
    await fetchNumbers();
  };

  return {
    numbers,
    selectedNumber,
    selectNumber,
    loading,
    error,
    refresh,
  };
}
