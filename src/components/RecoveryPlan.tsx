import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecoveryPlan as RecoveryPlanType } from '@/types';
import { FlightInfo } from './FlightInfo';
import { Activity, Moon, Sun, Clock, Info } from 'lucide-react';
import { LX64_FLIGHT } from '@/data/flightData';

interface RecoveryPlanProps {
  plan: RecoveryPlanType;
  onBack: () => void;
}

export function RecoveryPlan({ plan, onBack }: RecoveryPlanProps) {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Light': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen wellness-gradient p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="wellness-ghost" 
            onClick={onBack}
            className="mb-4"
          >
            ← Back to Profile
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Your Recovery Plan</h1>
            <p className="text-muted-foreground">Personalized for your {plan.route} journey</p>
          </div>
          <div className="w-24" />
        </div>

        <FlightInfo flight={LX64_FLIGHT} timeOffset={plan.timeOffset} />

        <Tabs defaultValue="exercise" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
            <TabsTrigger 
              value="exercise" 
              className="flex items-center gap-2 data-[state=active]:bg-wellness-orange data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4" />
              Exercise
            </TabsTrigger>
            <TabsTrigger 
              value="sleep"
              className="flex items-center gap-2 data-[state=active]:bg-wellness-orange data-[state=active]:text-white"
            >
              <Moon className="w-4 h-4" />
              Sleep
            </TabsTrigger>
            <TabsTrigger 
              value="light"
              className="flex items-center gap-2 data-[state=active]:bg-wellness-orange data-[state=active]:text-white"
            >
              <Sun className="w-4 h-4" />
              Light
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exercise" className="space-y-4 animate-slide-up">
            {plan.recommendations.exercise.map((exercise, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-wellness-orange" />
                      {exercise.type}
                      {exercise.optional && (
                        <Badge variant="outline" className="text-xs">Optional</Badge>
                      )}
                    </CardTitle>
                    <Badge className={getIntensityColor(exercise.intensity)}>
                      {exercise.intensity} Intensity
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {exercise.timing} • {exercise.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{exercise.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4 animate-slide-up">
            {plan.recommendations.sleep.map((sleep, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-wellness-orange" />
                    {sleep.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-foreground">{sleep.description}</p>
                  {sleep.additionalInfo && (
                    <div className="flex items-start gap-2 p-3 bg-wellness-beige rounded-lg">
                      <Info className="w-4 h-4 text-wellness-orange mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">{sleep.additionalInfo}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="light" className="space-y-4 animate-slide-up">
            {plan.recommendations.light.map((light, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-wellness-orange" />
                    {light.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{light.description}</p>
                  <Button 
                    variant={light.action === 'Seek Light' ? 'wellness' : 'wellness-outline'}
                    className="w-full"
                  >
                    {light.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}