
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, LogIn, UserPlus, Link as LinkIcon } from "lucide-react";

const Auth: React.FC = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState<"login" | "signup" | "magic">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState<{message: string; type: "success" | "error" | ""}>({ message: "", type: "" });

  // Use Supabase client directly for auth flows
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFeedback({ message: "", type: "" });
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) throw error;
      setFeedback({ message: "Sign up successful! Check your email to confirm your account before logging in.", type: "success" });
    } catch (err: any) {
      setFeedback({ message: err.message || "Sign up failed", type: "error" });
    }
    setFormLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFeedback({ message: "", type: "" });
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setFeedback({ message: "Sign in successful! Redirecting…", type: "success" });
    } catch (err: any) {
      setFeedback({ message: err.message || "Sign in failed", type: "error" });
    }
    setFormLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFeedback({ message: "", type: "" });
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectUrl } });
      if (error) throw error;
      setFeedback({ message: "Magic link sent! Check your email to sign in.", type: "success" });
    } catch (err: any) {
      setFeedback({ message: err.message || "Failed to send magic link", type: "error" });
    }
    setFormLoading(false);
  };

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
        <p className="text-pink-400">
          {view === "signup" && "Create your pookie account ✨"}
          {view === "login" && "Sign in to start your pookie productivity journey ✨"}
          {view === "magic" && "Get a magic sign-in link to your email 🪄"}
        </p>
        <div className="w-full">
          {feedback.message && (
            <div
              className={`mb-4 text-center ${
                feedback.type === "success"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Login Form */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={formLoading}
              />
              <Input
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={formLoading}
              />
              <Button
                type="submit"
                className="w-full bg-pink-400 hover:bg-pink-500 text-white"
                disabled={formLoading}
              >
                {formLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <LogIn className="h-5 w-5 mr-2" />}
                Sign In
              </Button>
            </form>
          )}

          {/* Signup Form */}
          {view === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={formLoading}
              />
              <Input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                minLength={6}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={formLoading}
              />
              <Button
                type="submit"
                className="w-full bg-purple-400 hover:bg-purple-500 text-white"
                disabled={formLoading}
              >
                {formLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <UserPlus className="h-5 w-5 mr-2" />}
                Sign Up
              </Button>
            </form>
          )}

          {/* Magic Link Form */}
          {view === "magic" && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={formLoading}
              />
              <Button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-white"
                disabled={formLoading}
              >
                {formLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <LinkIcon className="h-5 w-5 mr-2" />}
                Send Magic Link
              </Button>
            </form>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 pt-2">
          {view !== "login" && (
            <Button variant="ghost" className="w-full text-pink-500" onClick={() => { setView("login"); setFeedback({ message: "", type: "" }); }}>
              <LogIn className="h-4 w-4 mr-2" />
              Have an account? Sign in
            </Button>
          )}
          {view !== "signup" && (
            <Button variant="ghost" className="w-full text-purple-500" onClick={() => { setView("signup"); setFeedback({ message: "", type: "" }); }}>
              <UserPlus className="h-4 w-4 mr-2" />
              No account? Sign up
            </Button>
          )}
          {view !== "magic" && (
            <Button variant="ghost" className="w-full text-green-600" onClick={() => { setView("magic"); setFeedback({ message: "", type: "" }); }}>
              <Mail className="h-4 w-4 mr-2" />
              Use Magic Link
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

