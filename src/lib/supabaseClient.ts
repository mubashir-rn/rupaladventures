import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qwshniujljdmrbucpuaq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2huaXVqbGpkbXJidWNwdWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzQwNjEsImV4cCI6MjA3MTk1MDA2MX0.SeGBfqendYMlOiilwdmAFw3yc_9-ATbm-j91cUPywwY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


