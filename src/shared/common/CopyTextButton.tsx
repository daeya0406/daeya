'use client';
import * as React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function CopyTextButton({
  text,
  className,
  children,
  toastMessage,
}: {
  text: string;
  className?: string;
  children: React.ReactNode;
  toastMessage?: string;
}) {
  return (
    <button
      type="button"
      className={cn(className)}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success(toastMessage ?? '복사 완료', { duration: 1200 });
        } catch {
          toast.error('복사 실패', { duration: 1200 });
        }
      }}
    >
      {children}
    </button>
  );
}
