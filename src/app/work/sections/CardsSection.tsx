'use client';

import { useEffect, useState } from 'react';
import { Text } from '@/components/ui/Text';
import CardList from '@/components/cards/CardList';
import type { Card } from '@/types/card';
import { Button } from '@/components/ui/Button';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { Pagination } from '@/components/ui/Pagination';
import { CardFormDialog } from '@/components/cards/CardFormDialog';
import { CardDeleteDialog } from '@/components/cards/CardDeleteDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

export default function CardsSection() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Card | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Card | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const { role } = useSupabaseSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = searchParams.get('card');
  const selectedCard = cards.find((c) => c.id === selectedId) ?? null;

  const fetchCards = async (pageNumber: number) => {
    setLoading(true);
    try {
      const from = (pageNumber - 1) * pageSize;
      const to = from + pageSize - 1;
      const {
        data,
        count,
        error: fetchError,
      } = await supabase
        .from('cards')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setCards(data ?? []);
      setTotal(count ?? 0);
      setPage(pageNumber);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCard = async (values: { title: string; description: string }) => {
    if (!values.title.trim()) {
      toast.error('제목을 입력하세요.');
      return;
    }
    setCreating(true);
    const { error } = await supabase
      .from('cards')
      .insert({ title: values.title, description: values.description || null });
    if (error) {
      toast.error(error.message);
      setCreating(false);
      return;
    }
    toast.success('카드를 추가했습니다.');
    await fetchCards(page);
    setCreating(false);
    setCreateOpen(false);
  };

  const updateCard = async (cardId: string, values: { title: string; description: string }) => {
    if (!values.title.trim()) {
      toast.error('제목을 입력하세요.');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('cards')
      .update({ title: values.title, description: values.description || null })
      .eq('id', cardId);
    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }
    toast.success('카드를 수정했습니다.');
    await fetchCards(page);
    setSaving(false);
    setEditTarget(null);
    if (selectedId === cardId) {
      router.replace(`/work?tab=cards&card=${cardId}`, { scroll: false });
    }
  };

  const deleteCard = async (cardId: string) => {
    setDeletingId(cardId);
    const { error } = await supabase.from('cards').delete().eq('id', cardId);
    if (error) {
      toast.error(error.message);
      setDeletingId(null);
      return;
    }
    toast.success('카드를 삭제했습니다.');
    await fetchCards(page);
    setDeletingId(null);
    setDeleteTarget(null);
    if (selectedId === cardId) {
      router.push('/work?tab=cards', { scroll: false });
    }
  };

  const openCard = (id: string) => {
    router.push(`/work?tab=cards&card=${id}`, { scroll: false });
  };

  const closeCard = () => {
    router.push('/work?tab=cards', { scroll: false });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Text.H3>Cards</Text.H3>
          <Text.Caption className="block text-slate-500 dark:text-slate-300">
            카드 목록과 모달을 Work 탭에서 바로 확인하세요.
          </Text.Caption>
        </div>
        {role === 'admin' && (
          <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
            글쓰기
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        {loading && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/70 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/60"
              >
                <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        )}
        {error && <Text.Caption className="text-red-500">{error}</Text.Caption>}
        {!loading && !error && (
          <>
            <CardList
              cards={cards}
              isAdmin={role === 'admin'}
              onSelect={openCard}
              onEdit={(card) => setEditTarget(card)}
              onDelete={(cardId) => {
                const card = cards.find((c) => c.id === cardId) ?? null;
                setDeleteTarget(card);
              }}
              deletingId={deletingId}
            />
            <div className="mt-4">
              <Pagination page={page} pageSize={pageSize} total={total} onPageChange={fetchCards} />
            </div>
          </>
        )}
      </div>

      <CardFormDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={createCard}
        isSubmitting={creating}
      />

      <Dialog open={Boolean(selectedCard)} onOpenChange={(open) => !open && closeCard()}>
        {selectedCard && (
          <DialogContent>
            <DialogTitle>{selectedCard.title}</DialogTitle>
            <DialogDescription asChild>
              <Text.Body14 as="span" className="text-muted-foreground mt-2 text-sm">
                {selectedCard.description}
              </Text.Body14>
            </DialogDescription>
            {role === 'admin' && (
              <div className="flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={Boolean(deletingId)}
                  onClick={() => setEditTarget(selectedCard)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setDeleteTarget(selectedCard)}
                  isLoading={deletingId === selectedCard.id}
                >
                  {deletingId === selectedCard.id ? null : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>

      <CardFormDialog
        mode="edit"
        open={Boolean(editTarget)}
        onOpenChange={(open) => !open && setEditTarget(null)}
        defaultValues={
          editTarget
            ? { title: editTarget.title, description: editTarget.description ?? '' }
            : undefined
        }
        onSubmit={(values) => {
          if (!editTarget) return;
          return updateCard(editTarget.id, values);
        }}
        isSubmitting={saving}
      />

      <CardDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={deleteTarget?.title}
        onConfirm={() => deleteTarget && deleteCard(deleteTarget.id)}
        isLoading={Boolean(deletingId && deleteTarget && deletingId === deleteTarget.id)}
      />
    </div>
  );
}
