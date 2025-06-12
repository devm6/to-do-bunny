
import React from 'react';
import { BunnyMood } from '../types/task';

interface BunnyCompanionProps {
  mood: BunnyMood;
  onMoodChange?: (mood: BunnyMood) => void;
}

const BunnyCompanion: React.FC<BunnyCompanionProps> = ({ mood }) => {
  const getBunnyEmoji = () => {
    switch (mood) {
      case 'happy':
        return '🐰';
      case 'sad':
        return '🥺';
      default:
        return '🐰';
    }
  };

  const getBunnyClasses = () => {
    const baseClasses = "text-6xl transition-all duration-300 transform";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-110 animate-bounce`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-75`;
      default:
        return `${baseClasses} hover:scale-105`;
    }
  };

  const getMoodText = () => {
    switch (mood) {
      case 'happy':
        return 'So proud of you! 🌸';
      case 'sad':
        return 'That took a bit longer... 💙';
      default:
        return 'Ready when you are! ✨';
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="text-center">
        <div className="mb-3">
          <div 
            className={getBunnyClasses()}
            style={{ 
              filter: mood === 'happy' ? 'hue-rotate(300deg) saturate(1.2) brightness(1.1)' : 
                     mood === 'sad' ? 'grayscale(0.3) brightness(0.8)' : 'none'
            }}
          >
            {getBunnyEmoji()}
          </div>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {getMoodText()}
        </div>
        <div className="mt-2 text-xs text-muted-foreground opacity-75">
          Your companion
        </div>
      </div>
    </div>
  );
};

export default BunnyCompanion;
