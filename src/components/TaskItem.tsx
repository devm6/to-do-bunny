import React from 'react';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Pause, RotateCcw, Edit, Trash2, Maximize, ArrowRight, ArrowLeft } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  isTimerActive: boolean;
  elapsedTime: number;
  showCarrotGain: boolean;
  onToggleComplete: (taskId: string) => void;
  onStartTimer: (taskId: string) => void;
  onPauseTimer: () => void;
  onResetTimer: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newText: string, newTimeAllocation?: number) => void;
  onFullscreen?: (taskId: string) => void;
  onMoveTask?: (taskId: string, newStatus: 'focus' | 'pending') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isTimerActive,
  elapsedTime,
  showCarrotGain,
  onToggleComplete,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onDelete,
  onEdit,
  onFullscreen,
  onMoveTask
}) => {
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
    <div className={`bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 gentle-fade-in relative ${
      isTimerActive ? 'ring-2 ring-primary/50 bg-primary/5' : ''
    } ${task.isCompleted ? 'opacity-75' : ''}`}>
      {/* Carrot gain message */}
      {showCarrotGain && (
        <div className="absolute -top-2 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium carrot-gain-message animate-bounce">
          You gained a carrot! 🥕
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Checkbox for task completion */}
        <div className="flex items-center">
          <Checkbox
            checked={task.isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>
        
        <div className="flex-1">
          <div className={`font-medium ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
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

        {/* Move task buttons */}
        {onMoveTask && !task.isCompleted && (
          <div className="flex items-center gap-1">
            {task.status === 'focus' ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveTask(task.id, 'pending')}
                className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
                title="Move to Future Goals"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveTask(task.id, 'focus')}
                className="h-8 w-8 p-0 hover:bg-pink-100 text-pink-600"
                title="Move to Current Mission"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {task.status === 'focus' && !task.isCompleted && (
          <div className="flex items-center gap-1">
            {!isTimerActive ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStartTimer(task.id)}
                className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPauseTimer}
                className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            
            {/* Fullscreen button - only show when timer is active */}
            {isTimerActive && onFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFullscreen(task.id)}
                className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground"
                title="Fullscreen Timer"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onResetTimer(task.id)}
              className="h-8 w-8 p-0 hover:bg-muted text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
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
            onClick={() => onDelete(task.id)}
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
