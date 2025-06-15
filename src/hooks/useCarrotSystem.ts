
import { useState, useEffect, useCallback } from 'react';

export const useCarrotSystem = () => {
  const [carrotCount, setCarrotCount] = useState<number>(() => {
    const saved = localStorage.getItem('carrotCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showCarrotGain, setShowCarrotGain] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('carrotCount', carrotCount.toString());
  }, [carrotCount]);

  useEffect(() => {
    if (showCarrotGain) {
      const timeout = setTimeout(() => {
        setShowCarrotGain(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showCarrotGain]);

  const gainCarrot = useCallback((taskId: string) => {
    setCarrotCount(prev => prev + 1);
    setShowCarrotGain(taskId);
  }, []);

  const loseCarrot = useCallback(() => {
    setCarrotCount(prev => Math.max(0, prev - 1));
  }, []);

  return {
    carrotCount,
    showCarrotGain,
    gainCarrot,
    loseCarrot
  };
};
