
import { useState, useEffect, useCallback } from 'react';
import { Task, BunnyMood, TimerState } from '../types/task';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bunnyMood, setBunnyMood] = useState<BunnyMood>('neutral');
  const [timerState, setTimerState] = useState<TimerState>({
    activeTaskId: null,
    isRunning: false,
    elapsedTime: 0
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState.isRunning && timerState.activeTaskId) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newElapsedTime = prev.elapsedTime + 1;
          
          // Check if timer has completed and move to pending if not checked off
          const activeTask = tasks.find(t => t.id === prev.activeTaskId);
          if (activeTask?.timeAllocation && newElapsedTime >= (activeTask.timeAllocation * 60) && !activeTask.isCompleted) {
            // Timer completed but task not checked off - move to pending
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
  }, [timerState.isRunning, timerState.activeTaskId, tasks]);

  // Bunny mood reset effect
  useEffect(() => {
    if (bunnyMood !== 'neutral') {
      const timeout = setTimeout(() => {
        setBunnyMood('neutral');
      }, 3000); // Return to neutral after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [bunnyMood]);

  const addTask = useCallback((text: string, timeAllocation?: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      timeAllocation,
      isCompleted: false,
      timeSpent: 0,
      isActive: false,
      status: 'focus'
    };

    setTasks(prev => [...prev, newTask]);
  }, []);

  const toggleComplete = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const wasCompleted = task.isCompleted;
        const newCompleted = !wasCompleted;
        
        if (newCompleted && task.status === 'focus') {
          // Task is being completed from focus list
          const finalTimeSpent = timerState.activeTaskId === taskId ? timerState.elapsedTime : task.timeSpent;
          
          // Stop timer if this task is active
          if (timerState.activeTaskId === taskId) {
            setTimerState(prev => ({
              ...prev,
              activeTaskId: null,
              isRunning: false,
              elapsedTime: 0
            }));
          }

          // Determine bunny mood and new status
          let newStatus: 'completed' | 'pending' = 'completed';
          if (task.timeAllocation && finalTimeSpent > (task.timeAllocation * 60)) {
            newStatus = 'pending';
            setBunnyMood('sad');
          } else if (task.timeAllocation) {
            setBunnyMood('happy');
          }

          return {
            ...task,
            isCompleted: true,
            timeSpent: finalTimeSpent,
            status: newStatus,
            completedAt: new Date()
          };
        } else if (!newCompleted && (task.status === 'completed' || task.status === 'pending')) {
          // Task is being uncompleted from completed/pending list
          return {
            ...task,
            isCompleted: false,
            status: 'focus',
            completedAt: undefined
          };
        }
      }
      return task;
    }));
  }, [timerState]);

  const startTimer = useCallback((taskId: string) => {
    // Stop any currently running timer
    if (timerState.activeTaskId && timerState.activeTaskId !== taskId) {
      setTasks(prev => prev.map(task => 
        task.id === timerState.activeTaskId ? 
          { ...task, timeSpent: timerState.elapsedTime, isActive: false } : 
          task
      ));
    }

    // Get current time spent for this task
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
  }, [timerState, tasks]);

  const pauseTimer = useCallback(() => {
    if (timerState.activeTaskId) {
      setTasks(prev => prev.map(task => 
        task.id === timerState.activeTaskId ? 
          { ...task, timeSpent: timerState.elapsedTime, isActive: false } : 
          task
      ));
    }

    setTimerState(prev => ({
      ...prev,
      isRunning: false
    }));
  }, [timerState]);

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
  }, [timerState]);

  const deleteTask = useCallback((taskId: string) => {
    if (timerState.activeTaskId === taskId) {
      setTimerState({
        activeTaskId: null,
        isRunning: false,
        elapsedTime: 0
      });
    }
    
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, [timerState]);

  const editTask = useCallback((taskId: string, newText: string, newTimeAllocation?: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? 
        { ...task, text: newText, timeAllocation: newTimeAllocation } : 
        task
    ));
  }, []);

  return {
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
  };
};
