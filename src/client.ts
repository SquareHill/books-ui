import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://bniomcbvqfapsycicylj.supabase.co';
const supabaseAnonKey =
  import.meta.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaW9tY2J2cWZhcHN5Y2ljeWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjMxMjYsImV4cCI6MjAzMDIzOTEyNn0.6fnDXyqVOZ4SgC3HhmmX7rloPCjIiOckof9h0AJTZh4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
