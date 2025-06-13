
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

  const getBowClasses = () => {
    const baseClasses = "absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl transition-all duration-300";
    switch (mood) {
      case 'happy':
        return `${baseClasses} bunny-happy scale-110`;
      case 'sad':
        return `${baseClasses} bunny-sad opacity-75`;
      default:
        return `${baseClasses} bunny-float`;
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
    <div className="bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20 border border-pink-300/30 rounded-2xl p-6 shadow-lg relative overflow-hidden animate-fade-in hover:shadow-xl transition-shadow duration-300">
      {/* Sparkly stars background with pink/purple theme */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-2 left-4 w-1 h-1 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '0s'
        }}></div>
        <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '0.7s'
        }}></div>
        <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-pink-200 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '1.2s'
        }}></div>
        <div className="absolute bottom-3 right-4 w-1 h-1 bg-purple-200 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '1.8s'
        }}></div>
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{
          animationDelay: '2.5s'
        }}></div>
        <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{
          animationDelay: '3s'
        }}></div>
      </div>
      
      <div className="text-center relative z-10">
        <div className="mb-3 relative">
          {/* Bunny with synchronized bow */}
          <div className="relative inline-block">
            <div className={getBunnyClasses()} onClick={handleBunnyClick} style={{
              filter: mood === 'happy' ? 'hue-rotate(300deg) saturate(1.5) brightness(1.3) drop-shadow(0 0 15px rgba(255, 192, 203, 0.8))' : 
                     mood === 'sad' ? 'grayscale(0.2) brightness(0.8) drop-shadow(0 0 10px rgba(255, 192, 203, 0.4))' : 
                     'drop-shadow(0 0 10px rgba(255, 192, 203, 0.6))'
            }}>
              🐰
            </div>
            
            {/* Pink bow on bunny's head - synchronized animation */}
            <div 
              className={getBowClasses()}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.8))'
              }}
            >
              🎀
            </div>

            {/* Congratulatory bow effect */}
            {showCongratulatoryBow && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce z-20" style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 1))',
                animation: 'bunny-celebration 0.6s ease-in-out infinite'
              }}>
                🎀
              </div>
            )}
          </div>
        </div>
        
        {/* Random motivational quote with enhanced pookie vibes */}
        {!getMoodText() && randomQuote && (
          <div className="text-sm text-pink-200 font-medium animate-fade-in mb-2" style={{
            animationDelay: '0.5s',
            textShadow: '0 0 10px rgba(255, 192, 203, 0.5)'
          }}>
            {randomQuote}
          </div>
        )}
        
        {getMoodText() && (
          <div className="text-sm text-pink-200 font-medium animate-fade-in" style={{
            animationDelay: '0.2s',
            textShadow: '0 0 10px rgba(255, 192, 203, 0.5)'
          }}>
            {getMoodText()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BunnyCompanion;
