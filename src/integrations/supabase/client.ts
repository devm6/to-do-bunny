
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://syundffmjedcoicabhvn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dW5kZmZtamVkY29pY2FiaHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTM2OTAsImV4cCI6MjA2NTU4OTY5MH0.qdhouN7mH0-APa0RXbdFs3GwyZ9Phlqnz0BHvMU8qCg",
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
