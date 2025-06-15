
import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import { useAuth } from '../hooks/useAuth';
import TaskInput from '../components/TaskInput';
import Timer from '../components/Timer';
import Stopwatch from '../components/Stopwatch';
import FullscreenTimer from '../components/FullscreenTimer';
import SignInModal from '../components/auth/SignInModal';
import CalendarView from '../components/calendar/CalendarView';
import Confetti from '../components/Confetti';
import SparklyBackground from '../components/SparklyBackground';
import HeaderBar from '../components/layout/HeaderBar';
import BunnyArea from '../components/layout/BunnyArea';
import TopActionButtons from '../components/layout/TopActionButtons';
import PookieTabNav from '../components/layout/PookieTabNav';
import MainTaskContainer from '../components/layout/MainTaskContainer';

const Index = () => {
  const {
    tasks,
    bunnyMood,
    carrotCount,
    showCarrotGain,
    timerState,
    addTask,
    moveTask,
    toggleComplete,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTask,
    editTask
  } = useTaskManager();

  const { user, signIn, signOut, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<'focus' | 'completed' | 'pending'>('focus');
  const [showTimer, setShowTimer] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [showFullscreenTimer, setShowFullscreenTimer] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
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

  // Tab data for navigation
  const tabButtons = [
    { key: 'focus' as const, label: "Pookie's Current Mission 💕", count: counts.focus },
    { key: 'completed' as const, label: 'Pookie Victories ✨', count: counts.completed },
    { key: 'pending' as const, label: 'Future Pookie Goals 🌸', count: counts.pending }
  ];

  // Social login placeholder handlers
  const handleSocialSignIn = (provider: "google" | "github") => {
    window.alert(
      provider === "google"
        ? "Google sign-in coming soon. (Integrate Supabase's social login for production)"
        : "GitHub sign-in coming soon."
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 relative">
      <SparklyBackground />
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-8 relative">
          <HeaderBar
            carrotCount={carrotCount}
            isAuthenticated={isAuthenticated}
            user={user}
            onSignOut={signOut}
            onSignIn={(email, username, remember) => {
              if (remember) {
                localStorage.setItem("pookie-remember", "1");
              } else {
                localStorage.removeItem("pookie-remember");
              }
              signIn(email, username);
            }}
            onSocialSignIn={handleSocialSignIn}
          />

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

        <TopActionButtons
          onShowTimer={() => setShowTimer(true)}
          onShowStopwatch={() => setShowStopwatch(true)}
          onShowCalendar={() => setShowCalendar(true)}
        />

        <BunnyArea bunnyMood={bunnyMood} />

        <div className="mb-8">
          <TaskInput onAddTask={addTask} />
        </div>

        <PookieTabNav
          activeTab={activeTab}
          tabs={tabButtons}
          onTabChange={setActiveTab}
        />

        <MainTaskContainer
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
          onMoveTask={moveTask}
        />
      </div>

      {/* Modals */}
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}
      {showStopwatch && <Stopwatch onClose={() => setShowStopwatch(false)} />}
      {showCalendar && <CalendarView tasks={tasks} onClose={() => setShowCalendar(false)} />}
      {showSignInModal && (
        <SignInModal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          onSignIn={signIn}
        />
      )}

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
