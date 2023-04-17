import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://aprlrxbbzpblszqgsegy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmxyeGJienBibHN6cWdzZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjUxNzUsImV4cCI6MTk5NzA0MTE3NX0.L465Hij8NrxrRe0aUgWz8IsZyd-mNjE-E1xrnggaSmE',
);
