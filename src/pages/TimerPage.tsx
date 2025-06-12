
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import BunnyCompanion from '../components/BunnyCompanion';
import { Task, BunnyMood } from '../types/task';

const TimerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task as Task | undefined;
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bunnyMood, setBunnyMood] = useState<BunnyMood>('neutral');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Bunny mood reset effect
  useEffect(() => {
    if (bunnyMood !== 'neutral') {
      const timeout = setTimeout(() => {
        setBunnyMood('neutral');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [bunnyMood]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleComplete = () => {
    if (task?.timeAllocation) {
      if (elapsedTime <= (task.timeAllocation * 60)) {
        setBunnyMood('happy');
      } else {
        setBunnyMood('sad');
      }
    }
    setIsRunning(false);
  };

  const isOverTime = task?.timeAllocation && elapsedTime > (task.timeAllocation * 60);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Mission Timer 🚀
          </h1>
          <div></div>
        </header>

        {/* Main Timer Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Timer Section */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            {task && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Current Mission
                </h2>
                <p className="text-muted-foreground">{task.text}</p>
                {task.timeAllocation && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Target: {task.timeAllocation} minutes
                  </p>
                )}
              </div>
            )}

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className={`text-6xl font-mono font-bold mb-4 ${
                isOverTime ? 'text-orange-400' : 'text-primary'
              }`}>
                {formatTime(elapsedTime)}
                {isOverTime && ' ⚠️'}
              </div>
              
              {task?.timeAllocation && (
                <div className="text-sm text-muted-foreground">
                  Target: {formatTime(task.timeAllocation * 60)}
                </div>
              )}
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center gap-4 mb-6">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <Play className="h-5 w-5" />
                  Start Mission
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Pause className="h-5 w-5" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>

            {/* Complete Task Button */}
            {task && (
              <div className="text-center">
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Complete Mission ✨
                </Button>
              </div>
            )}
          </div>

          {/* Bunny Companion */}
          <div className="flex justify-center">
            <BunnyCompanion mood={bunnyMood} />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Mission Control Instructions
          </h3>
          <ul className="text-muted-foreground space-y-2">
            <li>• Click "Start Mission" to begin your focused work session</li>
            <li>• The bunny will celebrate if you complete within the target time</li>
            <li>• The bunny will show concern if you go over the allocated time</li>
            <li>• Use "Pause" to take breaks and "Reset" to start over</li>
            <li>• Click "Complete Mission" when you're done with the task</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
