
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import CarrotCounter from "@/components/CarrotCounter";
import SignInDropdown from "@/components/auth/SignInDropdown";

interface HeaderBarProps {
  carrotCount: number;
  isAuthenticated: boolean;
  user?: { username: string };
  onSignOut: () => void;
  onSignIn: (email: string, username: string, remember: boolean) => void;
  onSocialSignIn: (provider: "google" | "github") => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  carrotCount,
  isAuthenticated,
  user,
  onSignOut,
  onSignIn,
  onSocialSignIn,
}) => (
  <div className="absolute top-0 right-0 flex items-center gap-4">
    <CarrotCounter count={carrotCount} />
    {isAuthenticated ? (
      <div className="flex items-center gap-2">
        <span className="text-pink-200 text-sm">
          Hi, {user?.username}! 💕
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSignOut}
          className="text-pink-200 hover:bg-pink-500/20"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    ) : (
      <SignInDropdown
        onSignIn={onSignIn}
        onSocialSignIn={onSocialSignIn}
      />
    )}
  </div>
);

export default HeaderBar;
