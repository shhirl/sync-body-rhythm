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
  const [departureDate, setDepartureDate] = useState<Date>();
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [arrivalTime, setArrivalTime] = useState('');

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
    if (!departureAirport || !arrivalAirport || !departureDate || !departureTime || !arrivalDate || !arrivalTime) {
      alert('Please fill in all fields');
      return;
    }

    // Combine date and time for ISO string
    const depDateTime = new Date(departureDate);
    const [depHour, depMin] = departureTime.split(':');
    depDateTime.setHours(parseInt(depHour), parseInt(depMin));

    const arrDateTime = new Date(arrivalDate);
    const [arrHour, arrMin] = arrivalTime.split(':');
    arrDateTime.setHours(parseInt(arrHour), parseInt(arrMin));

    const manualFlight: FlightData = {
      flightNumber: `${departureAirport}-${arrivalAirport}`,
      departure: {
        city: departureAirport,
        airport: departureAirport,
        time: depDateTime.toISOString(),
        timezone: 'UTC' // Simplified for MVP
      },
      arrival: {
        city: arrivalAirport,
        airport: arrivalAirport,
        time: arrDateTime.toISOString(),
        timezone: 'UTC' // Simplified for MVP
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
                Enter your flight number (LX64 available for MVP)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="flight-number">Flight Number</Label>
                <Input
                  id="flight-number"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="LX64"
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
                      placeholder="ZRH"
                      maxLength={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="departure-time">Time</Label>
                    <Input
                      id="departure-time"
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "PPP") : <span>Pick departure date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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
                      placeholder="MIA"
                      maxLength={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="arrival-time">Time</Label>
                    <Input
                      id="arrival-time"
                      type="time"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !arrivalDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {arrivalDate ? format(arrivalDate, "PPP") : <span>Pick arrival date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={arrivalDate}
                        onSelect={setArrivalDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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