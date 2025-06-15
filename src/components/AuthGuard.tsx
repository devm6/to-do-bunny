
import React from "react";
import { useAuth } from "@/hooks/useAuth";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-ping text-xl text-pink-500">Loading...</span>
      </div>
    );
  }

  if (!user) {
    window.location.replace("/auth");
    return null;
  }
  return <>{children}</>;
};
export default AuthGuard;
