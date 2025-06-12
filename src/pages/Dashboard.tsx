
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Settings, User } from 'lucide-react';
import { useTaskManager } from '../hooks/useTaskManager';
import { useGamification } from '../hooks/useGamification';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import BunnyCompanion from '../components/BunnyCompanion';
import StatsPanel from '../components/StatsPanel';
import ParticleEffects from '../components/ParticleEffects';
import SpaceBackground from '../components/SpaceBackground';

const Dashboard = () => {
  const navigate = useNavigate();
  const taskManager = useTaskManager();
  const gamification = useGamification();

  // Enhanced bunny mood based on gamification
  const getBunnyMood = () => {
    if (gamification.userStats.bunnyHappiness > 80) return 'excited';
    if (gamification.userStats.bunnyHappiness < 30) return 'sad';
    if (gamification.userStats.currentStreak > 3) return 'proud';
    return taskManager.bunnyMood;
  };

  const handleTaskComplete = (taskId: string, taskElement?: HTMLElement) => {
    const task = taskManager.tasks.find(t => t.id === taskId);
    if (task) {
      const wasOnTime = !task.timeAllocation || 
        (taskManager.timerState.activeTaskId === taskId ? 
          taskManager.timerState.elapsedTime <= (task.timeAllocation * 60) : 
          task.timeSpent <= (task.timeAllocation * 60));
      
      taskManager.toggleComplete(taskId);
      gamification.completeTask(wasOnTime, taskElement);
    }
  };

  const focusTasks = taskManager.tasks.filter(task => task.status === 'focus');
  const completedTasks = taskManager.tasks.filter(task => task.status === 'completed');
  const pendingTasks = taskManager.tasks.filter(task => task.status === 'pending');

  return (
    <div className="min-h-screen bg-background relative">
      <SpaceBackground />
      <ParticleEffects particles={gamification.particles} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Mission Control 🚀
          </h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/stats')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Stats
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Home
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Task Input */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Plan New Mission
              </h2>
              <TaskInput onAddTask={taskManager.addTask} />
            </div>

            {/* Active Tasks */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Active Missions ({focusTasks.length})
                </h2>
                {focusTasks.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {taskManager.timerState.isRunning ? '🔴 Mission in progress' : '⏸️ Ready to launch'}
                  </span>
                )}
              </div>
              <TaskList
                tasks={focusTasks}
                timerState={taskManager.timerState}
                onToggleComplete={handleTaskComplete}
                onStartTimer={taskManager.startTimer}
                onPauseTimer={taskManager.pauseTimer}
                onResetTimer={taskManager.resetTimer}
                onDeleteTask={taskManager.deleteTask}
                onEditTask={taskManager.editTask}
              />
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Completed Missions ({completedTasks.length})
                </h2>
                <TaskList
                  tasks={completedTasks}
                  timerState={taskManager.timerState}
                  onToggleComplete={handleTaskComplete}
                  onStartTimer={taskManager.startTimer}
                  onPauseTimer={taskManager.pauseTimer}
                  onResetTimer={taskManager.resetTimer}
                  onDeleteTask={taskManager.deleteTask}
                  onEditTask={taskManager.editTask}
                />
              </div>
            )}

            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Overtime Missions ({pendingTasks.length})
                </h2>
                <TaskList
                  tasks={pendingTasks}
                  timerState={taskManager.timerState}
                  onToggleComplete={handleTaskComplete}
                  onStartTimer={taskManager.startTimer}
                  onPauseTimer={taskManager.pauseTimer}
                  onResetTimer={taskManager.resetTimer}
                  onDeleteTask={taskManager.deleteTask}
                  onEditTask={taskManager.editTask}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Panel */}
            <StatsPanel 
              userStats={gamification.userStats} 
              currentLevel={gamification.currentLevel} 
            />

            {/* Bunny Companion */}
            <BunnyCompanion 
              mood={getBunnyMood()} 
              clickable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
