import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FlightData } from '@/types';
import { Plane, MapPin, Clock } from 'lucide-react';

interface FlightInfoProps {
  flight: FlightData;
  timeOffset: number;
}

export function FlightInfo({ flight, timeOffset }: FlightInfoProps) {
  const departureTime = new Date(flight.departure.time);
  const arrivalTime = new Date(flight.arrival.time);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{flight.departure.city}</div>
              <div className="text-2xl font-bold">{flight.departure.airport}</div>
              <div className="text-sm text-muted-foreground">
                {formatTime(departureTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(departureTime)}
              </div>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <Plane className="w-6 h-6 text-wellness-orange transform rotate-90" />
              <div className="text-xs text-muted-foreground mt-1">
                {flight.flightNumber}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{flight.arrival.city}</div>
              <div className="text-2xl font-bold">{flight.arrival.airport}</div>
              <div className="text-sm text-muted-foreground">
                {formatTime(arrivalTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(arrivalTime)}
              </div>
            </div>
          </div>
          
          <div className="text-center ml-4">
            <div className="flex items-center gap-1 text-wellness-orange">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {timeOffset > 0 ? '+' : ''}{timeOffset}h
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Time diff</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}