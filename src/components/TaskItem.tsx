import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Pause, RotateCcw, Edit, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  isTimerActive: boolean;
  elapsedTime: number;
  onToggleComplete: (taskId: string, taskElement?: HTMLElement) => void;
  onStartTimer: (taskId: string) => void;
  onPauseTimer: () => void;
  onResetTimer: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newText: string, newTimeAllocation?: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isTimerActive,
  elapsedTime,
  onToggleComplete,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onDelete,
  onEdit
}) => {
  const navigate = useNavigate();

  const handleTaskClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the task text, not on buttons or checkbox
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('task-text')) {
      navigate('/timer', { state: { task } });
    }
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      const taskElement = document.getElementById(`task-${task.id}`);
      onToggleComplete(task.id, taskElement || undefined);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isOverTime = task.timeAllocation && elapsedTime > (task.timeAllocation * 60);
  const timeDisplay = isTimerActive ? elapsedTime : task.timeSpent;

  const getTimerColor = () => {
    if (isOverTime) return 'text-orange-400';
    if (isTimerActive) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div 
      id={`task-${task.id}`}
      className={`bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 gentle-fade-in ${
        isTimerActive ? 'ring-2 ring-primary/50 bg-primary/5' : ''
      } ${task.isCompleted ? 'opacity-75' : ''} group cursor-pointer`} 
      onClick={handleTaskClick}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={handleCheckboxChange}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="flex-1">
          <div className={`font-medium task-text ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {task.text}
          </div>
          
          <div className="flex items-center gap-4 mt-1">
            {task.timeAllocation && (
              <span className="text-xs text-muted-foreground">
                Target: {task.timeAllocation}m
              </span>
            )}
            
            <span className={`text-sm font-mono ${getTimerColor()}`}>
              {formatTime(timeDisplay)}
              {isOverTime && ' ⚠️'}
            </span>
          </div>
        </div>

        {task.status === 'focus' && !task.isCompleted && (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {!isTimerActive ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartTimer(task.id);
                }}
                className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPauseTimer();
                }}
                className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onResetTimer(task.id);
              }}
              className="h-8 w-8 p-0 hover:bg-muted text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              const newText = prompt('Edit task:', task.text);
              if (newText && newText.trim()) {
                const newTime = task.timeAllocation ? 
                  prompt('Edit time allocation (minutes):', task.timeAllocation.toString()) : null;
                const timeAllocation = newTime ? parseInt(newTime) : task.timeAllocation;
                onEdit(task.id, newText.trim(), timeAllocation);
              }
            }}
            className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="h-8 w-8 p-0 hover:bg-destructive/20 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
