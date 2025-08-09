import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { UserProfileForm } from '@/components/UserProfileForm';
import { RecoveryPlan } from '@/components/RecoveryPlan';
import { UserProfile, RecoveryPlan as RecoveryPlanType } from '@/types';
import { LX64_FLIGHT } from '@/data/flightData';
import { calculateRecoveryPlan } from '@/utils/circadianAlgorithm';

type AppStep = 'welcome' | 'profile' | 'plan';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlanType | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('profile');
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    const plan = calculateRecoveryPlan(LX64_FLIGHT, profile);
    setRecoveryPlan(plan);
    setCurrentStep('plan');
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
  };

  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (currentStep === 'profile') {
    return <UserProfileForm onSubmit={handleProfileSubmit} />;
  }

  if (currentStep === 'plan' && recoveryPlan) {
    return <RecoveryPlan plan={recoveryPlan} onBack={handleBackToProfile} />;
  }

  return null;
};

export default Index;
