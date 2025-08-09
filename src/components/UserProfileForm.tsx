import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/types';
import { User, Activity, Heart, Moon } from 'lucide-react';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const fitnessLevels = [
  { id: 'Beginner', label: 'Beginner', icon: User, description: 'Just starting fitness journey' },
  { id: 'Intermediate', label: 'Intermediate', icon: Activity, description: 'Regular exercise routine' },
  { id: 'Advanced', label: 'Advanced', icon: Heart, description: 'Experienced athlete' },
  { id: 'Athlete', label: 'Athlete', icon: Moon, description: 'Professional level training' }
];

const healthConditions = [
  'None',
  'Heart Condition',
  'Joint Issues', 
  'Sleep Disorders',
  'Other'
];

export function UserProfileForm({ onSubmit }: UserProfileFormProps) {
  const [fitnessLevel, setFitnessLevel] = useState<UserProfile['fitnessLevel']>('Beginner');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['None']);

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (condition === 'None') {
      setSelectedConditions(checked ? ['None'] : []);
    } else {
      if (checked) {
        setSelectedConditions(prev => prev.filter(c => c !== 'None').concat(condition));
      } else {
        setSelectedConditions(prev => prev.filter(c => c !== condition));
      }
    }
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: Date.now().toString(),
      fitnessLevel,
      healthConditions: selectedConditions
    };
    onSubmit(profile);
  };

  return (
    <div className="min-h-screen wellness-gradient p-4">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-foreground">Your Wellness Profile</h1>
          <p className="text-lg text-muted-foreground">
            Help us create your personalized jet lag recovery plan
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-wellness-orange" />
              Fitness Level
            </CardTitle>
            <CardDescription>
              Select your current fitness level to get appropriate exercise recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {fitnessLevels.map((level) => {
                const Icon = level.icon;
                return (
                  <Button
                    key={level.id}
                    variant={fitnessLevel === level.id ? "wellness" : "wellness-outline"}
                    size="xl"
                    onClick={() => setFitnessLevel(level.id as UserProfile['fitnessLevel'])}
                    className="h-auto p-6 flex-col gap-3"
                  >
                    <Icon className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-semibold">{level.label}</div>
                      <div className="text-xs opacity-80">{level.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-wellness-orange" />
              Health Considerations
            </CardTitle>
            <CardDescription>
              Let us know about any health conditions we should consider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-3">
                  <Checkbox
                    id={condition}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                  />
                  <label
                    htmlFor={condition}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center animate-gentle-bounce">
          <Button
            variant="wellness"
            size="xl"
            onClick={handleSubmit}
            className="px-12"
          >
            Get My Recovery Plan
          </Button>
        </div>
      </div>
    </div>
  );
}