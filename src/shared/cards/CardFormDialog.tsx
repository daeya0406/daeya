'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Button } from '@/shared/ui/Button';

type CardFormDialogProps = {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: { title: string; description?: string | null };
  onSubmit: (values: { title: string; description: string }) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function CardFormDialog({
  mode,
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  isSubmitting,
}: CardFormDialogProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(defaultValues?.title ?? '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDescription(defaultValues?.description ?? '');
    }
  }, [open, defaultValues?.title, defaultValues?.description]);

  const handleSubmit = () => {
    onSubmit({ title: title.trim(), description: description.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="mb-4">{mode === 'create' ? '카드 추가' : '카드 수정'}</DialogTitle>

        <div className="mt-4 space-y-3">
          <div className="space-y-1">
            <span className="text-xs tracking-[0.01em] block text-muted-foreground">제목</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="카드 제목"
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs tracking-[0.01em] block text-muted-foreground">설명</span>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="간단한 설명"
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleSubmit} isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? '' : mode === 'create' ? '추가' : '저장'}
            </Button>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
