
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
  "Pookie mode: ACTIVATED! Let's get things done! 🚀",
  "You're giving main character pookie energy! 💅",
  "Productive pookie hours are in full swing! ⏰",
  "Pookie productivity is unmatched! Keep slaying! 👑",
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
  // AI-generated tweaked famous quotes with pookie vibes
  "Be the pookie you want to see in your burrow! 🏠💕",
  "The journey of a thousand pookie hops begins with a single bounce! 🦘",
  "To be or not to be productive, that is the pookie question... Choose to be! 🎭",
  "I have a dream... that all pookie tasks will be completed on time! ✨",
  "Ask not what your to-do list can do for you, ask what you can do for your pookie to-do list! 📝",
  "Life is like a box of carrots, you never know which one will motivate your pookie heart most! 🥕",
  "Float like a butterfly, sting like a bee... work like a pookie bunny! 🐝",
  "The only thing we have to fear is unfinished pookie tasks themselves! 😤",
  "Yesterday is history, tomorrow is a mystery, today is a gift... that's why they call it the present pookie task! 🎁",
  "Houston, we have a solution... and it's pookie productivity! 🚀",
  "May the pookie force be with you, young padawan! ⭐",
  "Frankly my dear, I don't give a damn about procrastination when I'm this pookie! 💪",
  "Here's looking at you, completed pookie task! 👀",
  "I'll be back... after I finish this pookie mission! 🤖",
  "Show me the pookie progress! 💰",
  "Keep your friends close, but your pookie deadlines closer! ⏰",
  "With great pookie power comes great responsibility... to finish your tasks! 🕷️",
  "Elementary, my dear Watson... just break it into smaller pookie steps! 🔍",
  "That's one small step for a pookie bunny, one giant leap for productivity! 🌙",
  "E = mc²... Effort equals momentum times pookie completion squared! 🧮",
  "To infinity and beyond... your pookie comfort zone! 🚀",
  "The pookie force is strong with this productive one! ⚡",
  "I see dead... lines approaching, better get your pookie moving! 👻",
  "Carpe diem... seize the pookie task! 🌅",
  "What doesn't kill your pookie motivation makes you stronger! 💪",
  "All you need is love... and a good pookie task management system! ❤️",
  "The pen is mightier than the sword... but the completed pookie task is mightier than both! ✍️",
  "Rome wasn't built in a day, but they were laying pookie bricks every hour! 🧱",
  "When life gives you lemons, make lemonade... then get back to your pookie work! 🍋",
  "A picture is worth a thousand words, but a completed pookie task is worth a thousand feelings! 📸",
  "It's not the size of the bunny in the fight, it's the size of the pookie fight in the bunny! 🥊",
  "The early pookie bunny catches the carrot! 🌅",
  "Don't count your chickens before they hatch... but do count your completed pookie tasks! 🐣",
  "Practice makes perfect... and perfect pookie practice makes you unstoppable! 🎯",
  "The grass is always greener on the other side... but focus on watering your own pookie garden first! 🌱"
];

const Motivation = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleBunnyClick = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900/10 via-background to-purple-900/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button with pookie styling */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-pink-300/50 text-pink-200 hover:bg-pink-500/20 hover:text-pink-100 transition-all duration-300"
            style={{
              boxShadow: '0 0 15px rgba(255, 105, 180, 0.3)'
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pookie Tasks 💕
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-200 mb-8" style={{
            background: 'linear-gradient(45deg, #ff69b4, #ff1493, #da70d6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(255, 192, 203, 0.5)'
          }}>
            Pookie Motivation Corner 💕✨
          </h1>

          {/* Clickable Bunny with bow and enhanced pookie styling */}
          <div className="mb-8 flex justify-center">
            <div 
              className="bg-gradient-to-br from-pink-900/30 via-black to-purple-900/30 border border-pink-300/40 rounded-2xl p-8 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleBunnyClick}
              style={{
                boxShadow: '0 0 30px rgba(255, 105, 180, 0.4)'
              }}
            >
              {/* Enhanced sparkly stars background */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-2 left-4 w-1 h-1 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-8 right-6 w-0.5 h-0.5 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-pink-200 rounded-full starfield-twinkle animate-ping" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute bottom-3 right-4 w-1 h-1 bg-purple-200 rounded-full starfield-twinkle animate-pulse" style={{ animationDelay: '1.8s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-pink-300 rounded-full starfield-twinkle animate-ping" style={{ animationDelay: '2.5s' }}></div>
                <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full starfield-twinkle animate-pulse" style={{ animationDelay: '3s' }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="relative inline-block">
                  <div 
                    className="text-8xl transition-all duration-300 transform bunny-float hover:scale-110"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 192, 203, 0.8))'
                    }}
                  >
                    🐰
                  </div>
                  {/* Pink bow on bunny's head with synchronized animation */}
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl bunny-float"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 1))'
                    }}
                  >
                    🎀
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Motivational Quote with more pookie vibes */}
          <div className="bg-gradient-to-br from-pink-900/20 via-card to-purple-900/20 border border-pink-300/30 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto" style={{
            boxShadow: '0 0 25px rgba(255, 105, 180, 0.2)'
          }}>
            <p className="text-xl text-pink-100 font-medium animate-fade-in" style={{
              textShadow: '0 0 10px rgba(255, 192, 203, 0.5)'
            }}>
              {motivationalQuotes[currentQuoteIndex]}
            </p>
            <p className="text-sm text-pink-200/70 mt-4" style={{
              textShadow: '0 0 8px rgba(255, 192, 203, 0.3)'
            }}>
              Click the pookie bunny for more motivation! 🎀💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motivation;
