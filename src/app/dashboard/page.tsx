'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@/components/ui/Text';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';

export default function DashboardPage() {
  const router = useRouter();
  const { user, role, loading } = useSupabaseSession();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/auth/login?redirect=/dashboard');
      return;
    }
    if (role !== 'admin') {
      router.replace('/');
    }
  }, [loading, role, router, user]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-3 rounded-2xl border border-border bg-bg-depth-1 p-5 shadow-sm">
          <div className="h-5 w-1/3 animate-pulse rounded bg-bg-depth-3" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-bg-depth-3" />
        </div>
      </section>
    );
  }

  if (!user || role !== 'admin') return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Text.H2 className="mb-2">Dashboard (Protected)</Text.H2>
      <Text.Caption>관리자만 접근 가능합니다.</Text.Caption>

      <div className="mt-6 space-y-3 rounded-2xl border border-border bg-bg-depth-1 p-5 shadow-sm">
        <Text.H4>요약</Text.H4>
        <p className="text-sm text-foreground">
          샘플 보호 페이지입니다. 실제 데이터/위젯을 배치하세요.
        </p>
      </div>
    </section>
  );
}
