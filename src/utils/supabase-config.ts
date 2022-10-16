import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://owghnppcngfslyfblvvg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93Z2hucHBjbmdmc2x5ZmJsdnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU5MjgwOTUsImV4cCI6MTk4MTUwNDA5NX0.clFS7Qwi6p1AmR0euuBloByU1rIOIm4lmINomJUIceE"
);
export default supabase;
