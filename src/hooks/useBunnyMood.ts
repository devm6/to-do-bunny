
import { useState, useEffect } from 'react';
import { BunnyMood } from '../types/task';

export const useBunnyMood = () => {
  const [bunnyMood, setBunnyMood] = useState<BunnyMood>('neutral');

  useEffect(() => {
    if (bunnyMood !== 'neutral') {
      const timeout = setTimeout(() => {
        setBunnyMood('neutral');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [bunnyMood]);

  return { bunnyMood, setBunnyMood };
};
