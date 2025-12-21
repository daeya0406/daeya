'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/useZodForm';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/lib/validators/auth';
import { supabase } from '@/lib/supabase';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

type TokenState = 'pending' | 'ready' | 'invalid';

const parseHashParams = (hash: string) => {
  const query = new URLSearchParams(hash.replace(/^#/, ''));
  return {
    access_token: query.get('access_token'),
    refresh_token: query.get('refresh_token'),
    type: query.get('type'),
  };
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [tokenState, setTokenState] = useState<TokenState>('pending');

  const form = useZodForm({
    schema: resetPasswordSchema,
    defaultValues: { password: '', confirmPassword: '' },
  });

  const hashParams = useMemo(
    () => (typeof window === 'undefined' ? { access_token: null, refresh_token: null, type: null } : parseHashParams(window.location.hash)),
    []
  );

  useEffect(() => {
    const bootstrapSession = async () => {
      if (hashParams.access_token && hashParams.refresh_token && hashParams.type === 'recovery') {
        const { error } = await supabase.auth.setSession({
          access_token: hashParams.access_token,
          refresh_token: hashParams.refresh_token,
        });
        if (error) {
          setTokenState('invalid');
          toast.error(error.message);
          return;
        }
        setTokenState('ready');
      } else {
        setTokenState('invalid');
      }
    };

    bootstrapSession();
  }, [hashParams]);

  const mutation = useMutation({
    mutationFn: async (values: ResetPasswordFormValues) => {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다. 다시 로그인하세요.');
      router.push('/auth/login');
    },
    onError: (error) => toast.error(error.message ?? '비밀번호 변경에 실패했습니다.'),
  });

  const onSubmit = (values: ResetPasswordFormValues) => mutation.mutate(values);

  const disabled = tokenState !== 'ready';

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-border bg-bg-depth-1/80 p-6 shadow-md backdrop-blur">
        <Text.H3 className="font-bold text-center mb-8">비밀번호 재설정</Text.H3>

        {tokenState === 'invalid' && (
          <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs text-green-400 dark:border-green-900/60 dark:bg-green-400/10 dark:text-green-500">
            토큰이 유효하지 않아요. 이메일의 재설정 링크를 다시 확인하거나 새로 요청해주세요.
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="새 비밀번호" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>새 비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="다시 입력" autoComplete="new-password" {...field} />
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
              disabled={!form.formState.isValid || disabled}
            >
              비밀번호 변경
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-6 space-y-2 rounded-lg border border-dashed border-border bg-bg-depth-2 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">설명 & 가이드</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>이 페이지는 Supabase 재설정 링크의 `access_token`과 `refresh_token`을 사용해 세션을 설정합니다.</li>
          <li>해시 토큰이 없으면 비밀번호를 변경할 수 없어요. 이메일에서 링크를 다시 열어주세요.</li>
          <li>성공 시 로그인 페이지로 이동합니다.</li>
        </ul>
      </div>
    </section>
  );
}
