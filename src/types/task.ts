
export interface Task {
  id: string;
  text: string;
  timeAllocation?: number; // in minutes
  isCompleted: boolean;
  timeSpent: number; // in seconds
  isActive: boolean; // if timer is running
  completedAt?: Date;
  status: 'focus' | 'completed' | 'pending';
}

export type BunnyMood = 'neutral' | 'happy' | 'sad';

export interface TimerState {
  activeTaskId: string | null;
  isRunning: boolean;
  elapsedTime: number; // in seconds
}
