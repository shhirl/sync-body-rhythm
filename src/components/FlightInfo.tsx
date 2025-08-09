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
    <Card className="bg-gradient-to-r from-slate-400/90 to-slate-500/90 backdrop-blur-sm border-0 shadow-lg text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Departure */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{flight.departure.airport}</div>
            <div className="text-sm text-white/80">{flight.departure.city}</div>
            <div className="text-sm text-white/80">
              {formatTime(departureTime)}
            </div>
          </div>
          
          {/* Plane Icon */}
          <div className="flex flex-col items-center px-8">
            <Plane className="w-6 h-6 text-white transform rotate-90" />
          </div>
          
          {/* Arrival */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{flight.arrival.airport}</div>
            <div className="text-sm text-white/80">{flight.arrival.city}</div>
            <div className="text-sm text-white/80">
              {formatTime(arrivalTime)}
            </div>
          </div>
          
          {/* Time Difference */}
          <div className="text-right">
            <div className="flex items-center gap-1 text-white">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {timeOffset > 0 ? '+' : ''}{timeOffset}h
              </span>
            </div>
            <div className="text-xs text-white/70">Time diff</div>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-center text-sm text-white/80">
            {flight.flightNumber} • Time difference: {timeOffset > 0 ? '+' : ''}{timeOffset} hours
          </div>
        </div>
      </CardContent>
    </Card>
  );
}