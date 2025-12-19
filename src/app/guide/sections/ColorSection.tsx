'use client';

import ColorChip from '@/components/guide/ColorChip';
import { Text } from '@/components/ui/Text';

type ColorToken = { name: string; value: string };

const palette: Record<string, ColorToken[]> = {
  brand: [
    { name: 'brand-primary', value: 'rgb(var(--brand-primary))' },
    { name: 'brand-secondary', value: 'rgb(var(--brand-secondary))' },
    { name: 'brand-tertiary', value: 'rgb(var(--brand-tertiary))' },
  ],
  point: [
    { name: 'point-purple', value: 'rgb(var(--point-purple))' },
    { name: 'point-cyan', value: 'rgb(var(--point-cyan))' },
    { name: 'point-pink', value: 'rgb(var(--point-pink))' },
    { name: 'point-rose', value: 'rgb(var(--point-rose))' },
    { name: 'point-orange', value: 'rgb(var(--point-orange))' },
    { name: 'point-yellow', value: 'rgb(var(--point-yellow))' },
  ],
  background: [
    { name: 'bg-depth-1', value: 'rgb(var(--bg-depth-1))' },
    { name: 'bg-depth-2', value: 'rgb(var(--bg-depth-2))' },
    { name: 'bg-depth-3', value: 'rgb(var(--bg-depth-3))' },
    { name: 'bg-depth-inverse', value: 'rgb(var(--bg-depth-inverse))' },
  ],
  interaction: [
    { name: 'interaction-inactive', value: 'rgb(var(--interaction-inactive))' },
    { name: 'interaction-hover', value: 'rgb(var(--interaction-hover))' },
    { name: 'interaction-pressed', value: 'rgb(var(--interaction-pressed))' },
  ],
  border: [{ name: 'border-primary', value: 'rgb(var(--border-primary))' }],
  text: [
    { name: 'text-primary', value: 'rgb(var(--text-primary))' },
    { name: 'text-secondary', value: 'rgb(var(--text-secondary))' },
    { name: 'text-tertiary', value: 'rgb(var(--text-tertiary))' },
    { name: 'text-default', value: 'rgb(var(--text-default))' },
    { name: 'text-inverse', value: 'rgb(var(--text-inverse))' },
    { name: 'text-disabled', value: 'rgb(var(--text-disabled))' },
  ],
  status: [{ name: 'status-danger', value: 'rgb(var(--status-danger))' }],
  icon: [
    { name: 'icon-primary', value: 'rgb(var(--icon-primary))' },
    { name: 'icon-inverse', value: 'rgb(var(--icon-inverse))' },
    { name: 'icon-brand', value: 'rgb(var(--icon-brand))' },
  ],
};

export default function ColorSection() {
  return (
    <div className="space-y-8">
      <div className="line-bottom space-y-1">
        <Text.H3 className="text-primary">Color Tokens</Text.H3>
        <Text.Caption className="text-muted-foreground">
          globals.css 토큰 기반 팔레트. 칩을 클릭하면 text-/bg- 클래스가 복사됩니다.
        </Text.Caption>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(palette).map(([group, tokens]) => (
          <div key={group} className="space-y-2">
            <Text.S14 className="text-foreground capitalize">{group}</Text.S14>
            <div className="flex flex-wrap gap-3">
              {tokens.map((t) => (
                <ColorChip key={t.name} name={t.name} step="default" hex={t.value} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
