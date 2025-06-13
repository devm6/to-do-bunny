
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#ff69b4', '#da70d6', '#ff1493', '#ffc0cb', '#dda0dd'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.5
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
