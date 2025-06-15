
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string, timeAllocation?: number, status?: 'focus' | 'pending') => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [timeAllocation, setTimeAllocation] = useState('');
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('hours');
  const [assignTo, setAssignTo] = useState<'focus' | 'pending'>('focus');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      let timeInHours: number | undefined;
      if (timeAllocation) {
        const timeValue = parseInt(timeAllocation);
        timeInHours = timeUnit === 'minutes' ? timeValue / 60 : timeValue;
      }
      onAddTask(taskText.trim(), timeInHours, assignTo);
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
              Time allocation
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={timeAllocation}
                onChange={(e) => setTimeAllocation(e.target.value)}
                placeholder={timeUnit === 'hours' ? '2' : '30'}
                min="1"
                max={timeUnit === 'hours' ? '24' : '1440'}
                className="bg-muted border-border rounded-xl text-foreground placeholder:text-muted-foreground"
              />
              <Select value={timeUnit} onValueChange={(value: 'minutes' | 'hours') => setTimeUnit(value)}>
                <SelectTrigger className="w-24 bg-muted border-border rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">min</SelectItem>
                  <SelectItem value="hours">hrs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">
              Assign to
            </label>
            <Select value={assignTo} onValueChange={(value: 'focus' | 'pending') => setAssignTo(value)}>
              <SelectTrigger className="bg-muted border-border rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="focus">Current Mission</SelectItem>
                <SelectItem value="pending">Future Goals</SelectItem>
              </SelectContent>
            </Select>
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
