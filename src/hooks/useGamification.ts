
import { useState, useEffect, useCallback } from 'react';
import { UserStats, Achievement, ParticleEffect, Level } from '../types/gamification';

const LEVELS: Level[] = [
  { level: 1, title: 'Beginner', experienceRequired: 0, pointsMultiplier: 1 },
  { level: 2, title: 'Focused', experienceRequired: 100, pointsMultiplier: 1.2 },
  { level: 3, title: 'Productive', experienceRequired: 250, pointsMultiplier: 1.4 },
  { level: 4, title: 'Expert', experienceRequired: 500, pointsMultiplier: 1.6 },
  { level: 5, title: 'Master', experienceRequired: 1000, pointsMultiplier: 2.0 },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-task', title: 'First Task', description: 'Complete your first task', icon: '🎯', unlocked: false },
  { id: 'streak-3', title: 'On a Roll', description: 'Complete tasks for 3 days in a row', icon: '⭐', unlocked: false },
  { id: 'streak-7', title: 'Consistency', description: 'Complete tasks for 7 days in a row', icon: '🌟', unlocked: false },
  { id: 'speed-demon', title: 'Quick Finisher', description: 'Complete a task under target time', icon: '⚡', unlocked: false },
  { id: 'marathon', title: 'Productive Day', description: 'Complete 10 tasks in one day', icon: '🚀', unlocked: false },
];

export const useGamification = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    experience: 0,
    lastActiveDate: new Date().toDateString(),
    totalTasksCompleted: 0
  });

  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [particles, setParticles] = useState<ParticleEffect[]>([]);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('productivity-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    const savedAchievements = localStorage.getItem('productivity-achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('productivity-stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('productivity-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const getCurrentLevel = useCallback(() => {
    return LEVELS.find(level => userStats.experience >= level.experienceRequired && 
      (LEVELS[level.level] ? userStats.experience < LEVELS[level.level].experienceRequired : true)) || LEVELS[0];
  }, [userStats.experience]);

  const addParticle = useCallback((x: number, y: number, type: ParticleEffect['type']) => {
    const particle: ParticleEffect = {
      id: Date.now().toString(),
      x,
      y,
      type,
      timestamp: Date.now()
    };
    setParticles(prev => [...prev, particle]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 2000);
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId && !achievement.unlocked
        ? { ...achievement, unlocked: true, unlockedAt: new Date() }
        : achievement
    ));
  }, []);

  const completeTask = useCallback((wasOnTime: boolean, taskElement?: HTMLElement) => {
    const today = new Date().toDateString();
    const currentLevel = getCurrentLevel();
    
    setUserStats(prev => {
      const isNewDay = prev.lastActiveDate !== today;
      const newStreak = isNewDay ? prev.currentStreak + 1 : prev.currentStreak;
      const basePoints = wasOnTime ? 20 : 10;
      const levelMultipliedPoints = Math.round(basePoints * currentLevel.pointsMultiplier);
      
      return {
        ...prev,
        points: prev.points + levelMultipliedPoints,
        experience: prev.experience + (wasOnTime ? 15 : 10),
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
        totalTasksCompleted: prev.totalTasksCompleted + 1
      };
    });

    // Add particle effect
    if (taskElement) {
      const rect = taskElement.getBoundingClientRect();
      addParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, 'completion');
    }

    // Check for achievements
    if (userStats.totalTasksCompleted === 0) {
      unlockAchievement('first-task');
    }
    if (wasOnTime) {
      unlockAchievement('speed-demon');
    }
  }, [getCurrentLevel, addParticle, unlockAchievement, userStats.totalTasksCompleted]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (userStats.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (userStats.lastActiveDate !== yesterday.toDateString()) {
        setUserStats(prev => ({ ...prev, currentStreak: 0 }));
      }
    }

    // Check streak achievements
    if (userStats.currentStreak >= 3) unlockAchievement('streak-3');
    if (userStats.currentStreak >= 7) unlockAchievement('streak-7');
  }, [userStats.lastActiveDate, userStats.currentStreak, unlockAchievement]);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return {
    userStats,
    achievements,
    particles,
    currentLevel: getCurrentLevel(),
    completeTask,
    addParticle,
    unlockAchievement
  };
};
