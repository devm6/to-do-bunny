
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkle, Heart, Star } from 'lucide-react';

interface PookieBadgesProps {
  completedTasks: number;
  carrotCount: number;
}

const PookieBadges: React.FC<PookieBadgesProps> = ({ completedTasks, carrotCount }) => {
  const badges = [];

  // Task completion badges
  if (completedTasks >= 1) {
    badges.push({ name: 'First Pookie Step', icon: Heart, color: 'bg-pink-500' });
  }
  if (completedTasks >= 5) {
    badges.push({ name: 'Productivity Princess', icon: Sparkle, color: 'bg-purple-500' });
  }
  if (completedTasks >= 10) {
    badges.push({ name: 'Task Master Pookie', icon: Star, color: 'bg-pink-600' });
  }

  // Carrot collection badges
  if (carrotCount >= 3) {
    badges.push({ name: 'Carrot Collector', icon: Heart, color: 'bg-orange-500' });
  }
  if (carrotCount >= 10) {
    badges.push({ name: 'Bunny\'s Bestie', icon: Sparkle, color: 'bg-pink-700' });
  }

  if (badges.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-pink-900/20 border border-pink-300/30 rounded-2xl p-4 mb-6">
      <h3 className="text-pink-200 font-medium mb-3 text-center">
        ✨ Your Pookie Achievements ✨
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <Badge 
              key={index} 
              className={`${badge.color} text-white flex items-center gap-1 px-3 py-1 hover:scale-105 transition-transform`}
            >
              <IconComponent className="h-3 w-3" />
              <span className="text-xs">{badge.name}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default PookieBadges;
