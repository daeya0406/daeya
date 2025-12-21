'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { useZodForm } from '@/hooks/useZodForm';
import { contactSchema, type ContactFormValues } from '@/lib/validators/contact';
import { formatDate, fromNow } from '@/lib/date';

const fakeSubmit = async (values: ContactFormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return values;
};

export function ContactFormDemo() {
  const [lastSubmittedAt, setLastSubmittedAt] = useState<Date | null>(null);
  const form = useZodForm({
    schema: contactSchema,
    defaultValues: { name: '', email: '', message: '' },
  });

  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => fakeSubmit(values),
    onSuccess: (data) => {
      toast.success(`문의가 접수됐어요. ${data.name}님, 곧 연락드릴게요!`);
      setLastSubmittedAt(new Date());
      form.reset();
    },
    onError: () => toast.error('잠시 후 다시 시도해주세요.'),
  });

  const onSubmit = (values: ContactFormValues) => mutation.mutate(values);

  return (
    <div className="rounded-xl border border-border bg-bg-depth-1 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-5">
        <div>
          <p className="text-sm font-semibold text-foreground">Form (RHF + Zod + React Query)</p>
          <p className="text-muted-foreground text-xs">입력값 타입·밸리데이션·비동기 처리 패턴</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Demo
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 rounded-lg border border-border bg-bg-depth-2 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="김정대" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="hello@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>문의 내용</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="무엇을 도와드릴까요?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-start items-center gap-3">
              {form.formState.isValid ? (
                <p className="text-xs text-primary">모든 필드가 유효합니다.</p>
              ) : (
                <p className="text-xs text-muted-foreground">필수 입력을 채워주세요.</p>
              )}
              <Button type="submit" isLoading={mutation.isPending}>
                제출하기
              </Button>
            </div>
          </form>
        </Form>

        <div className="space-y-3 rounded-lg border border-border bg-bg-depth-2 p-4 text-sm shadow-inner">
          <p className="font-medium text-foreground">패턴 메모</p>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <strong className="text-foreground">Zod 스키마 = </strong>
              타입 + 밸리데이션 한 번에
            </li>
            <li>Form 컴파운드로 에러 메시지/aria 연결 자동화</li>
            <li>React Query mutation으로 비동기 상태와 토스트 처리</li>
            <li>
              입력값은{' '}
              <code className="rounded bg-bg-depth-3 px-1 text-xs">
                form.watch()
              </code>{' '}
              or{' '}
              <code className="rounded bg-bg-depth-3 px-1 text-xs">
                form.getValues()
              </code>{' '}
              로 접근
            </li>
          </ul>

          <div className="text-muted-foreground mt-2 space-y-1 text-xs">
            <p>
              마지막 제출:{' '}
              {lastSubmittedAt
                ? `${formatDate(lastSubmittedAt, 'YYYY-MM-DD HH:mm')} (${fromNow(lastSubmittedAt)})`
                : '아직 없음'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
