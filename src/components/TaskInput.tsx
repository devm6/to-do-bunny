
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string, timeAllocation?: number) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [timeAllocation, setTimeAllocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      const timeInMinutes = timeAllocation ? parseInt(timeAllocation) : undefined;
      onAddTask(taskText.trim(), timeInMinutes);
      setTaskText('');
      setTimeAllocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-lg gentle-fade-in">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            What quest awaits?
          </label>
          <Input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Write your task here..."
            className="bg-muted border-border rounded-xl text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">
              Time allocation (minutes)
            </label>
            <Input
              type="number"
              value={timeAllocation}
              onChange={(e) => setTimeAllocation(e.target.value)}
              placeholder="30"
              min="1"
              max="480"
              className="bg-muted border-border rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              type="submit" 
              disabled={!taskText.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
