
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BunnyMoodExtended } from '../types/gamification';

interface BunnyCompanionProps {
  mood: BunnyMoodExtended;
  onMoodChange?: (mood: BunnyMoodExtended) => void;
  clickable?: boolean;
}

const BunnyCompanion: React.FC<BunnyCompanionProps> = ({ mood, clickable = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate('/timer');
    }
  };

  const getBunnyEmoji = () => {
    switch (mood) {
      case 'happy':
        return '😊🐰';
      case 'sad':
        return '😢🐰';
      case 'excited':
        return '🤩🐰';
      case 'focused':
        return '🧐🐰';
      case 'proud':
        return '😤🐰';
      case 'sleepy':
        return '😴🐰';
      default:
        return '🐰';
    }
  };

  const getBunnyClasses = () => {
    const baseClasses = "text-6xl transition-all duration-300 transform";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-110`;
      case 'excited':
        return `${baseClasses} bunny-celebration scale-115`;
      case 'proud':
        return `${baseClasses} bunny-proud scale-110`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-75`;
      case 'sleepy':
        return `${baseClasses} opacity-80 scale-95`;
      case 'focused':
        return `${baseClasses} hover:scale-105`;
      default:
        return `${baseClasses} hover:scale-105`;
    }
  };

  const getMoodText = () => {
    switch (mood) {
      case 'happy':
        return 'Mission accomplished! 🚀';
      case 'excited':
        return 'Ready for adventure! ✨';
      case 'proud':
        return 'Outstanding performance! 🏆';
      case 'sad':
        return 'Took a bit longer on this mission... 🌌';
      case 'sleepy':
        return 'Time for a rest break... 💤';
      case 'focused':
        return 'In the zone! 🎯';
      default:
        return 'Ready for the next mission! ✨';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-2xl p-6 shadow-lg relative overflow-hidden ${
        clickable ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300' : ''
      }`}
      onClick={handleClick}
    >
      {/* Space stars background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 left-4 w-1 h-1 bg-accent rounded-full starfield-twinkle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-primary rounded-full starfield-twinkle" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-accent rounded-full starfield-twinkle" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-3 right-4 w-1 h-1 bg-secondary rounded-full starfield-twinkle" style={{ animationDelay: '1.8s' }}></div>
      </div>
      
      <div className="text-center relative z-10">
        <div className="mb-3">
          <div 
            className={getBunnyClasses()}
            style={{ 
              filter: mood === 'happy' || mood === 'excited' || mood === 'proud' ? 
                'hue-rotate(280deg) saturate(1.3) brightness(1.2) drop-shadow(0 0 10px rgba(200, 100, 255, 0.5))' : 
                mood === 'sad' ? 'grayscale(0.4) brightness(0.7)' : 
                'drop-shadow(0 0 5px rgba(120, 60, 200, 0.3))'
            }}
          >
            {getBunnyEmoji()}
          </div>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {getMoodText()}
        </div>
        <div className="mt-2 text-xs text-muted-foreground opacity-75">
          Space companion
        </div>
        {clickable && (
          <div className="mt-2 text-xs text-primary opacity-75">
            Click for mission timer
          </div>
        )}
      </div>
    </div>
  );
};

export default BunnyCompanion;
