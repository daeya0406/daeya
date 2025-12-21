'use client';

import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Text } from '@/components/ui/Text';

type Scale = {
  label: string;
  size: string;
  snippet: string;
  render: ReactNode;
};

const headingTokens: Scale[] = [
  { label: 'Text.H1', size: '32px / 38px', render: <Text.H1>Pretendard</Text.H1>, snippet: '<Text.H1>Pretendard</Text.H1>' },
  { label: 'Text.H2', size: '24px / 28px', render: <Text.H2>Pretendard</Text.H2>, snippet: '<Text.H2>Pretendard</Text.H2>' },
  { label: 'Text.H3', size: '20px / 24px', render: <Text.H3>Pretendard</Text.H3>, snippet: '<Text.H3>Pretendard</Text.H3>' },
  { label: 'Text.H4', size: '18px / 21px', render: <Text.H4>Pretendard</Text.H4>, snippet: '<Text.H4>Pretendard</Text.H4>' },
  { label: 'Text.H5', size: '16px / 19px', render: <Text.H5>Pretendard</Text.H5>, snippet: '<Text.H5>Pretendard</Text.H5>' },
  { label: 'Text.H6', size: '14px / 17px', render: <Text.H6>Pretendard</Text.H6>, snippet: '<Text.H6>Pretendard</Text.H6>' },
];

const tokens: Scale[] = [
  { label: 'Text.H1', size: '32px / 38px', render: <Text.H1>Pretendard</Text.H1>, snippet: '<Text.H1>Pretendard</Text.H1>' },
  { label: 'Text.H2', size: '24px / 28px', render: <Text.H2>Pretendard</Text.H2>, snippet: '<Text.H2>Pretendard</Text.H2>' },
  { label: 'Text.H3', size: '20px / 24px', render: <Text.H3>Pretendard</Text.H3>, snippet: '<Text.H3>Pretendard</Text.H3>' },
  { label: 'Text.H4', size: '18px / 21px', render: <Text.H4>Pretendard</Text.H4>, snippet: '<Text.H4>Pretendard</Text.H4>' },
  { label: 'Text.H5', size: '16px / 19px', render: <Text.H5>Pretendard</Text.H5>, snippet: '<Text.H5>Pretendard</Text.H5>' },
  { label: 'Text.H6', size: '14px / 17px', render: <Text.H6>Pretendard</Text.H6>, snippet: '<Text.H6>Pretendard</Text.H6>' },

  { label: 'Text.S24.Bold', size: '24px / 28px', render: <Text.S24.Bold>Pretendard</Text.S24.Bold>, snippet: '<Text.S24.Bold>Pretendard</Text.S24.Bold>' },
  { label: 'Text.S24', size: '24px / 28px', render: <Text.S24>Pretendard</Text.S24>, snippet: '<Text.S24>Pretendard</Text.S24>' },
  { label: 'Text.S20.Bold', size: '20px / 24px', render: <Text.S20.Bold>Pretendard</Text.S20.Bold>, snippet: '<Text.S20.Bold>Pretendard</Text.S20.Bold>' },
  { label: 'Text.S20', size: '20px / 24px', render: <Text.S20>Pretendard</Text.S20>, snippet: '<Text.S20>Pretendard</Text.S20>' },
  { label: 'Text.S16.Bold', size: '16px / 19px', render: <Text.S16.Bold>Pretendard</Text.S16.Bold>, snippet: '<Text.S16.Bold>Pretendard</Text.S16.Bold>' },
  { label: 'Text.S16', size: '16px / 19px', render: <Text.S16>Pretendard</Text.S16>, snippet: '<Text.S16>Pretendard</Text.S16>' },
  { label: 'Text.S14.Bold', size: '14px / 17px', render: <Text.S14.Bold>Pretendard</Text.S14.Bold>, snippet: '<Text.S14.Bold>Pretendard</Text.S14.Bold>' },
  { label: 'Text.S14', size: '14px / 17px', render: <Text.S14>Pretendard</Text.S14>, snippet: '<Text.S14>Pretendard</Text.S14>' },
  { label: 'Text.S13.Bold', size: '13px / 16px', render: <Text.S13.Bold>Pretendard</Text.S13.Bold>, snippet: '<Text.S13.Bold>Pretendard</Text.S13.Bold>' },
  { label: 'Text.S13', size: '13px / 16px', render: <Text.S13>Pretendard</Text.S13>, snippet: '<Text.S13>Pretendard</Text.S13>' },
  { label: 'Text.S12.Bold', size: '12px / 14px', render: <Text.S12.Bold>Pretendard</Text.S12.Bold>, snippet: '<Text.S12.Bold>Pretendard</Text.S12.Bold>' },
  { label: 'Text.S12', size: '12px / 14px', render: <Text.S12>Pretendard</Text.S12>, snippet: '<Text.S12>Pretendard</Text.S12>' },
  { label: 'Text.S11.Bold', size: '11px / 14px', render: <Text.S11.Bold>Pretendard</Text.S11.Bold>, snippet: '<Text.S11.Bold>Pretendard</Text.S11.Bold>' },
  { label: 'Text.S11', size: '11px / 14px', render: <Text.S11>Pretendard</Text.S11>, snippet: '<Text.S11>Pretendard</Text.S11>' },

  { label: 'Text.Body16', size: '16px / auto', render: <Text.Body16>Pretendard</Text.Body16>, snippet: '<Text.Body16>Pretendard</Text.Body16>' },
  { label: 'Text.Body14', size: '14px / auto', render: <Text.Body14>Pretendard</Text.Body14>, snippet: '<Text.Body14>Pretendard</Text.Body14>' },
  { label: 'Text.Caption', size: '12px / 14px', render: <Text.Caption>Pretendard</Text.Caption>, snippet: '<Text.Caption>Pretendard</Text.Caption>' },
  { label: 'Text.Overline', size: '12px / 14px', render: <Text.Overline>Pretendard</Text.Overline>, snippet: '<Text.Overline>Pretendard</Text.Overline>' },
];

export default function FontSection() {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${label}`, { duration: 1200 });
  };

  return (
    <div className="space-y-6">
      <div className="line-bottom space-y-1">
        <Text.H3 className="text-primary">Font Tokens</Text.H3>
        <Text.Caption className="text-muted-foreground">
          Pretendard 스케일(토큰 기준). 카드 클릭 시 컴포넌트 스니펫이 복사됩니다.
        </Text.Caption>
      </div>

      <div className="space-y-4">
        <Text.S14.Bold as="p" className="text-foreground">
          Headings
        </Text.S14.Bold>
        <div className="grid gap-3 sm:grid-cols-2">
          {headingTokens.map((t) => (
            <button
              key={t.label}
              onClick={() => copy(t.snippet, t.label)}
              className="border-border group flex flex-col items-start rounded-lg border bg-bg-depth-1 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-foreground">{t.render}</div>
              <div className="text-muted-foreground group-hover:text-primary text-xs">
                {t.label} · {t.size}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Text.S14.Bold as="p" className="text-foreground">
          Scale & Body
        </Text.S14.Bold>
        <div className="grid gap-3 sm:grid-cols-2">
          {tokens
            .filter((t) => !t.label.startsWith('Text.H'))
            .map((t) => (
              <button
                key={t.label}
                onClick={() => copy(t.snippet, t.label)}
                className="border-border group flex flex-col items-start rounded-lg border bg-bg-depth-1 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-foreground">{t.render}</div>
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
