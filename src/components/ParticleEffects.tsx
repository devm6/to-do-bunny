
import React from 'react';
import { ParticleEffect } from '../types/gamification';

interface ParticleEffectsProps {
  particles: ParticleEffect[];
}

const ParticleEffects: React.FC<ParticleEffectsProps> = ({ particles }) => {
  const getParticleContent = (type: ParticleEffect['type']) => {
    switch (type) {
      case 'completion':
        return '✨';
      case 'points':
        return '+20';
      case 'streak':
        return '🔥';
      default:
        return '⭐';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-[particle-float_2s_ease-out_forwards] text-2xl font-bold"
          style={{
            left: particle.x,
            top: particle.y,
            animation: `particle-float 2s ease-out forwards`
          }}
        >
          {getParticleContent(particle.type)}
        </div>
      ))}
    </div>
  );
};

export default ParticleEffects;
