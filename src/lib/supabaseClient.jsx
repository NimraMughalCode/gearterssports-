import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


const supabaseUrl="https://uwvgebfrmlofrvcywmwj.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dmdlYmZybWxvZnJ2Y3l3bXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDY3NzEsImV4cCI6MjA3MDEyMjc3MX0.wsWqTyfy8kXH7cgzliphmHbNNi0tZQWpmbcus_fh-Ag"

export const supabase = createClient(supabaseUrl, supabaseKey);
