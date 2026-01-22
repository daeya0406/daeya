'use client';

import { toast } from 'sonner';

type Scale = {
  label: string;
  size: string;
  snippet: string;
  className: string;
};

const headingTokens: Scale[] = [
  {
    label: 'text-3xl font-bold',
    size: '32px / 38px',
    className: 'text-3xl font-bold',
    snippet: '<span className="text-3xl font-bold">Pretendard</span>',
  },
  {
    label: 'text-2xl font-bold',
    size: '24px / 28px',
    className: 'text-2xl font-bold',
    snippet: '<span className="text-2xl font-bold">Pretendard</span>',
  },
  {
    label: 'text-xl font-semibold',
    size: '20px / 24px',
    className: 'text-xl font-semibold',
    snippet: '<span className="text-xl font-semibold">Pretendard</span>',
  },
  {
    label: 'text-2lg font-bold',
    size: '18px / 21px',
    className: 'text-2lg font-bold',
    snippet: '<span className="text-2lg font-bold">Pretendard</span>',
  },
  {
    label: 'text-lg font-semibold',
    size: '16px / 19px',
    className: 'text-lg font-semibold',
    snippet: '<span className="text-lg font-semibold">Pretendard</span>',
  },
  {
    label: 'text-md font-semibold',
    size: '14px / 17px',
    className: 'text-md font-semibold',
    snippet: '<span className="text-md font-semibold">Pretendard</span>',
  },
];

const tokens: Scale[] = [
  {
    label: 'text-2xl font-bold',
    size: '24px / 28px',
    className: 'text-2xl font-bold',
    snippet: '<span className="text-2xl font-bold">Pretendard</span>',
  },
  {
    label: 'text-2xl',
    size: '24px / 28px',
    className: 'text-2xl',
    snippet: '<span className="text-2xl">Pretendard</span>',
  },
  {
    label: 'text-xl font-bold',
    size: '20px / 24px',
    className: 'text-xl font-bold',
    snippet: '<span className="text-xl font-bold">Pretendard</span>',
  },
  {
    label: 'text-xl',
    size: '20px / 24px',
    className: 'text-xl',
    snippet: '<span className="text-xl">Pretendard</span>',
  },
  {
    label: 'text-lg font-bold',
    size: '16px / 19px',
    className: 'text-lg font-bold',
    snippet: '<span className="text-lg font-bold">Pretendard</span>',
  },
  {
    label: 'text-lg',
    size: '16px / 19px',
    className: 'text-lg',
    snippet: '<span className="text-lg">Pretendard</span>',
  },
  {
    label: 'text-md font-bold',
    size: '14px / 17px',
    className: 'text-md font-bold',
    snippet: '<span className="text-md font-bold">Pretendard</span>',
  },
  {
    label: 'text-md',
    size: '14px / 17px',
    className: 'text-md',
    snippet: '<span className="text-md">Pretendard</span>',
  },
  {
    label: 'text-sm font-bold',
    size: '13px / 16px',
    className: 'text-sm font-bold',
    snippet: '<span className="text-sm font-bold">Pretendard</span>',
  },
  {
    label: 'text-sm',
    size: '13px / 16px',
    className: 'text-sm',
    snippet: '<span className="text-sm">Pretendard</span>',
  },
  {
    label: 'text-xs font-bold',
    size: '12px / 14px',
    className: 'text-xs font-bold',
    snippet: '<span className="text-xs font-bold">Pretendard</span>',
  },
  {
    label: 'text-xs',
    size: '12px / 14px',
    className: 'text-xs',
    snippet: '<span className="text-xs">Pretendard</span>',
  },
  {
    label: 'text-2xs font-bold',
    size: '11px / 14px',
    className: 'text-2xs font-bold',
    snippet: '<span className="text-2xs font-bold">Pretendard</span>',
  },
  {
    label: 'text-2xs',
    size: '11px / 14px',
    className: 'text-2xs',
    snippet: '<span className="text-2xs">Pretendard</span>',
  },

  {
    label: 'text-lg font-normal',
    size: '16px / auto',
    className: 'text-lg font-normal',
    snippet: '<p className="text-lg font-normal">Pretendard</p>',
  },
  {
    label: 'text-md font-normal',
    size: '14px / auto',
    className: 'text-md font-normal',
    snippet: '<p className="text-md font-normal">Pretendard</p>',
  },
  {
    label: 'text-xs tracking-[0.01em]',
    size: '12px / 14px',
    className: 'text-xs tracking-[0.01em]',
    snippet: '<span className="text-xs tracking-[0.01em]">Pretendard</span>',
  },
  {
    label: 'text-xs font-semibold uppercase tracking-[0.08em]',
    size: '12px / 14px',
    className: 'text-xs font-semibold uppercase tracking-[0.08em]',
    snippet: '<span className="text-xs font-semibold uppercase tracking-[0.08em]">Pretendard</span>',
  },
];

export default function FontSection() {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${label}`, { duration: 1200 });
  };

  return (
    <div className="space-y-6">
      <div className="line-bottom space-y-1">
        <h3 className="text-xl font-semibold text-primary">Font Tokens</h3>
        <span className="text-xs tracking-[0.01em] text-muted-foreground">
          Pretendard 스케일(토큰 기준). 카드 클릭 시 컴포넌트 스니펫이 복사됩니다.
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-md leading-[17px] font-bold text-foreground">Headings</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {headingTokens.map((t) => (
            <button
              key={t.label}
              onClick={() => copy(t.snippet, t.label)}
              className="border-border bg-depth-1 group flex flex-col items-start rounded-lg border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-foreground">
                <span className={t.className}>Pretendard</span>
              </div>
              <div className="text-muted-foreground group-hover:text-primary text-xs">
                {t.label} · {t.size}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-md leading-[17px] font-bold text-foreground">Scale & Body</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {tokens.map((t) => (
            <button
              key={t.label}
              onClick={() => copy(t.snippet, t.label)}
              className="border-border bg-depth-1 group flex flex-col items-start rounded-lg border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-foreground">
                <span className={t.className}>Pretendard</span>
              </div>
              <div className="text-muted-foreground group-hover:text-primary text-xs">
                {t.label} · {t.size}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
