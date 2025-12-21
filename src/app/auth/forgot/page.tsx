'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotSchema, type ForgotFormValues } from '@/lib/validators/auth';
import { useZodForm } from '@/hooks/useZodForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { supabase } from '@/lib/supabase';

export default function ForgotPage() {
  const router = useRouter();

  const form = useZodForm({
    schema: forgotSchema,
    defaultValues: { email: '' },
  });

  const mutation = useMutation({
    mutationFn: async (values: ForgotFormValues) => {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth/reset`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('비밀번호 재설정 메일을 보냈어요. 이메일을 확인하세요.');
      router.push('/auth/login');
    },
    onError: (error) => toast.error(error.message ?? '메일 발송에 실패했습니다.'),
  });

  const onSubmit = (values: ForgotFormValues) => mutation.mutate(values);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-border bg-depth-1/80 p-6 shadow-md backdrop-blur">
        <Text.H3 className="font-bold text-center mb-8">비밀번호 찾기</Text.H3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full" isLoading={mutation.isPending} disabled={!form.formState.isValid}>
              재설정 링크 보내기
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground mt-5 flex items-center justify-between text-xs">
          <Link href="/auth/login" className="text-primary hover:underline">
            로그인 페이지
          </Link>
          <Link href="/auth/signup" className="text-primary hover:underline">
            회원가입
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-2 rounded-lg border border-dashed border-border bg-depth-2 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">설명 & 가이드</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Supabase의 `resetPasswordForEmail` 사용, redirect는 `/auth/reset`으로 설정.</li>
          <li>메일 전송 후 로그인 페이지로 안내합니다.</li>
          <li>환경 변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 필요.</li>
        </ul>
      </div>
    </section>
  );
}
