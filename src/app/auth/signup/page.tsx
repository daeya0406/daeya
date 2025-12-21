'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signUpSchema, type SignUpFormValues } from '@/lib/validators/auth';
import { useZodForm } from '@/hooks/useZodForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading...</div>}
    >
      <SignUpPageContent />
    </Suspense>
  );
}

function SignUpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';

  const form = useZodForm({
    schema: signUpSchema,
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: async (values: SignUpFormValues) => {
      const { confirmPassword, ...payload } = values;
      const { data, error } = await supabase.auth.signUp({
        ...payload,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/reset`,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('가입 완료! 메일을 확인해주세요.');
      router.push(redirectTo);
    },
    onError: (error) => {
      toast.error(error.message ?? '회원가입에 실패했습니다.');
    },
  });

  const onSubmit = (values: SignUpFormValues) => mutation.mutate(values);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-border bg-depth-1/80 p-6 shadow-md backdrop-blur">
        <Text.H3 className="mb-8 text-center font-bold">회원가입</Text.H3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
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
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
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
              가입하기
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground mt-5 flex items-center justify-between text-xs">
          <span>이미 계정이 있나요?</span>
          <Link href="/auth/login" className="text-primary hover:underline">
            로그인 페이지
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-2 rounded-lg border border-dashed border-border bg-depth-2 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">설명 & 가이드</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>비밀번호/확인 필드 일치 여부를 Zod refine으로 체크합니다.</li>
          <li>가입 후 이메일 인증 메일이 발송되며, redirect는 `/auth/reset`으로 설정했습니다.</li>
          <li>
            Supabase Auth 세팅: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 필요.
          </li>
        </ul>
      </div>
    </section>
  );
}
