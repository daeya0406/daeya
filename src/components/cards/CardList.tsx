'use client';

import type { Card } from '@/types/card';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  cards: Card[];
  isAdmin?: boolean;
  onSelect: (id: string) => void;
  onEdit?: (card: Card) => void;
  onDelete?: (cardId: string) => void;
  deletingId?: string | null;
}

export default function CardList({
  cards,
  isAdmin = false,
  onSelect,
  onEdit,
  onDelete,
  deletingId,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group flex flex-col rounded-md border border-border bg-bg-depth-1 p-4 text-left transition hover:border-primary/50 hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <button onClick={() => onSelect(card.id)} className="text-left">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-sm opacity-80">{card.description}</p>
            </button>
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={Boolean(deletingId)}
                  onClick={() => onEdit?.(card)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onDelete?.(card.id)}
                  isLoading={deletingId === card.id}
                >
                  {deletingId === card.id ? null : <Trash2 className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
