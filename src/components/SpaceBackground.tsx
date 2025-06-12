
import React from 'react';

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating asteroids */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-gray-400 rounded-full animate-[float-slow_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-gray-300 rounded-full animate-[float-slow_12s_ease-in-out_infinite_2s]"></div>
      <div className="absolute top-40 left-1/4 w-1.5 h-1.5 bg-gray-500 rounded-full animate-[float-slow_10s_ease-in-out_infinite_4s]"></div>
      <div className="absolute bottom-32 right-1/3 w-2 h-2 bg-gray-400 rounded-full animate-[float-slow_9s_ease-in-out_infinite_1s]"></div>
      <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-gray-300 rounded-full animate-[float-slow_11s_ease-in-out_infinite_3s]"></div>
      
      {/* Shooting stars */}
      <div className="absolute top-1/4 left-0 w-px h-px bg-white animate-[shooting-star_3s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-0 w-px h-px bg-white animate-[shooting-star_4s_linear_infinite_1.5s]"></div>
      <div className="absolute top-3/4 left-0 w-px h-px bg-white animate-[shooting-star_3.5s_linear_infinite_2.5s]"></div>
      
      {/* Twinkling stars */}
      <div className="absolute top-16 right-32 w-0.5 h-0.5 bg-white rounded-full animate-[twinkle_2s_ease-in-out_infinite]"></div>
      <div className="absolute top-32 left-16 w-0.5 h-0.5 bg-white rounded-full animate-[twinkle_2.5s_ease-in-out_infinite_0.5s]"></div>
      <div className="absolute bottom-16 right-16 w-0.5 h-0.5 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite_1s]"></div>
      <div className="absolute bottom-40 left-32 w-0.5 h-0.5 bg-white rounded-full animate-[twinkle_2.2s_ease-in-out_infinite_1.8s]"></div>
      
      {/* Nebula effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-purple-900/20 via-transparent to-transparent rounded-full animate-[nebula-pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-blue-900/15 via-transparent to-transparent rounded-full animate-[nebula-pulse_8s_ease-in-out_infinite_2s]"></div>
    </div>
  );
};

export default SpaceBackground;
