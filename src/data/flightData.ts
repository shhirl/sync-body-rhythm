import { FlightData } from '@/types';

export const LX64_FLIGHT: FlightData = {
  flightNumber: 'LX64',
  departure: {
    city: 'Zurich',
    airport: 'ZRH',
    time: '2025-08-18T13:05:00+02:00',
    timezone: 'Europe/Zurich'
  },
  arrival: {
    city: 'Miami', 
    airport: 'MIA',
    time: '2025-08-18T17:30:00-04:00',
    timezone: 'America/New_York'
  }
};