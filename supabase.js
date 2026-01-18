import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Substitua com a URL e a chave anônima do seu projeto Supabase
const supabaseUrl = 'https://qqspmuaukoaetilbaflv.supabase.co';
const supabaseKey = 'sb_publishable_DN831m2SDg4cVvfn8Vc0pA_VZGfs_9u';

export const supabase = createClient(supabaseUrl, supabaseKey);
