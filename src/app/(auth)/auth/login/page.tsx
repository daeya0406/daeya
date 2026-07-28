'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authSchema, type AuthFormValues } from '@/lib/validators/auth';
import { useZodForm } from '@/hooks/useZodForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { supabase } from '@/lib/supabase';
import { PROFILE } from '@/content/profile';

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading...</div>}
    >
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';

  const form = useZodForm({
    schema: authSchema,
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: async (values: AuthFormValues) => {
      const { data, error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('로그인 완료!');
      router.push(redirectTo);
    },
    onError: (error) => {
      toast.error(error.message ?? '로그인에 실패했습니다.');
    },
  });

  const onSubmit = (values: AuthFormValues) => mutation.mutate(values);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-border bg-depth-1/80 p-6 shadow-md backdrop-blur">
        <h3 className="text-xl font-semibold mb-8 text-center font-bold">로그인</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={PROFILE.email}
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={mutation.isPending}
              disabled={!form.formState.isValid}
            >
              로그인
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground mt-5 flex items-center justify-end gap-x-4 text-xs">
          <Link href="/auth/signup" className="text-primary hover:underline">
            회원가입
          </Link>
          <Link
            href="/auth/forgot"
            className="text-xs text-primary hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-2 rounded-lg border border-dashed border-border bg-depth-2 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">설명 & 가이드</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>RHF + Zod로 입력값 타입/검증을 한 번에 관리.</li>
          <li>React Query mutation으로 Supabase Auth 호출과 로딩/에러를 처리.</li>
          <li>성공 시 `redirect` 쿼리 파라미터나 `/`로 이동.</li>
          <li>환경변수: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 필요.</li>
        </ul>
      </div>
    </section>
  );
}
