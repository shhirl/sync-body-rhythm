import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Brain, Activity, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen wellness-gradient relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo & Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 wellness-accent-gradient rounded-2xl">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-foreground">JetSync</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The first AI-powered app that uses personalized workout schedules to sync your body with any time zone
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardContent className="p-6 text-center">
                <div className="p-3 wellness-accent-gradient rounded-xl inline-block mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Algorithm</h3>
                <p className="text-muted-foreground text-sm">
                  Scientific circadian rhythm analysis for optimal recovery timing
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6 text-center">
                <div className="p-3 wellness-accent-gradient rounded-xl inline-block mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Workouts</h3>
                <p className="text-muted-foreground text-sm">
                  Exercise plans tailored to your fitness level and health profile
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6 text-center">
                <div className="p-3 wellness-accent-gradient rounded-xl inline-block mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Arrive Energized</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic exercise timing to reset your body clock naturally
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="space-y-4 animate-gentle-bounce">
            <Button 
              variant="wellness" 
              size="xl"
              onClick={onGetStarted}
              className="px-12 text-lg"
            >
              Get Your Recovery Plan
            </Button>
            <p className="text-sm text-muted-foreground">
              Currently featuring Swiss Flight LX64 (Zurich → Miami)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}