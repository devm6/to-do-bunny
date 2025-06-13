
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BunnyMood } from '../types/task';

interface BunnyCompanionProps {
  mood: BunnyMood;
  onMoodChange?: (mood: BunnyMood) => void;
}

const motivationalQuotes = [
  "You're absolutely pookie-tastic! Keep going! 💕",
  "My little pookie is crushing these tasks! 🥰",
  "Being productive never looked so pookie! ✨",
  "You're the most adorable task-master, pookie! 🎀",
  "Pookie power activated! Nothing can stop you! 💪",
  "Look at my little pookie being all productive! So proud! 🌸",
  "Pookie vibes only! You're unstoppable! 💖",
  "My sweet pookie is on fire today! 🔥",
  "Pookie energy is through the roof! ✨",
  "Being this productive is so pookie of you! 💕",
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
  const [showCongratulatoryBow, setShowCongratulatoryBow] = useState(false);

  useEffect(() => {
    // Set a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  useEffect(() => {
    // Show congratulatory bow when task is completed
    if (mood === 'happy') {
      setShowCongratulatoryBow(true);
      const timer = setTimeout(() => {
        setShowCongratulatoryBow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  const getBunnyClasses = () => {
    const baseClasses = "text-8xl transition-all duration-500 transform cursor-pointer";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-125`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-80 scale-95`;
      default:
        return `${baseClasses} hover:scale-110 bunny-float`;
    }
  };

  const getBowClasses = () => {
    const baseClasses = "absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl transition-all duration-500";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-125`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-75 scale-90`;
      default:
        return `${baseClasses} bunny-float scale-105`;
    }
  };

  const getMoodText = () => {
    switch (mood) {
      case 'happy':
        return 'Mission accomplished, pookie! You\'re absolutely amazing! 💕✨';
      case 'sad':
        return 'Took a bit longer on this mission, but you\'re still my precious pookie! 🥺💖';
      default:
        return '';
    }
  };

  const handleBunnyClick = () => {
    navigate('/motivation');
  };

  return (
    <div className="bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-900/30 border-2 border-pink-300/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-fade-in hover:shadow-pink-500/20 transition-all duration-500">
      {/* Enhanced sparkly stars background with more density */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-3 left-6 w-2 h-2 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '0s',
          boxShadow: '0 0 10px rgba(255, 192, 203, 0.8)'
        }}></div>
        <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '0.7s',
          boxShadow: '0 0 8px rgba(218, 112, 214, 0.8)'
        }}></div>
        <div className="absolute bottom-8 left-10 w-1.5 h-1.5 bg-pink-200 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '1.2s',
          boxShadow: '0 0 8px rgba(255, 182, 193, 0.8)'
        }}></div>
        <div className="absolute bottom-4 right-6 w-2 h-2 bg-purple-200 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '1.8s',
          boxShadow: '0 0 10px rgba(221, 160, 221, 0.8)'
        }}></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '2.5s',
          boxShadow: '0 0 6px rgba(255, 192, 203, 0.8)'
        }}></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '3s',
          boxShadow: '0 0 6px rgba(218, 112, 214, 0.8)'
        }}></div>
        {/* Additional sparkles for more cuteness */}
        <div className="absolute top-16 left-1/4 w-1 h-1 bg-pink-400 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '0.3s',
          boxShadow: '0 0 6px rgba(255, 20, 147, 0.8)'
        }}></div>
        <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '2.1s',
          boxShadow: '0 0 8px rgba(138, 43, 226, 0.8)'
        }}></div>
      </div>
      
      <div className="text-center relative z-10">
        <div className="mb-4 relative">
          {/* Enhanced bunny with better visual effects */}
          <div className="relative inline-block">
            <div className={getBunnyClasses()} onClick={handleBunnyClick} style={{
              filter: mood === 'happy' ? 'hue-rotate(315deg) saturate(1.8) brightness(1.4) drop-shadow(0 0 25px rgba(255, 105, 180, 1)) drop-shadow(0 0 50px rgba(255, 192, 203, 0.6))' : 
                     mood === 'sad' ? 'grayscale(0.1) brightness(0.9) drop-shadow(0 0 15px rgba(255, 192, 203, 0.6))' : 
                     'drop-shadow(0 0 20px rgba(255, 192, 203, 0.8)) drop-shadow(0 0 40px rgba(255, 105, 180, 0.4))',
              textShadow: mood === 'happy' ? '0 0 30px rgba(255, 105, 180, 0.8)' : '0 0 20px rgba(255, 192, 203, 0.6)'
            }}>
              🐰
            </div>
            
            {/* Enhanced pink bow with better animations */}
            <div 
              className={getBowClasses()}
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 1)) drop-shadow(0 0 30px rgba(255, 20, 147, 0.6))',
                textShadow: '0 0 20px rgba(255, 105, 180, 0.8)'
              }}
            >
              🎀
            </div>

            {/* Enhanced congratulatory bow effect */}
            {showCongratulatoryBow && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce z-20" style={{
                filter: 'drop-shadow(0 0 25px rgba(255, 105, 180, 1)) drop-shadow(0 0 50px rgba(255, 20, 147, 0.8))',
                animation: 'bunny-celebration 0.6s ease-in-out infinite, bounce 1s infinite'
              }}>
                🎀
              </div>
            )}

            {/* Cute floating hearts around bunny */}
            <div className="absolute -top-2 -left-2 text-lg animate-pulse opacity-70" style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))',
              animationDelay: '0s'
            }}>💕</div>
            <div className="absolute -top-1 -right-3 text-sm animate-ping opacity-60" style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 192, 203, 0.8))',
              animationDelay: '1.5s'
            }}>✨</div>
            <div className="absolute -bottom-2 -left-1 text-xs animate-pulse opacity-50" style={{
              filter: 'drop-shadow(0 0 6px rgba(255, 182, 193, 0.8))',
              animationDelay: '2.2s'
            }}>🌸</div>
          </div>
        </div>
        
        {/* Enhanced quote styling with better pookie vibes */}
        {!getMoodText() && randomQuote && (
          <div className="text-base text-pink-100 font-semibold animate-fade-in mb-3 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-300/30" style={{
            animationDelay: '0.5s',
            textShadow: '0 0 15px rgba(255, 192, 203, 0.8)',
            backdropFilter: 'blur(10px)'
          }}>
            {randomQuote}
          </div>
        )}
        
        {getMoodText() && (
          <div className="text-base text-pink-100 font-semibold animate-fade-in px-4 py-2 bg-gradient-to-r from-pink-500/25 to-purple-500/25 rounded-2xl border border-pink-300/40" style={{
            animationDelay: '0.2s',
            textShadow: '0 0 15px rgba(255, 192, 203, 0.8)',
            backdropFilter: 'blur(10px)'
          }}>
            {getMoodText()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BunnyCompanion;
