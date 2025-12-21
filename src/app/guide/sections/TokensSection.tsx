'use client';

import { toast } from 'sonner';
import ColorChip from '@/components/guide/ColorChip';
import { Text } from '@/components/ui/Text';

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
    label: 'Text.S11',
    className: 'text-[11px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S11></Text.S11>',
  },
  {
    label: 'Text.S11.Bold',
    className: 'text-[11px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S11.Bold></Text.S11.Bold>',
  },
  {
    label: 'Text.S12',
    className: 'text-[12px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S12></Text.S12>',
  },
  {
    label: 'Text.S12.Bold',
    className: 'text-[12px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S12.Bold></Text.S12.Bold>',
  },
  {
    label: 'Text.S13',
    className: 'text-[13px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S13></Text.S13>',
  },
  {
    label: 'Text.S13.Bold',
    className: 'text-[13px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S13.Bold></Text.S13.Bold>',
  },
  {
    label: 'Text.S14',
    className: 'text-[14px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S14></Text.S14>',
  },
  {
    label: 'Text.S14.Bold',
    className: 'text-[14px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S14.Bold></Text.S14.Bold>',
  },
  {
    label: 'Text.S16',
    className: 'text-[16px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S16></Text.S16>',
  },
  {
    label: 'Text.S16.Bold',
    className: 'text-[16px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S16.Bold></Text.S16.Bold>',
  },
  {
    label: 'Text.S20',
    className: 'text-[20px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S20></Text.S20>',
  },
  {
    label: 'Text.S20.Bold',
    className: 'text-[20px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S20.Bold></Text.S20.Bold>',
  },
  {
    label: 'Text.S24',
    className: 'text-[24px] leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S24></Text.S24>',
  },
  {
    label: 'Text.S24.Bold',
    className: 'text-[24px] font-bold leading-normal',
    sample: '내용입니다.',
    snippet: '<Text.S24.Bold></Text.S24.Bold>',
  },
];

const bodyScale: TypeToken[] = [
  {
    label: 'Text.Body14',
    className: 'text-[14px] leading-[180%]',
    sample: '내용입니다.',
    snippet: '<Text.Body14></Text.Body14>',
  },
  {
    label: 'Text.Body16',
    className: 'text-[16px] leading-[180%]',
    sample: '내용입니다.',
    snippet: '<Text.Body16></Text.Body16>',
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
        <Text.H3 className="text-primary">Design Tokens</Text.H3>
        <Text.Caption>
          새 팔레트/타이포 토큰. 컬러칩은 클릭 시 text/bg 클래스 복사, 타이포 카드는{' '}
          <span className="font-mono">&lt;Text.*&gt;</span> 예시 복사
        </Text.Caption>
      </div>

      <section className="space-y-4">
        <div className="space-y-1">
          <Text.H5>Colors</Text.H5>
          <Text.Caption className="block">
            다크모드에서는 semantic 토큰(background/foreground/muted/border/primary) 값이 자동 전환
          </Text.Caption>
        </div>

        <div className="space-y-8">
          {Object.entries(palette).map(([group, tokens]) => (
            <div key={group} className="space-y-2">
              <Text.S14.Bold className="text-foreground capitalize" as="span">
                {group}
              </Text.S14.Bold>
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
          <Text.H5>Typography</Text.H5>
          <Text.Caption className="block">
            토큰 이름(예: 14_M)은 스펙 기준 라벨이고, 클릭하면 해당{' '}
            <span className="font-mono">&lt;Text.*&gt;</span> 사용 예시가 복사됩니다.
          </Text.Caption>
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
                  <Text.Caption className="text-muted-foreground group-hover:text-primary mt-2">
                    {t.label}
                  </Text.Caption>
                </div>
                <span className="bg-primary-100 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  copy
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <Text.H6 className="mb-2">Body presets</Text.H6>
          <div className="grid gap-3 sm:grid-cols-2">
            {bodyScale.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => copy(t.snippet, t.label)}
                className="border-border/70 bg-depth-1/60 hover:bg-depth-2 group rounded-lg border p-4 text-left transition"
              >
                <div className={t.className}>{t.sample}</div>
                <Text.Caption className="text-muted-foreground group-hover:text-primary mt-2">
                  {t.label}
                </Text.Caption>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
