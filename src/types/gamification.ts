
export interface UserStats {
  points: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experience: number;
  lastActiveDate: string;
  totalTasksCompleted: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ParticleEffect {
  id: string;
  x: number;
  y: number;
  type: 'completion' | 'points' | 'streak';
  timestamp: number;
}

export interface Level {
  level: number;
  title: string;
  experienceRequired: number;
  pointsMultiplier: number;
}
