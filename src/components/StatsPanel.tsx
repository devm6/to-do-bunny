
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { UserStats, SpaceLevel } from '../types/gamification';

interface StatsPanelProps {
  userStats: UserStats;
  currentLevel: SpaceLevel;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ userStats, currentLevel }) => {
  const nextLevel = currentLevel.level < 5 ? currentLevel.level + 1 : null;
  const experienceProgress = nextLevel 
    ? ((userStats.experience - currentLevel.experienceRequired) / (100 * nextLevel)) * 100
    : 100;

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-foreground mb-4">Mission Control</h3>
      
      {/* Level and Experience */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Rank: {currentLevel.title}</span>
          <span className="text-sm text-primary font-bold">Level {currentLevel.level}</span>
        </div>
        <Progress value={experienceProgress} className="h-2" />
        <div className="text-xs text-muted-foreground mt-1">
          {userStats.experience} XP {nextLevel && `/ ${currentLevel.experienceRequired + (100 * nextLevel)} XP`}
        </div>
      </div>

      {/* Space Points */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Space Credits</span>
        <span className="text-lg font-bold text-primary">⭐ {userStats.spacePoints}</span>
      </div>

      {/* Streak */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Current Streak</span>
        <span className="text-lg font-bold text-orange-400">🔥 {userStats.currentStreak}</span>
      </div>

      {/* Bunny Happiness */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Bunny Happiness</span>
          <span className="text-sm text-primary">{userStats.bunnyHappiness}%</span>
        </div>
        <Progress value={userStats.bunnyHappiness} className="h-2" />
      </div>

      {/* Total Stats */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>Total Missions: {userStats.totalTasksCompleted}</div>
        <div>Best Streak: {userStats.longestStreak} days</div>
      </div>
    </div>
  );
};

export default StatsPanel;
