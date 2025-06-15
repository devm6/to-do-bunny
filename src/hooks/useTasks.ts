
import { useState, useCallback } from 'react';
import { Task } from '../types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text: string, timeAllocation?: number, status: 'focus' | 'pending' = 'focus') => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      timeAllocation,
      isCompleted: false,
      timeSpent: 0,
      isActive: false,
      status
    };

    setTasks(prev => [...prev, newTask]);
  }, []);

  const editTask = useCallback((taskId: string, newText: string, newTimeAllocation?: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? 
        { ...task, text: newText, timeAllocation: newTimeAllocation } : 
        task
    ));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: 'focus' | 'pending') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? 
        { ...task, status: newStatus } : 
        task
    ));
  }, []);

  return {
    tasks,
    setTasks,
    addTask,
    editTask,
    deleteTask,
    moveTask
  };
};
