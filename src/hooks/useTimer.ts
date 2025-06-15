
import { useState, useEffect, useCallback } from 'react';
import { TimerState, Task, BunnyMood } from '../types/task';

export const useTimer = (tasks: Task[], setTasks: (fn: (prev: Task[]) => Task[]) => void, setBunnyMood: (mood: BunnyMood) => void) => {
  const [timerState, setTimerState] = useState<TimerState>({
    activeTaskId: null,
    isRunning: false,
    elapsedTime: 0
  });

  // Background timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState.isRunning && timerState.activeTaskId) {
      interval = setInterval(() => {
        setTimerState(prev => {
          if (!prev.isRunning || !prev.activeTaskId) return prev;
          
          const newElapsedTime = prev.elapsedTime + 1;
          
          setTasks(prevTasks => prevTasks.map(task => 
            task.id === prev.activeTaskId 
              ? { ...task, timeSpent: newElapsedTime }
              : task
          ));
          
          const activeTask = tasks.find(t => t.id === prev.activeTaskId);
          if (activeTask?.timeAllocation && newElapsedTime >= (activeTask.timeAllocation * 3600) && !activeTask.isCompleted) {
            setTasks(prevTasks => prevTasks.map(task => 
              task.id === prev.activeTaskId 
                ? { ...task, status: 'pending', timeSpent: newElapsedTime, isActive: false }
                : task
            ));
            
            setBunnyMood('sad');
            
            return {
              activeTaskId: null,
              isRunning: false,
              elapsedTime: 0
            };
          }
          
          return {
            ...prev,
            elapsedTime: newElapsedTime
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isRunning, timerState.activeTaskId, tasks, setTasks, setBunnyMood]);

  const startTimer = useCallback((taskId: string) => {
    if (timerState.activeTaskId && timerState.activeTaskId !== taskId) {
      setTasks(prev => prev.map(task => 
        task.id === timerState.activeTaskId ? 
          { ...task, isActive: false } : 
          task
      ));
    }

    const task = tasks.find(t => t.id === taskId);
    const currentTimeSpent = task?.timeSpent || 0;

    setTimerState({
      activeTaskId: taskId,
      isRunning: true,
      elapsedTime: currentTimeSpent
    });

    setTasks(prev => prev.map(task => ({
      ...task,
      isActive: task.id === taskId
    })));
  }, [timerState, tasks, setTasks]);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false
    }));

    if (timerState.activeTaskId) {
      setTasks(prev => prev.map(task => 
        task.id === timerState.activeTaskId ? 
          { ...task, isActive: false } : 
          task
      ));
    }
  }, [timerState, setTasks]);

  const resetTimer = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? 
        { ...task, timeSpent: 0, isActive: false } : 
        task
    ));

    if (timerState.activeTaskId === taskId) {
      setTimerState({
        activeTaskId: null,
        isRunning: false,
        elapsedTime: 0
      });
    }
  }, [timerState, setTasks]);

  return {
    timerState,
    setTimerState,
    startTimer,
    pauseTimer,
    resetTimer
  };
};

