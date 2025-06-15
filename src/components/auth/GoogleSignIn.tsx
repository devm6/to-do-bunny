
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface GoogleSignInProps {
  onSignIn: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignIn }) => {
  return (
    <div className="space-y-4">
      <Button 
        onClick={onSignIn}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
      >
        <Mail className="w-4 h-4 mr-2" />
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleSignIn;
