
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Task } from '../../types/task';
import { format, startOfDay, isSameDay } from 'date-fns';
import { Clock, Plus } from 'lucide-react';

interface CalendarEvent {
  id: string;
  taskId: string;
  title: string;
  date: Date;
  startTime: string;
  duration: number; // in minutes
}

interface CalendarViewProps {
  tasks: Task[];
  onClose: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showTimeBlockModal, setShowTimeBlockModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(60);

  const handleTimeBlock = () => {
    if (selectedTask && startTime) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        taskId: selectedTask.id,
        title: selectedTask.text,
        date: selectedDate,
        startTime,
        duration
      };
      setEvents(prev => [...prev, newEvent]);
      setShowTimeBlockModal(false);
      setSelectedTask(null);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const availableTasks = tasks.filter(task => task.status === 'focus' && !task.isCompleted);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Pookie Calendar - Time Blocking ✨
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-xl border border-pink-200"
            />
            
            <Button
              onClick={() => setShowTimeBlockModal(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Time Block
            </Button>
          </div>

          {/* Day View */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200 max-h-96 overflow-y-auto">
              {getEventsForDate(selectedDate).length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-pink-300" />
                  <p>No time blocks scheduled</p>
                  <p className="text-sm">Add a time block to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map(event => (
                      <div
                        key={event.id}
                        className="bg-white rounded-lg p-3 border border-pink-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.startTime} ({event.duration} min)
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEvents(prev => prev.filter(e => e.id !== event.id))}
                            className="text-red-500 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time Block Modal */}
        <Dialog open={showTimeBlockModal} onOpenChange={setShowTimeBlockModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Time Block</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Select Task</Label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedTask?.id || ''}
                  onChange={(e) => {
                    const task = availableTasks.find(t => t.id === e.target.value);
                    setSelectedTask(task || null);
                  }}
                >
                  <option value="">Choose a task...</option>
                  {availableTasks.map(task => (
                    <option key={task.id} value={task.id}>{task.text}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                  min="15"
                  max="480"
                />
              </div>
              
              <Button
                onClick={handleTimeBlock}
                disabled={!selectedTask}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
              >
                Schedule Time Block
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarView;
