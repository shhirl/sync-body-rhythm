import { FlightData, UserProfile, RecoveryPlan, ExerciseRecommendation, SleepRecommendation, LightRecommendation } from '@/types';

export function calculateRecoveryPlan(flight: FlightData, userProfile: UserProfile): RecoveryPlan {
  const departureTime = new Date(flight.departure.time);
  const arrivalTime = new Date(flight.arrival.time);
  
  // Calculate time zone offset in hours using actual timezone strings
  let offsetHours = 0;
  
  // Parse timezone offsets from the ISO strings
  const depMatch = flight.departure.time.match(/([+-]\d{2}):?(\d{2})$/);
  const arrMatch = flight.arrival.time.match(/([+-]\d{2}):?(\d{2})$/);
  
  if (depMatch && arrMatch) {
    const depOffset = parseInt(depMatch[1]) + parseInt(depMatch[2]) / 60;
    const arrOffset = parseInt(arrMatch[1]) + parseInt(arrMatch[2]) / 60;
    offsetHours = Math.abs(arrOffset - depOffset);
  }
  
  const offsetSeconds = offsetHours * 3600;
  const arrivalHour = arrivalTime.getHours();
  
  // Algorithm logic based on specifications
  let exerciseRecommendations: ExerciseRecommendation[] = [];
  
  if (offsetSeconds <= 7200) { // ≤ 2 hours
    if (arrivalHour >= 8 && arrivalHour <= 17) {
      exerciseRecommendations.push({
        type: "Light Walk",
        timing: "1 hour after landing",
        duration: "30 minutes",
        intensity: "Light",
        description: "Helps reset your body clock with gentle movement",
        optional: false
      });
    } else {
      exerciseRecommendations.push({
        type: "Morning Walk",
        timing: "Next day 7:00 AM local",
        duration: "30 minutes", 
        intensity: "Light",
        description: "Start your day with natural light exposure",
        optional: false
      });
    }
  } else if (offsetSeconds <= 18000) { // 2 < X ≤ 5 hours
    if (arrivalHour >= 8 && arrivalHour <= 17) {
      exerciseRecommendations.push({
        type: "Moderate Jog",
        timing: "2 hours after landing",
        duration: "20-30 minutes",
        intensity: "Medium",
        description: "Moderate activity to boost circadian adaptation",
        optional: false
      });
    } else {
      exerciseRecommendations.push({
        type: "Morning Yoga",
        timing: "Next day 7:00 AM local",
        duration: "30 minutes",
        intensity: "Light", 
        description: "Gentle stretching to ease into the new time zone",
        optional: false
      });
    }
  } else { // X ≥ 5 hours
    if (arrivalHour >= 8 && arrivalHour <= 17) {
      exerciseRecommendations.push({
        type: "High-Intensity Training",
        timing: "3 hours after landing",
        duration: "20-30 minutes",
        intensity: "High",
        description: "Vigorous exercise to strongly signal time zone change",
        optional: false
      });
    } else {
      exerciseRecommendations.push({
        type: "Morning Walk",
        timing: "Next day 7:00 AM local",
        duration: "30 minutes",
        intensity: "Light",
        description: "Consistent wake-up time is key for adaptation",
        optional: false
      });
    }
  }
  
  // Adjust based on fitness level
  if (userProfile.fitnessLevel === 'Beginner') {
    exerciseRecommendations = exerciseRecommendations.map(rec => ({
      ...rec,
      intensity: rec.intensity === 'High' ? 'Medium' : rec.intensity === 'Medium' ? 'Light' : rec.intensity,
      duration: "15-20 minutes"
    }));
  }
  
  const sleepRecommendations: SleepRecommendation[] = [
    {
      title: "Sleep Schedule",
      description: "Aim for bedtime at 10:30 PM local time on arrival night",
      additionalInfo: "Even if tired, consistent wake-up time is key"
    },
    {
      title: "Sleep Hygiene",
      description: "Avoid heavy meals 2-3 hours before bed",
      additionalInfo: "Create a calming bedtime routine"
    }
  ];
  
  const lightRecommendations: LightRecommendation[] = [
    {
      title: "Arrival Day Morning",
      action: "Seek Light",
      description: "Get at least 30 minutes of outdoor morning sunlight"
    },
    {
      title: "Evening Routine",
      action: "Avoid Light", 
      description: "Dim lights 1-2 hours before your target bedtime. Limit screen use"
    },
    {
      title: "Follow-up Days",
      action: "Seek Light",
      description: "Reinforce the new time zone with consistent morning light exposure"
    }
  ];
  
  return {
    route: `${flight.departure.airport}-${flight.arrival.airport}`,
    timeOffset: arrMatch && depMatch ? (parseInt(arrMatch[1]) - parseInt(depMatch[1])) : 0,
    recommendations: {
      exercise: exerciseRecommendations,
      sleep: sleepRecommendations,
      light: lightRecommendations
    }
  };
}