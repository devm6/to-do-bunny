
export interface Task {
  id: string;
  text: string;
  timeAllocation?: number; // in hours
  isCompleted: boolean;
  timeSpent: number; // in seconds
  isActive: boolean; // if timer is running
  completedAt?: Date;
  status: 'focus' | 'completed' | 'pending';
  scheduledDate?: Date; // for calendar scheduling
  reminderSent?: boolean;
}

export type BunnyMood = 'neutral' | 'happy' | 'sad';

export interface TimerState {
  activeTaskId: string | null;
  isRunning: boolean;
  elapsedTime: number; // in seconds
}

export interface UserSettings {
  emailReminders: boolean;
  reminderHours: number;
  reminderDays: number;
}
