import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, X, Maximize } from 'lucide-react';

interface StopwatchProps {
  onClose: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ onClose }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 10); // Update every 10ms for more precision
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const cs = centiseconds % 100;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');
    const csStr = cs.toString().padStart(2, '0');

    if (days > 0) {
      return `${days}:${hoursStr}:${minutesStr}:${secsStr}.${csStr}`;
    }
    if (hours > 0) {
      return `${hoursStr}:${minutesStr}:${secsStr}.${csStr}`;
    }
    return `${minutesStr}:${secsStr}.${csStr}`;
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-9xl font-bold text-white mb-8" style={{ fontFamily: 'Courier New, monospace' }}>
            {formatTime(time)}
          </div>
          <Button
            onClick={handleFullscreen}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            Exit Fullscreen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-700 rounded-lg p-8 text-center min-w-[300px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Stopwatch</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="text-white hover:bg-gray-800"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-6xl font-bold text-white" style={{ fontFamily: 'Courier New, monospace' }}>
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
