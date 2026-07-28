'use client';

import { toast } from 'sonner';
import { Button } from '@/shared/ui/Button';

export function ToastDemo() {
  return (
    <div className="space-y-3">
      <div className="section-component flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => toast.success('저장되었습니다', { duration: 1800, dismissible: true })}
          aria-label="성공 토스트"
        >
          성공 토스트
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.error('에러가 발생했습니다', { duration: 2200 })}
          aria-label="에러 토스트"
        >
          에러 토스트
        </Button>
      </div>
    </div>
  );
}
