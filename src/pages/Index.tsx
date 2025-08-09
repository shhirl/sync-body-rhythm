import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { FlightInputForm } from '@/components/FlightInputForm';
import { UserProfileForm } from '@/components/UserProfileForm';
import { RecoveryPlan } from '@/components/RecoveryPlan';
import { UserProfile, RecoveryPlan as RecoveryPlanType, FlightData } from '@/types';
import { calculateRecoveryPlan } from '@/utils/circadianAlgorithm';

type AppStep = 'welcome' | 'flight' | 'profile' | 'plan';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlanType | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('flight');
  };

  const handleFlightSubmit = (flight: FlightData) => {
    setFlightData(flight);
    setCurrentStep('profile');
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    if (flightData) {
      const plan = calculateRecoveryPlan(flightData, profile);
      setRecoveryPlan(plan);
      setCurrentStep('plan');
    }
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
  };

  const handleBackToFlight = () => {
    setCurrentStep('flight');
  };

  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (currentStep === 'flight') {
    return <FlightInputForm onSubmit={handleFlightSubmit} />;
  }

  if (currentStep === 'profile') {
    return <UserProfileForm onSubmit={handleProfileSubmit} onBack={handleBackToFlight} />;
  }

  if (currentStep === 'plan' && recoveryPlan) {
    return <RecoveryPlan plan={recoveryPlan} flight={flightData} onBack={handleBackToProfile} />;
  }

  return null;
};

export default Index;
