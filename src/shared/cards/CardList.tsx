'use client';

import type { Card } from '@/types/card';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icons';

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
          className="border-border bg-depth-1 hover:border-primary/50 group flex flex-col rounded-md border p-4 text-left transition hover:shadow-sm"
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
                  <Icon name="pencil" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onDelete?.(card.id)}
                  isLoading={deletingId === card.id}
                >
                  {deletingId === card.id ? null : <Icon name="trash2" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
