
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
  "Every task completed is a victory dance!"
];

const Motivation = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleBunnyClick = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Motivation Corner
          </h1>

          {/* Clickable Bunny */}
          <div className="mb-8 flex justify-center">
            <div 
              className="bg-black border border-border rounded-2xl p-8 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleBunnyClick}
            >
              {/* Space stars background */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-2 left-4 w-1 h-1 bg-accent rounded-full starfield-twinkle animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-primary rounded-full starfield-twinkle animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-accent rounded-full starfield-twinkle animate-ping" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute bottom-3 right-4 w-1 h-1 bg-secondary rounded-full starfield-twinkle animate-pulse" style={{ animationDelay: '1.8s' }}></div>
              </div>
              
              <div className="relative z-10">
                <div 
                  className="text-8xl transition-all duration-300 transform bunny-float hover:scale-110"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(120, 60, 200, 0.5))'
                  }}
                >
                  🐰
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
            <p className="text-xl text-foreground font-medium animate-fade-in">
              {motivationalQuotes[currentQuoteIndex]}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Click the bunny for more motivation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motivation;
