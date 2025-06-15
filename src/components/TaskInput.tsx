
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaskInputProps {
  onAddTask: (text: string, timeAllocation?: number, targetStatus?: 'focus' | 'pending') => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [timeAllocation, setTimeAllocation] = useState('');
  const [activeTab, setActiveTab] = useState<'focus' | 'pending'>('focus');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      const timeInMinutes = timeAllocation ? parseInt(timeAllocation) : undefined;
      onAddTask(taskText.trim(), timeInMinutes, activeTab);
      setTaskText('');
      setTimeAllocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-lg gentle-fade-in">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'focus' | 'pending')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="focus" className="text-sm">
            Current Mission 💕
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Future Goals 🌸
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="focus" className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              What quest awaits right now?
            </label>
            <Input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Write your current mission here..."
              className="bg-muted border-border rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              What future goal do you want to add?
            </label>
            <Input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Write your future goal here..."
              className="bg-muted border-border rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </TabsContent>
        
        <div className="flex gap-3 mt-4">
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
              Add {activeTab === 'focus' ? 'Mission' : 'Goal'}
            </Button>
          </div>
        </div>
      </Tabs>
    </form>
  );
};

export default TaskInput;
