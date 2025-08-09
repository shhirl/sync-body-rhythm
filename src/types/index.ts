export interface FlightData {
  flightNumber: string;
  departure: {
    city: string;
    airport: string;
    time: string;
    timezone: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
    timezone: string;
  };
}

export interface UserProfile {
  id: string;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Athlete';
  healthConditions: string[];
  preferences?: any;
}

export interface ExerciseRecommendation {
  type: string;
  timing: string;
  duration: string;
  intensity: 'Light' | 'Medium' | 'High';
  description: string;
  optional: boolean;
}

export interface SleepRecommendation {
  title: string;
  description: string;
  additionalInfo?: string;
}

export interface LightRecommendation {
  title: string;
  action: 'Seek Light' | 'Avoid Light';
  description: string;
}

export interface RecoveryPlan {
  route: string;
  timeOffset: number;
  recommendations: {
    exercise: ExerciseRecommendation[];
    sleep: SleepRecommendation[];
    light: LightRecommendation[];
  };
}