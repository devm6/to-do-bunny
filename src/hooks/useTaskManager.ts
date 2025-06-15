
import { useCallback } from 'react';
import { useTasks } from './useTasks';
import { useTimer } from './useTimer';
import { useBunnyMood } from './useBunnyMood';
import { useCarrotSystem } from './useCarrotSystem';

export const useTaskManager = () => {
  const { tasks, setTasks, addTask, editTask, deleteTask, moveTask } = useTasks();
  const { bunnyMood, setBunnyMood } = useBunnyMood();
  const { carrotCount, showCarrotGain, gainCarrot, loseCarrot } = useCarrotSystem();
  const { timerState, setTimerState, startTimer, pauseTimer, resetTimer } = useTimer(tasks, setTasks, setBunnyMood);

  const toggleComplete = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const wasCompleted = task.isCompleted;
        const newCompleted = !wasCompleted;
        
        if (newCompleted && task.status === 'focus') {
          const finalTimeSpent = timerState.activeTaskId === taskId ? timerState.elapsedTime : task.timeSpent;
          
          if (timerState.activeTaskId === taskId) {
            setTimerState(prev => ({
              ...prev,
              activeTaskId: null,
              isRunning: false,
              elapsedTime: 0
            }));
          }

          gainCarrot(taskId);

          let newStatus: 'completed' | 'pending' = 'completed';
          if (task.timeAllocation && finalTimeSpent > (task.timeAllocation * 3600)) {
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
          loseCarrot();
          
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
  }, [timerState, gainCarrot, loseCarrot, setBunnyMood, setTasks, setTimerState]);

  const handleDeleteTask = useCallback((taskId: string) => {
    if (timerState.activeTaskId === taskId) {
      setTimerState({
        activeTaskId: null,
        isRunning: false,
        elapsedTime: 0
      });
    }
    deleteTask(taskId);
  }, [timerState, deleteTask, setTimerState]);

  return {
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
    deleteTask: handleDeleteTask,
    editTask,
    moveTask
  };
};
