
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, User } from 'lucide-react';
import { useTaskManager } from '../hooks/useTaskManager';
import { useGamification } from '../hooks/useGamification';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import StatsPanel from '../components/StatsPanel';
import ParticleEffects from '../components/ParticleEffects';

const Dashboard = () => {
  const navigate = useNavigate();
  const taskManager = useTaskManager();
  const gamification = useGamification();

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
    <div className="min-h-screen bg-background">
      <ParticleEffects particles={gamification.particles} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Task Dashboard
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
              <Home className="h-4 w-4" />
              Home
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Task Input */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Add New Task
              </h2>
              <TaskInput onAddTask={taskManager.addTask} />
            </div>

            {/* Active Tasks */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Active Tasks ({focusTasks.length})
                </h2>
                {focusTasks.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {taskManager.timerState.isRunning ? '🔴 Timer running' : '⏸️ Ready to start'}
                  </span>
                )}
              </div>
              <TaskList
                tasks={focusTasks}
                activeList="focus"
                timerState={taskManager.timerState}
                onToggleComplete={handleTaskComplete}
                onStartTimer={taskManager.startTimer}
                onPauseTimer={taskManager.pauseTimer}
                onResetTimer={taskManager.resetTimer}
                onDelete={taskManager.deleteTask}
                onEdit={taskManager.editTask}
              />
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Completed Tasks ({completedTasks.length})
                </h2>
                <TaskList
                  tasks={completedTasks}
                  activeList="completed"
                  timerState={taskManager.timerState}
                  onToggleComplete={handleTaskComplete}
                  onStartTimer={taskManager.startTimer}
                  onPauseTimer={taskManager.pauseTimer}
                  onResetTimer={taskManager.resetTimer}
                  onDelete={taskManager.deleteTask}
                  onEdit={taskManager.editTask}
                />
              </div>
            )}

            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Overtime Tasks ({pendingTasks.length})
                </h2>
                <TaskList
                  tasks={pendingTasks}
                  activeList="pending"
                  timerState={taskManager.timerState}
                  onToggleComplete={handleTaskComplete}
                  onStartTimer={taskManager.startTimer}
                  onPauseTimer={taskManager.pauseTimer}
                  onResetTimer={taskManager.resetTimer}
                  onDelete={taskManager.deleteTask}
                  onEdit={taskManager.editTask}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
