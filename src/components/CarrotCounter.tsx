
import React from 'react';
import { Carrot } from 'lucide-react';

interface CarrotCounterProps {
  count: number;
}

const CarrotCounter: React.FC<CarrotCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
      <Carrot className="h-5 w-5 text-orange-500" />
      <span 
        key={count} 
        className="font-semibold text-foreground carrot-count-animate"
      >
        {count}
      </span>
    </div>
  );
};

export default CarrotCounter;
