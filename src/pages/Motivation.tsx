
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
  "Every task completed is a victory dance!",
  // AI-generated tweaked famous quotes
  "Be the change you want to see in your burrow! 🏠",
  "The journey of a thousand hops begins with a single bounce! 🦘",
  "To be or not to be productive, that is the question... Choose to be! 🎭",
  "I have a dream... that all tasks will be completed on time! ✨",
  "Ask not what your to-do list can do for you, ask what you can do for your to-do list! 📝",
  "Life is like a box of carrots, you never know which one will motivate you most! 🥕",
  "Float like a butterfly, sting like a bee... work like a bunny! 🐝",
  "The only thing we have to fear is unfinished tasks themselves! 😤",
  "Yesterday is history, tomorrow is a mystery, today is a gift... that's why they call it the present task! 🎁",
  "Houston, we have a solution... and it's productivity! 🚀",
  "May the focus be with you, young padawan! ⭐",
  "Frankly my dear, I don't give a damn about procrastination! 💪",
  "Here's looking at you, completed task! 👀",
  "I'll be back... after I finish this mission! 🤖",
  "Show me the progress! 💰",
  "Keep your friends close, but your deadlines closer! ⏰",
  "With great power comes great responsibility... to finish your tasks! 🕷️",
  "Elementary, my dear Watson... just break it into smaller steps! 🔍",
  "That's one small step for a bunny, one giant leap for productivity! 🌙",
  "E = mc²... Effort equals momentum times completion squared! 🧮",
  "To infinity and beyond... your comfort zone! 🚀",
  "The force is strong with this productive one! ⚡",
  "I see dead... lines approaching, better get moving! 👻",
  "Carpe diem... seize the task! 🌅",
  "What doesn't kill your motivation makes you stronger! 💪",
  "All you need is love... and a good task management system! ❤️",
  "The pen is mightier than the sword... but the completed task is mightier than both! ✍️",
  "Rome wasn't built in a day, but they were laying bricks every hour! 🧱",
  "When life gives you lemons, make lemonade... then get back to work! 🍋",
  "A picture is worth a thousand words, but a completed task is worth a thousand feelings! 📸",
  "It's not the size of the bunny in the fight, it's the size of the fight in the bunny! 🥊",
  "The early bunny catches the carrot! 🌅",
  "Don't count your chickens before they hatch... but do count your completed tasks! 🐣",
  "Practice makes perfect... and perfect practice makes you unstoppable! 🎯",
  "The grass is always greener on the other side... but focus on watering your own garden first! 🌱"
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
