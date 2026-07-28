'use client';

import ColorChip from '@/shared/guide/ColorChip';
import { GuideSectionIntro } from '../GuideSectionIntro';

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
    { name: 'depth-1', value: 'rgb(var(--bg-depth-1))' },
    { name: 'depth-2', value: 'rgb(var(--bg-depth-2))' },
    { name: 'depth-3', value: 'rgb(var(--bg-depth-3))' },
    { name: 'depth-inverse', value: 'rgb(var(--bg-depth-inverse))' },
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
      <GuideSectionIntro
        title="Color"
        description="globals.css 토큰 기반 팔레트입니다. 칩을 클릭하면 text-/bg- 클래스가 복사됩니다."
      />

      <div className="flex flex-col gap-6">
        {Object.entries(palette).map(([group, tokens]) => (
          <div key={group} className="space-y-2">
            <h3 className="text-foreground text-sm font-semibold capitalize">{group}</h3>
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
