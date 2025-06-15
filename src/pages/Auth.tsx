import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Auth: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-pink-400" />
      </div>
    );
  }

  if (user) {
    // Already signed in
    window.location.replace("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-white to-purple-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6 border border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 text-center">
          Welcome to To Do Bunny 🐰
        </h1>
        <p className="text-pink-400">Sign in to start your pookie productivity journey ✨</p>
        {/* The Google sign-in button has been removed. */}
        {/* You may add another sign-in option here if required. */}
      </div>
    </div>
  );
};

export default Auth;
