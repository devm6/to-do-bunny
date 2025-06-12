
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Target, Trophy, Zap } from 'lucide-react';
import SpaceBackground from '../components/SpaceBackground';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Mission Control',
      description: 'Organize your tasks like space missions with time targets and tracking'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Space Achievements',
      description: 'Earn space credits, unlock achievements, and level up your astronaut rank'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Productivity Boost',
      description: 'Stay motivated with your space bunny companion and streak tracking'
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: 'Focus Timer',
      description: 'Use the mission timer to stay focused and complete tasks efficiently'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SpaceBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🐰🚀</div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Space Productivity
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your productivity into an interstellar adventure! Complete missions, 
            earn space credits, and explore the galaxy with your astronaut bunny companion.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate('/dashboard')}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Launch Mission Control
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/stats')}
            >
              View Progress
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready for Your Space Mission?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of space explorers who have transformed their productivity!
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/dashboard')}
          >
            Start Your Journey 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
