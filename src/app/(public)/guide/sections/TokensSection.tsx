'use client';

import { toast } from 'sonner';
import ColorChip from '@/shared/guide/ColorChip';

type ColorToken = { name: string; step: string; value: string };

const palette: Record<string, ColorToken[]> = {
  brand: [
    { name: 'brand-primary', step: 'default', value: '#5189FA' },
    { name: 'brand-secondary', step: 'default', value: '#EEF3FF' },
    { name: 'brand-tertiary', step: 'default', value: '#315296' },
  ],
  point: [
    { name: 'point-purple', step: 'default', value: '#A855F7' },
    { name: 'point-cyan', step: 'default', value: '#06B6D4' },
    { name: 'point-pink', step: 'default', value: '#EC4899' },
    { name: 'point-rose', step: 'default', value: '#F43F5E' },
    { name: 'point-orange', step: 'default', value: '#F97316' },
    { name: 'point-yellow', step: 'default', value: '#EAB308' },
  ],
  background: [
    { name: 'depth-1', step: 'default', value: '#FFFFFF' },
    { name: 'depth-2', step: 'default', value: '#F1F5F9' },
    { name: 'depth-3', step: 'default', value: '#E2E8F0' },
    { name: 'depth-inverse', step: 'default', value: '#FFFFFF' },
  ],
  interaction: [
    { name: 'interaction-inactive', step: 'default', value: '#94A3B8' },
    { name: 'interaction-hover', step: 'default', value: '#416EC8' },
    { name: 'interaction-pressed', step: 'default', value: '#3B63B5' },
  ],
  border: [{ name: 'border-primary', step: 'default', value: '#F8FAFC' }],
  text: [
    { name: 'text-primary', step: 'default', value: '#1E2938' },
    { name: 'text-secondary', step: 'default', value: '#334155' },
    { name: 'text-tertiary', step: 'default', value: '#0F172A' },
    { name: 'text-default', step: 'default', value: '#64748B' },
    { name: 'text-inverse', step: 'default', value: '#FFFFFF' },
    { name: 'text-disabled', step: 'default', value: '#94A3B8' },
  ],
  status: [{ name: 'status-danger', step: 'default', value: '#FC4848' }],
  icon: [
    { name: 'icon-primary', step: 'default', value: '#64748B' },
    { name: 'icon-inverse', step: 'default', value: '#F8FAFC' },
    { name: 'icon-brand', step: 'default', value: '#74A1FB' },
  ],
};

type TypeToken = { label: string; className: string; snippet: string; sample: string };

const typeScale: TypeToken[] = [
  {
    label: 'text-2xs',
    className: 'text-2xs',
    sample: '내용입니다.',
    snippet: '<span className="text-2xs">내용입니다.</span>',
  },
  {
    label: 'text-2xs font-bold',
    className: 'text-2xs font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-2xs font-bold">내용입니다.</span>',
  },
  {
    label: 'text-xs',
    className: 'text-xs',
    sample: '내용입니다.',
    snippet: '<span className="text-xs">내용입니다.</span>',
  },
  {
    label: 'text-xs font-bold',
    className: 'text-xs font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-xs font-bold">내용입니다.</span>',
  },
  {
    label: 'text-sm',
    className: 'text-sm',
    sample: '내용입니다.',
    snippet: '<span className="text-sm">내용입니다.</span>',
  },
  {
    label: 'text-sm font-bold',
    className: 'text-sm font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-sm font-bold">내용입니다.</span>',
  },
  {
    label: 'text-md',
    className: 'text-md',
    sample: '내용입니다.',
    snippet: '<span className="text-md">내용입니다.</span>',
  },
  {
    label: 'text-md font-bold',
    className: 'text-md font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-md font-bold">내용입니다.</span>',
  },
  {
    label: 'text-lg',
    className: 'text-lg',
    sample: '내용입니다.',
    snippet: '<span className="text-lg">내용입니다.</span>',
  },
  {
    label: 'text-lg font-bold',
    className: 'text-lg font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-lg font-bold">내용입니다.</span>',
  },
  {
    label: 'text-xl',
    className: 'text-xl',
    sample: '내용입니다.',
    snippet: '<span className="text-xl">내용입니다.</span>',
  },
  {
    label: 'text-xl font-bold',
    className: 'text-xl font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-xl font-bold">내용입니다.</span>',
  },
  {
    label: 'text-2xl',
    className: 'text-2xl',
    sample: '내용입니다.',
    snippet: '<span className="text-2xl">내용입니다.</span>',
  },
  {
    label: 'text-2xl font-bold',
    className: 'text-2xl font-bold',
    sample: '내용입니다.',
    snippet: '<span className="text-2xl font-bold">내용입니다.</span>',
  },
];

const bodyScale: TypeToken[] = [
  {
    label: 'text-md leading-[180%]',
    className: 'text-md leading-[180%]',
    sample: '내용입니다.',
    snippet: '<p className="text-md leading-[180%]">내용입니다.</p>',
  },
  {
    label: 'text-lg leading-[180%]',
    className: 'text-lg leading-[180%]',
    sample: '내용입니다.',
    snippet: '<p className="text-lg leading-[180%]">내용입니다.</p>',
  },
];

export default function TokensSection() {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${label}`, { duration: 1500 });
  };

  return (
    <div className="space-y-10">
      <div className="line-bottom space-y-2">
        <h3 className="text-xl font-semibold text-primary">Design Tokens</h3>
        <span className="text-xs tracking-[0.01em]">
          새 팔레트/타이포 토큰. 컬러칩은 클릭 시 text/bg 클래스 복사, 타이포 카드는{' '}
          <span className="font-mono">className</span> 예시 복사
        </span>
      </div>

      <section className="space-y-4">
        <div className="space-y-1">
          <h5 className="text-lg font-semibold">Colors</h5>
          <span className="text-xs tracking-[0.01em] block">
            다크모드에서는 semantic 토큰(background/foreground/muted/border/primary) 값이 자동 전환
          </span>
        </div>

        <div className="space-y-8">
          {Object.entries(palette).map(([group, tokens]) => (
            <div key={group} className="space-y-2">
              <span className="text-md leading-[17px] font-bold text-foreground capitalize">
                {group}
              </span>
              <div className="flex flex-wrap gap-3">
                {tokens.map((t) => (
                  <ColorChip
                    key={`${t.name}-${t.step}`}
                    name={t.name}
                    step={t.step}
                    hex={t.value}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h5 className="text-lg font-semibold">Typography</h5>
          <span className="text-xs tracking-[0.01em] block">
            토큰 이름(예: 14_M)은 스펙 기준 라벨이고, 클릭하면 해당{' '}
            <span className="font-mono">className</span> 사용 예시가 복사됩니다.
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {typeScale.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => copy(t.snippet, t.label)}
              className="border-border/70 bg-depth-1/60 hover:bg-depth-2 group rounded-lg border p-4 text-left transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className={t.className}>{t.sample}</div>
                  <span className="text-xs tracking-[0.01em] text-muted-foreground group-hover:text-primary mt-2">
                    {t.label}
                  </span>
                </div>
                <span className="bg-primary-100 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  copy
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <h6 className="text-md font-semibold mb-2">Body presets</h6>
          <div className="grid gap-3 sm:grid-cols-2">
            {bodyScale.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => copy(t.snippet, t.label)}
                className="border-border/70 bg-depth-1/60 hover:bg-depth-2 group rounded-lg border p-4 text-left transition"
              >
                <div className={t.className}>{t.sample}</div>
                <span className="text-xs tracking-[0.01em] text-muted-foreground group-hover:text-primary mt-2">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
