'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthState = {
  user: User | null;
  role: string;
  loading: boolean;
};

export function useSupabaseSession() {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: 'user',
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    // 초기 세션 로딩
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session ?? null;
      const user = session?.user ?? null;
      const role = await fetchRole(user?.id);
      if (!mounted) return;
      setState({ user, role, loading: false });
    };

    loadSession();

    // 로그인 반응
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      const role = await fetchRole(user?.id);
      if (!mounted) return;
      setState({ user, role, loading: false });
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return state;
}

async function fetchRole(userId?: string | null) {
  if (!userId) return 'user';
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();
  if (error) return 'user';
  return data?.role ?? 'user';
}
