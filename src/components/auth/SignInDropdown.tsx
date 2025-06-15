
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, KeyRound, Github, UserCheck } from "lucide-react";

interface SignInDropdownProps {
  onSignIn: (email: string, username: string, remember: boolean) => void;
  onSocialSignIn?: (provider: "google" | "github") => void;
}

const SignInDropdown: React.FC<SignInDropdownProps> = ({
  onSignIn,
  onSocialSignIn,
}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username) return;
    onSignIn(email, username, rememberMe);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-pink-200 hover:bg-pink-500/20"
        onClick={() => setOpen(true)}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Welcome! Choose Sign-in Option
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in for a personalized experience and memory retention, or proceed as guest.
              </p>
            </div>
            {!showDetails ? (
              <div className="flex flex-col gap-3">
                <Button
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={() => setShowDetails(true)}
                >
                  <Mail className="h-4 w-4" />
                  Sign in with Email
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white gap-2"
                  onClick={() => onSocialSignIn?.("google")}
                >
                  <UserCheck className="h-4 w-4" />
                  Sign in with Google
                </Button>
                <Button
                  className="w-full bg-black text-white gap-2"
                  onClick={() => onSocialSignIn?.("github")}
                >
                  <Github className="h-4 w-4" />
                  Sign in with GitHub
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="flex flex-col gap-3">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="accent-pink-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="remember-me">
                    Retain Memory (Keep me signed in)
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                  <KeyRound className="h-4 w-4 mr-2" />
                  Sign in
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowDetails(false)}
                >
                  ← Back to Options
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInDropdown;
