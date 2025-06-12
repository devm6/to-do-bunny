import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import BunnyCompanion from '../components/BunnyCompanion';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import Timer from '../components/Timer';
import Stopwatch from '../components/Stopwatch';
import { Button } from '@/components/ui/button';
import { Timer as TimerIcon, Clock } from 'lucide-react';

const Index = () => {
  const {
    tasks,
    bunnyMood,
    timerState,
    addTask,
    toggleComplete,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTask,
    editTask
  } = useTaskManager();

  const [activeTab, setActiveTab] = useState<'focus' | 'completed' | 'pending'>('focus');
  const [showTimer, setShowTimer] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);

  const getTabCounts = () => {
    return {
      focus: tasks.filter(t => t.status === 'focus').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status === 'pending').length
    };
  };

  const counts = getTabCounts();

  const tabButtons = [
    { key: 'focus' as const, label: "Current Mission", count: counts.focus, emoji: '🚀' },
    { key: 'completed' as const, label: 'Completed', count: counts.completed, emoji: '⭐' },
    { key: 'pending' as const, label: 'Pending', count: counts.pending, emoji: '🌌' }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="gentle-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              To Do Bunny 🐰
            </h1>
            <p className="text-muted-foreground">
              Your cosmic companion for space missions and stellar productivity
            </p>
          </div>
        </header>

        {/* Timer and Stopwatch Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setShowTimer(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <TimerIcon className="h-4 w-4 mr-2" />
            Timer
          </Button>
          <Button
            onClick={() => setShowStopwatch(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Clock className="h-4 w-4 mr-2" />
            Stopwatch
          </Button>
        </div>

        {/* Bunny Companion in main content */}
        <div className="mb-8 flex justify-center">
          <div className="gentle-fade-in">
            <BunnyCompanion mood={bunnyMood} />
          </div>
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex gap-2 bg-muted p-1 rounded-xl w-fit">
            {tabButtons.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  activeTab === tab.key 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.key 
                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <TaskList
            tasks={tasks}
            activeList={activeTab}
            timerState={timerState}
            onToggleComplete={toggleComplete}
            onStartTimer={startTimer}
            onPauseTimer={pauseTimer}
            onResetTimer={resetTimer}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>

      {/* Timer Modal */}
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}

      {/* Stopwatch Modal */}
      {showStopwatch && <Stopwatch onClose={() => setShowStopwatch(false)} />}
    </div>
  );
};

export default Index;
