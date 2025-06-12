
import React from 'react';
import { Task, TimerState } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  activeList: 'focus' | 'completed' | 'pending';
  timerState: TimerState;
  onToggleComplete: (taskId: string) => void;
  onStartTimer: (taskId: string) => void;
  onPauseTimer: () => void;
  onResetTimer: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newText: string, newTimeAllocation?: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeList,
  timerState,
  onToggleComplete,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onDelete,
  onEdit
}) => {
  const filteredTasks = tasks.filter(task => task.status === activeList);

  const getEmptyMessage = () => {
    switch (activeList) {
      case 'focus':
        return {
          title: "Your Today's Focus is ready! 🌱",
          subtitle: "Add your first cozy quest above to get started"
        };
      case 'completed':
        return {
          title: "The completed burrow awaits! ✨",
          subtitle: "Tasks finished on time will bloom here"
        };
      case 'pending':
        return {
          title: "No pending tasks right now 💙",
          subtitle: "Tasks that took a bit longer appear here"
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  if (filteredTasks.length === 0) {
    const emptyMsg = getEmptyMessage();
    return (
      <div className="text-center py-12 gentle-fade-in">
        <div className="text-lg font-medium text-muted-foreground mb-2">
          {emptyMsg.title}
        </div>
        <div className="text-sm text-muted-foreground">
          {emptyMsg.subtitle}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <div key={task.id} className="group">
          <TaskItem
            task={task}
            isTimerActive={timerState.activeTaskId === task.id && timerState.isRunning}
            elapsedTime={timerState.activeTaskId === task.id ? timerState.elapsedTime : task.timeSpent}
            onToggleComplete={onToggleComplete}
            onStartTimer={onStartTimer}
            onPauseTimer={onPauseTimer}
            onResetTimer={onResetTimer}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
