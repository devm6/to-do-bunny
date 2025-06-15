
import React from "react";
import { Button } from "@/components/ui/button";
import { Timer as TimerIcon, Clock, Calendar } from "lucide-react";

interface TopActionButtonsProps {
  onShowTimer: () => void;
  onShowStopwatch: () => void;
  onShowCalendar: () => void;
}

const TopActionButtons: React.FC<TopActionButtonsProps> = ({
  onShowTimer,
  onShowStopwatch,
  onShowCalendar,
}) => (
  <div className="flex justify-center gap-4 mb-8 flex-wrap">
    <Button 
      onClick={onShowTimer}
      variant="outline" 
      className="border-pink-300/50 text-pink-200 hover:bg-pink-500/20 hover:text-pink-100 hover:border-pink-300 transition-all duration-300"
      style={{ boxShadow: '0 0 15px rgba(255, 105, 180, 0.3)' }}
    >
      <TimerIcon className="h-4 w-4 mr-2" /> Pookie Timer 💖
    </Button>
    <Button 
      onClick={onShowStopwatch}
      variant="outline" 
      className="border-purple-300/50 text-purple-200 hover:bg-purple-500/20 hover:text-purple-100 hover:border-purple-300 transition-all duration-300"
      style={{ boxShadow: '0 0 15px rgba(138, 43, 226, 0.3)' }}
    >
      <Clock className="h-4 w-4 mr-2" /> Pookie Stopwatch ⏰
    </Button>
    <Button 
      onClick={onShowCalendar}
      variant="outline" 
      className="border-pink-300/50 text-pink-200 hover:bg-pink-500/20 hover:text-pink-100 hover:border-pink-300 transition-all duration-300"
      style={{ boxShadow: '0 0 15px rgba(255, 105, 180, 0.3)' }}
    >
      <Calendar className="h-4 w-4 mr-2" /> Calendar View 📅
    </Button>
  </div>
);

export default TopActionButtons;
