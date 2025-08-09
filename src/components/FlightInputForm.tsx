import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FlightData } from '@/types';
import { Plane, MapPin, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FlightInputFormProps {
  onSubmit: (flight: FlightData) => void;
}

type InputMode = 'flight-number' | 'manual';

export function FlightInputForm({ onSubmit }: FlightInputFormProps) {
  const [inputMode, setInputMode] = useState<InputMode>('flight-number');
  const [flightNumber, setFlightNumber] = useState('LX64');
  
  // Manual entry states
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDateTime, setDepartureDateTime] = useState('');
  const [arrivalDateTime, setArrivalDateTime] = useState('');

  const handleFlightNumberSubmit = () => {
    // For MVP, only LX64 is supported
    if (flightNumber.toUpperCase() === 'LX64') {
      const lx64Flight: FlightData = {
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
      onSubmit(lx64Flight);
    } else {
      alert('Currently only flight LX64 is supported in MVP version');
    }
  };

  const handleManualSubmit = () => {
    if (!departureAirport || !arrivalAirport || !departureDateTime || !arrivalDateTime) {
      alert('Please fill in all fields');
      return;
    }

    // Parse datetime-local input values
    const depDateTime = new Date(departureDateTime);
    const arrDateTime = new Date(arrivalDateTime);

    // Get timezone offset in proper format
    const getTimezoneOffset = (date: Date) => {
      const offset = -date.getTimezoneOffset();
      const hours = Math.floor(Math.abs(offset) / 60);
      const minutes = Math.abs(offset) % 60;
      const sign = offset >= 0 ? '+' : '-';
      return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const manualFlight: FlightData = {
      flightNumber: `${departureAirport}-${arrivalAirport}`,
      departure: {
        city: departureAirport,
        airport: departureAirport,
        time: `${depDateTime.getFullYear()}-${(depDateTime.getMonth() + 1).toString().padStart(2, '0')}-${depDateTime.getDate().toString().padStart(2, '0')}T${depDateTime.getHours().toString().padStart(2, '0')}:${depDateTime.getMinutes().toString().padStart(2, '0')}:00${getTimezoneOffset(depDateTime)}`,
        timezone: 'Local'
      },
      arrival: {
        city: arrivalAirport,
        airport: arrivalAirport,
        time: `${arrDateTime.getFullYear()}-${(arrDateTime.getMonth() + 1).toString().padStart(2, '0')}-${arrDateTime.getDate().toString().padStart(2, '0')}T${arrDateTime.getHours().toString().padStart(2, '0')}:${arrDateTime.getMinutes().toString().padStart(2, '0')}:00${getTimezoneOffset(arrDateTime)}`,
        timezone: 'Local'
      }
    };
    onSubmit(manualFlight);
  };

  return (
    <div className="min-h-screen wellness-gradient p-4">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-foreground">Flight Information</h1>
          <p className="text-lg text-muted-foreground">
            Enter your flight details to get started
          </p>
        </div>

        {/* Input Mode Toggle */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-wellness-orange" />
              Flight Input Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={inputMode === 'flight-number' ? "wellness" : "wellness-outline"}
                size="lg"
                onClick={() => setInputMode('flight-number')}
                className="h-auto p-4 flex-col gap-2"
              >
                <Plane className="w-6 h-6" />
                <span>Flight Number</span>
              </Button>
              <Button
                variant={inputMode === 'manual' ? "wellness" : "wellness-outline"}
                size="lg"
                onClick={() => setInputMode('manual')}
                className="h-auto p-4 flex-col gap-2"
              >
                <MapPin className="w-6 h-6" />
                <span>Manual Entry</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flight Number Input */}
        {inputMode === 'flight-number' && (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg animate-slide-up">
            <CardHeader>
              <CardTitle>Flight Number</CardTitle>
              <CardDescription>
                Enter your flight number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="flight-number">Flight Number</Label>
                <Input
                  id="flight-number"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="E.g. LX64"
                  className="mt-1"
                />
              </div>
              <Button
                variant="wellness"
                size="lg"
                onClick={handleFlightNumberSubmit}
                className="w-full"
              >
                Continue with Flight {flightNumber}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Manual Entry */}
        {inputMode === 'manual' && (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg animate-slide-up">
            <CardHeader>
              <CardTitle>Manual Flight Entry</CardTitle>
              <CardDescription>
                Enter your departure and arrival details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Departure Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-wellness-orange" />
                  Departure
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departure-airport">Airport (IATA)</Label>
                    <Input
                      id="departure-airport"
                      value={departureAirport}
                      onChange={(e) => setDepartureAirport(e.target.value.toUpperCase())}
                      placeholder="E.g. ZRH"
                      maxLength={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="departure-datetime">Date & Time</Label>
                    <Input
                      id="departure-datetime"
                      type="datetime-local"
                      value={departureDateTime}
                      onChange={(e) => setDepartureDateTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Arrival Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-wellness-orange" />
                  Arrival
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="arrival-airport">Airport (IATA)</Label>
                    <Input
                      id="arrival-airport"
                      value={arrivalAirport}
                      onChange={(e) => setArrivalAirport(e.target.value.toUpperCase())}
                      placeholder="E.g. MIA"
                      maxLength={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="arrival-datetime">Date & Time</Label>
                    <Input
                      id="arrival-datetime"
                      type="datetime-local"
                      value={arrivalDateTime}
                      onChange={(e) => setArrivalDateTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="wellness"
                size="lg"
                onClick={handleManualSubmit}
                className="w-full"
              >
                Continue with Manual Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}