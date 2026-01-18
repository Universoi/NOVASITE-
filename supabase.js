import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Substitua com a URL e a chave anônima do seu projeto Supabase
const supabaseUrl = 'https://zkhradhpwakvtgsilsyj.supabase.co';
const supabaseKey = 'sb_publishable_UrUxPsPD3XBTANwwp3tZOA_-REppnf3';

export const supabase = createClient(supabaseUrl, supabaseKey);
