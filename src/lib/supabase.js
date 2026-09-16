import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment or fallback to live production configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://usjjgxntzvpbkodrrfva.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzampneG50enZwYmtvZHJyZnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MzQxNjAsImV4cCI6MjEwNTExMDE2MH0.Zoo3wk1FILVxpCmzz0hW-gPnnBU0tgPTNiQP8ACR9m4';

export const isSupabaseConfigured = () => {
  return true;
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
