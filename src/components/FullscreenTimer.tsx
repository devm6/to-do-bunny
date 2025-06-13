
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minimize, Pause, Play, RotateCcw, ArrowLeft } from 'lucide-react';
import { Task, TimerState } from '../types/task';

interface FullscreenTimerProps {
  task: Task;
  timerState: TimerState;
  onClose: () => void;
  onPauseTimer: () => void;
  onStartTimer: (taskId: string) => void;
  onResetTimer: (taskId: string) => void;
}

const FullscreenTimer: React.FC<FullscreenTimerProps> = ({
  task,
  timerState,
  onClose,
  onPauseTimer,
  onStartTimer,
  onResetTimer
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isOverTime = task.timeAllocation && timerState.elapsedTime > (task.timeAllocation * 60);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center w-full max-w-4xl px-8">
        {/* Header with back button */}
        <div className="absolute top-8 left-8">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
        </div>

        {/* Exit fullscreen button */}
        <div className="absolute top-8 right-8">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-800"
          >
            <Minimize className="h-4 w-4 mr-2" />
            Exit Fullscreen
          </Button>
        </div>

        {/* Task title */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-white mb-2">Current Mission</h1>
          <p className="text-lg text-gray-300">{task.text}</p>
          {task.timeAllocation && (
            <p className="text-sm text-gray-400 mt-2">
              Target: {task.timeAllocation} minutes
            </p>
          )}
        </div>

        {/* Large timer display */}
        <div className="mb-12">
          <div 
            className={`text-9xl font-bold mb-4 ${
              isOverTime ? 'text-orange-400' : 'text-white'
            }`} 
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            {formatTime(timerState.elapsedTime)}
          </div>
          {isOverTime && (
            <div className="text-orange-400 text-xl font-medium animate-pulse">
              ⚠️ Over allocated time
            </div>
          )}
        </div>

        {/* Timer controls */}
        <div className="flex justify-center gap-6">
          {!timerState.isRunning ? (
            <Button
              onClick={() => onStartTimer(task.id)}
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4"
              size="lg"
            >
              <Play className="h-6 w-6 mr-2" />
              Resume
            </Button>
          ) : (
            <Button
              onClick={onPauseTimer}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-4"
              size="lg"
            >
              <Pause className="h-6 w-6 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={() => onResetTimer(task.id)}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4"
            size="lg"
          >
            <RotateCcw className="h-6 w-6 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenTimer;
