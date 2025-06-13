
import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import BunnyCompanion from '../components/BunnyCompanion';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import Timer from '../components/Timer';
import Stopwatch from '../components/Stopwatch';
import FullscreenTimer from '../components/FullscreenTimer';
import CarrotCounter from '../components/CarrotCounter';
import Confetti from '../components/Confetti';
import SparklyBackground from '../components/SparklyBackground';
import { Button } from '@/components/ui/button';
import { Timer as TimerIcon, Clock } from 'lucide-react';

const Index = () => {
  const {
    tasks,
    bunnyMood,
    carrotCount,
    showCarrotGain,
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
  const [showFullscreenTimer, setShowFullscreenTimer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFullscreen = (taskId: string) => {
    setShowFullscreenTimer(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreenTimer(false);
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.isCompleted) {
      setShowConfetti(true);
    }
    toggleComplete(taskId);
  };

  const getTabCounts = () => {
    return {
      focus: tasks.filter(t => t.status === 'focus').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status === 'pending').length
    };
  };

  const counts = getTabCounts();
  const activeTask = tasks.find(task => task.id === timerState.activeTaskId);

  const tabButtons = [{
    key: 'focus' as const,
    label: "Pookie's Current Mission 💕",
    count: counts.focus
  }, {
    key: 'completed' as const,
    label: 'Pookie Victories ✨',
    count: counts.completed
  }, {
    key: 'pending' as const,
    label: 'Future Pookie Goals 🌸',
    count: counts.pending
  }];

  return (
    <div className="min-h-screen bg-background p-4 relative">
      {/* Sparkly animated background */}
      <SparklyBackground />
      
      {/* Confetti effect */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with enhanced pookie vibes */}
        <header className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <CarrotCounter count={carrotCount} />
          </div>
          <div className="gentle-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2" style={{
              background: 'linear-gradient(45deg, #ff69b4, #ff1493, #da70d6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255, 105, 180, 0.5)'
            }}>
              To Do Bunny 🐰💕
            </h1>
            <p className="text-pink-200 text-lg" style={{
              textShadow: '0 0 10px rgba(255, 192, 203, 0.5)'
            }}>
              Where productivity meets pookie vibes ✨
            </p>
          </div>
        </header>

        {/* Timer and Stopwatch Buttons with pookie styling */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={() => setShowTimer(true)} 
            variant="outline" 
            className="border-pink-300/50 text-pink-200 hover:bg-pink-500/20 hover:text-pink-100 hover:border-pink-300 transition-all duration-300"
            style={{
              boxShadow: '0 0 15px rgba(255, 105, 180, 0.3)'
            }}
          >
            <TimerIcon className="h-4 w-4 mr-2" />
            Pookie Timer 💖
          </Button>
          <Button 
            onClick={() => setShowStopwatch(true)} 
            variant="outline" 
            className="border-purple-300/50 text-purple-200 hover:bg-purple-500/20 hover:text-purple-100 hover:border-purple-300 transition-all duration-300"
            style={{
              boxShadow: '0 0 15px rgba(138, 43, 226, 0.3)'
            }}
          >
            <Clock className="h-4 w-4 mr-2" />
            Pookie Stopwatch ⏰
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

        {/* Tab Navigation with enhanced pookie styling */}
        <div className="mb-6">
          <div className="flex gap-2 bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-pink-900/20 p-1 rounded-xl w-fit border border-pink-300/20" style={{
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.2)'
          }}>
            {tabButtons.map(tab => (
              <Button 
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  activeTab === tab.key 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm' 
                    : 'hover:bg-pink-500/10 text-pink-200 hover:text-pink-100'
                }`}
                style={{
                  textShadow: activeTab === tab.key ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
                }}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.key 
                      ? 'bg-white/20 text-white' 
                      : 'bg-pink-500/20 text-pink-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Task List with enhanced pookie container */}
        <div className="bg-gradient-to-br from-pink-900/10 via-card to-purple-900/10 border border-pink-300/20 rounded-2xl p-6 shadow-lg" style={{
          boxShadow: '0 0 30px rgba(255, 105, 180, 0.15)'
        }}>
          <TaskList 
            tasks={tasks}
            activeList={activeTab}
            timerState={timerState}
            showCarrotGain={showCarrotGain}
            onToggleComplete={handleToggleComplete}
            onStartTimer={startTimer}
            onPauseTimer={pauseTimer}
            onResetTimer={resetTimer}
            onDelete={deleteTask}
            onEdit={editTask}
            onFullscreen={handleFullscreen}
          />
        </div>
      </div>

      {/* Timer Modal */}
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}

      {/* Stopwatch Modal */}
      {showStopwatch && <Stopwatch onClose={() => setShowStopwatch(false)} />}

      {/* Fullscreen Timer */}
      {showFullscreenTimer && activeTask && (
        <FullscreenTimer
          task={activeTask}
          timerState={timerState}
          onClose={handleCloseFullscreen}
          onPauseTimer={pauseTimer}
          onStartTimer={startTimer}
          onResetTimer={resetTimer}
        />
      )}
    </div>
  );
};

export default Index;
