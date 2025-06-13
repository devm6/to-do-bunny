
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BunnyMood } from '../types/task';

interface BunnyCompanionProps {
  mood: BunnyMood;
  onMoodChange?: (mood: BunnyMood) => void;
}

const motivationalQuotes = [
  "Every small step counts on your journey! 🐰",
  "You're doing amazing, keep hopping forward!",
  "Believe in yourself, little bunny warrior!",
  "Progress, not perfection, is the goal!",
  "You've got this, one carrot at a time!",
  "Small wins lead to big victories!",
  "Keep bouncing back, that's your superpower!",
  "Your effort today creates tomorrow's success!",
  "Hop into your potential, you're unstoppable!",
  "Every task completed is a victory dance!",
  "Be the change you want to see in your burrow! 🏠",
  "The journey of a thousand hops begins with a single bounce! 🦘",
  "To be or not to be productive, that is the question... Choose to be! 🎭",
  "May the focus be with you, young padawan! ⭐",
  "Show me the progress! 💰",
  "The early bunny catches the carrot! 🌅"
];

const BunnyCompanion: React.FC<BunnyCompanionProps> = ({
  mood
}) => {
  const navigate = useNavigate();
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    // Set a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  const getBunnyClasses = () => {
    const baseClasses = "text-6xl transition-all duration-300 transform cursor-pointer";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-110`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-75`;
      default:
        return `${baseClasses} hover:scale-105 bunny-float`;
    }
  };

  const getMoodText = () => {
    switch (mood) {
      case 'happy':
        return 'Mission accomplished!';
      case 'sad':
        return 'Took a bit longer on this mission...';
      default:
        return '';
    }
  };

  const handleBunnyClick = () => {
    navigate('/motivation');
  };

  return (
    <div className="bg-black border border-border rounded-2xl p-6 shadow-lg relative overflow-hidden animate-fade-in hover:shadow-xl transition-shadow duration-300">
      {/* Space stars background with enhanced animations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 left-4 w-1 h-1 bg-accent rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '0s'
        }}></div>
        <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-primary rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '0.7s'
        }}></div>
        <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-accent rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '1.2s'
        }}></div>
        <div className="absolute bottom-3 right-4 w-1 h-1 bg-secondary rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '1.8s'
        }}></div>
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-primary rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '2.5s'
        }}></div>
      </div>
      
      <div className="text-center relative z-10">
        <div className="mb-3">
          <div 
            className={getBunnyClasses()} 
            onClick={handleBunnyClick}
            style={{
              filter: mood === 'happy' ? 'hue-rotate(280deg) saturate(1.3) brightness(1.2) drop-shadow(0 0 10px rgba(200, 100, 255, 0.5))' : mood === 'sad' ? 'grayscale(0.4) brightness(0.7)' : 'drop-shadow(0 0 5px rgba(120, 60, 200, 0.3))'
            }}
          >
            🐰
          </div>
        </div>
        
        {/* Random motivational quote */}
        {!getMoodText() && randomQuote && (
          <div className="text-sm text-muted-foreground font-medium animate-fade-in mb-2" style={{
            animationDelay: '0.5s'
          }}>
            {randomQuote}
          </div>
        )}
        
        {getMoodText() && (
          <div className="text-sm text-muted-foreground font-medium animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
            {getMoodText()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BunnyCompanion;
