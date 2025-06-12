
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
    const totalMs = centiseconds * 10;
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const cs = Math.floor((totalMs % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-9xl font-mono text-white mb-8">
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
          <div className="text-6xl font-mono text-white">
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
