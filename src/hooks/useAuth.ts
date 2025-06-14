
import { useState, useEffect } from 'react';

interface User {
  email: string;
  username: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pookie-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pookie-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pookie-user');
    }
  }, [user]);

  const signIn = (email: string, username: string) => {
    const userData = { email, username };
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
};
