import { useState } from 'react';
import { FlightData } from '@/types';

export const useFlightData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightData = async (flightNumber: string, date?: string): Promise<FlightData | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fetch-flight-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flightNumber, date })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data.flightData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch flight data';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchFlightData, loading, error };
};