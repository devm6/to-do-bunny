
import React from "react";
import TaskList from "@/components/TaskList";
import { Task, TimerState } from "@/types/task";

interface MainTaskContainerProps {
  tasks: Task[];
  activeList: 'focus' | 'completed' | 'pending';
  timerState: TimerState;
  showCarrotGain: string | null;
  onToggleComplete: (taskId: string) => void;
  onStartTimer: (taskId: string) => void;
  onPauseTimer: () => void;
  onResetTimer: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newText: string, newTimeAllocation?: number) => void;
  onFullscreen: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: 'focus' | 'pending') => void;
}

const MainTaskContainer: React.FC<MainTaskContainerProps> = ({
  tasks,
  activeList,
  timerState,
  showCarrotGain,
  onToggleComplete,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onDelete,
  onEdit,
  onFullscreen,
  onMoveTask,
}) => (
  <div className="bg-gradient-to-br from-pink-900/10 via-card to-purple-900/10 border border-pink-300/20 rounded-2xl p-6 shadow-lg" style={{
    boxShadow: '0 0 30px rgba(255, 105, 180, 0.15)'
  }}>
    <TaskList
      tasks={tasks}
      activeList={activeList}
      timerState={timerState}
      showCarrotGain={showCarrotGain}
      onToggleComplete={onToggleComplete}
      onStartTimer={onStartTimer}
      onPauseTimer={onPauseTimer}
      onResetTimer={onResetTimer}
      onDelete={onDelete}
      onEdit={onEdit}
      onFullscreen={onFullscreen}
      onMoveTask={onMoveTask}
    />
  </div>
);

export default MainTaskContainer;
