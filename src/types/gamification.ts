
export interface UserStats {
  spacePoints: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experience: number;
  lastActiveDate: string;
  totalTasksCompleted: number;
  bunnyHappiness: number;
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

export type BunnyMoodExtended = 'neutral' | 'happy' | 'sad' | 'excited' | 'focused' | 'proud' | 'sleepy';

export interface SpaceLevel {
  level: number;
  title: string;
  experienceRequired: number;
  pointsMultiplier: number;
}
