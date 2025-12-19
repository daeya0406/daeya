import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  const msg =
    'Supabase env가 없습니다. NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 를 설정하세요.';
  console.warn(msg + ' (placeholder 클라이언트로 계속 진행)');
}
export const supabasePublicServer = () =>
  createClient(
    supabaseUrl ?? 'https://placeholder.supabase.co',
    supabaseAnonKey ?? 'public-anon-key-placeholder',
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );
