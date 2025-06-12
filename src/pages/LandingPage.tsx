
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckSquare, Target, Trophy, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Task Management',
      description: 'Organize your tasks with time tracking and completion status'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Progress Tracking',
      description: 'Earn points, track streaks, and level up your productivity'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Productivity Boost',
      description: 'Stay motivated with achievements and progress visualization'
    },
    {
      icon: <CheckSquare className="h-8 w-8" />,
      title: 'Focus Timer',
      description: 'Use built-in timer to stay focused and complete tasks efficiently'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Simple Productivity
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A clean and simple way to manage your tasks, track your progress, 
            and stay productive. No distractions, just pure focus.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate('/dashboard')}
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              Get Started
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
            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
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
        <div className="text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who have transformed their productivity!
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/dashboard')}
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
