'use client';

import { useMemo, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/ToggleGroup';
import { Badge } from '@/shared/ui/Badge';

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'square'; size: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'rect':
      return shape.width * shape.height;
    case 'square':
      return shape.size * shape.size;
    default:
      return 0;
  }
}

export function TypeNarrowingDemo() {
  const [kind, setKind] = useState<Shape['kind']>('circle');
  const areaVal = useMemo(() => {
    if (kind === 'circle') return area({ kind, radius: 2 });
    if (kind === 'rect') return area({ kind, width: 3, height: 4 });
    return area({ kind, size: 3 });
  }, [kind]);

  return (
    <div className="space-y-3">
      <ToggleGroup
        type="single"
        value={kind}
        onValueChange={(v) => v && setKind(v as Shape['kind'])}
      >
        <ToggleGroupItem value="circle">Circle</ToggleGroupItem>
        <ToggleGroupItem value="rect">Rect</ToggleGroupItem>
        <ToggleGroupItem value="square">Square</ToggleGroupItem>
      </ToggleGroup>
      <span className="text-xs tracking-[0.01em] block">
        Area: <Badge variant="outline">{areaVal.toFixed(2)}</Badge>
      </span>
    </div>
  );
}
