
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, X, Maximize } from 'lucide-react';

interface TimerProps {
  onClose: () => void;
}

const Timer: React.FC<TimerProps> = ({ onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          const newTotal = prev - 1;
          setMinutes(Math.floor(newTotal / 60));
          setSeconds(newTotal % 60);
          
          if (newTotal === 0) {
            setIsRunning(false);
          }
          
          return newTotal;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, totalSeconds]);

  const handleStart = () => {
    if (totalSeconds === 0) {
      const newTotal = parseInt(inputMinutes) * 60;
      setTotalSeconds(newTotal);
      setMinutes(Math.floor(newTotal / 60));
      setSeconds(newTotal % 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const newTotal = parseInt(inputMinutes) * 60;
    setTotalSeconds(newTotal);
    setMinutes(Math.floor(newTotal / 60));
    setSeconds(newTotal % 60);
  };

  const handleInputChange = (value: string) => {
    if (!isRunning) {
      setInputMinutes(value);
      const newTotal = parseInt(value || '0') * 60;
      setTotalSeconds(newTotal);
      setMinutes(Math.floor(newTotal / 60));
      setSeconds(newTotal % 60);
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 font-handwriting">
        <div className="text-center">
          <div className="text-2xl text-white mb-4 bunny-float">🐰</div>
          <div className="text-9xl font-bold text-white mb-8" style={{ fontFamily: 'Kalam, cursive' }}>
            {formatTime(minutes, seconds)}
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-handwriting">
      <div className="bg-black border border-gray-700 rounded-lg p-8 text-center min-w-[300px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Timer</h2>
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
          <div className="text-2xl text-white mb-2 bunny-float">🐰</div>
          <div className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Kalam, cursive' }}>
            {formatTime(minutes, seconds)}
          </div>
          
          {!isRunning && totalSeconds === parseInt(inputMinutes) * 60 && (
            <div className="mb-4">
              <label className="text-white text-sm block mb-2">Set minutes:</label>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => handleInputChange(e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 w-20 text-center"
                min="1"
                max="999"
                style={{ fontFamily: 'Kalam, cursive' }}
              />
            </div>
          )}
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

export default Timer;
