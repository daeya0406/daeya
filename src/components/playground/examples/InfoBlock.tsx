'use client';

import { Text } from '@/components/ui/Text';

type InfoBlockProps = {
  title?: string;
  description?: string;
  points: string[];
};

export function InfoBlock({ title, description, points }: InfoBlockProps) {
  return (
    <div className="space-y-2">
      {title && <Text.H6 className="text-slate-700 dark:text-slate-200">{title}</Text.H6>}
      {description && (
        <Text.Body14 className="text-slate-600 dark:text-slate-300">{description}</Text.Body14>
      )}
      <ul className="list-disc space-y-1 pl-4 text-slate-700 dark:text-slate-200">
        {points.map((p) => (
          <li key={p}>
            <Text.Body14>{p}</Text.Body14>
          </li>
        ))}
      </ul>
    </div>
  );
}
