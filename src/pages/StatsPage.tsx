
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, TrendingUp, CheckSquare, Zap } from 'lucide-react';
import { useGamification } from '../hooks/useGamification';
import StatsPanel from '../components/StatsPanel';

const StatsPage = () => {
  const navigate = useNavigate();
  const { userStats, achievements, currentLevel } = useGamification();

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Progress Statistics
          </h1>
          <div></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-1">
            <StatsPanel userStats={userStats} currentLevel={currentLevel} />
          </div>

          {/* Detailed Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-primary">{userStats.totalTasksCompleted}</div>
                <div className="text-xs text-muted-foreground">Tasks Complete</div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-primary">{userStats.points}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-500">{userStats.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-primary">{unlockedAchievements.length}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
                <span className="text-sm text-muted-foreground">
                  ({unlockedAchievements.length}/{totalAchievements})
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`border rounded-lg p-4 ${
                      achievement.unlocked 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <div className="text-xs text-primary mt-1">
                            Unlocked {achievement.unlockedAt.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  View Tasks
                </Button>
                <Button onClick={() => navigate('/timer')} variant="outline" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Start Timer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
