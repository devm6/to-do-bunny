
import React from 'react';

const SparklyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating sparkles */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <div 
            className="w-1 h-1 bg-pink-300 rounded-full sparkle-twinkle"
            style={{
              boxShadow: '0 0 6px rgba(255, 105, 180, 0.8)',
              animation: `sparkle-float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        </div>
      ))}
      
      {/* Floating hearts */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-pink-300/40 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
            fontSize: `${8 + Math.random() * 8}px`
          }}
        >
          💕
        </div>
      ))}
      
      {/* Floating stars */}
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={`star-${i}`}
          className="absolute text-purple-300/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: `gentle-drift ${6 + Math.random() * 3}s ease-in-out infinite`,
            fontSize: `${6 + Math.random() * 6}px`
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

export default SparklyBackground;
