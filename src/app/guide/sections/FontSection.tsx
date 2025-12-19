'use client';

import { toast } from 'sonner';
import { Typo } from '@/components/ui/Text';

type Scale = {
  label: string;
  className: string;
  sample: string;
  snippet: string;
};

const headings: Scale[] = [
  {
    label: 'typo-h1',
    className: 'typo-h1',
    sample: 'H1 / 32px Bold',
    snippet: '<Typo.h1>Heading</Typo.h1>',
  },
  {
    label: 'typo-h2',
    className: 'typo-h2',
    sample: 'H2 / 28px SemiBold',
    snippet: '<Typo.h2>Heading</Typo.h2>',
  },
  {
    label: 'typo-h3',
    className: 'typo-h3',
    sample: 'H3 / 24px SemiBold',
    snippet: '<Typo.h3>Heading</Typo.h3>',
  },
  {
    label: 'typo-h4',
    className: 'typo-h4',
    sample: 'H4 / 20px SemiBold',
    snippet: '<Typo.h4>Heading</Typo.h4>',
  },
  {
    label: 'typo-h5',
    className: 'typo-h5',
    sample: 'H5 / 18px SemiBold',
    snippet: '<Typo.h5>Heading</Typo.h5>',
  },
  {
    label: 'typo-h6',
    className: 'typo-h6',
    sample: 'H6 / 16px SemiBold',
    snippet: '<Typo.h6>Heading</Typo.h6>',
  },
];

const bodies: Scale[] = [
  {
    label: 'typo-body-xl',
    className: 'typo-body-xl',
    sample: 'Body XL / 18px',
    snippet: '<Typo.bodyXl>Body</Typo.bodyXl>',
  },
  {
    label: 'typo-body-lg',
    className: 'typo-body-lg',
    sample: 'Body LG / 16px',
    snippet: '<Typo.bodyLg>Body</Typo.bodyLg>',
  },
  {
    label: 'typo-body-md',
    className: 'typo-body-md',
    sample: 'Body MD / 15px',
    snippet: '<Typo.bodyMd>Body</Typo.bodyMd>',
  },
  {
    label: 'typo-body-sm',
    className: 'typo-body-sm',
    sample: 'Body SM / 14px',
    snippet: '<Typo.bodySm>Body</Typo.bodySm>',
  },
  {
    label: 'typo-body-xs',
    className: 'typo-body-xs',
    sample: 'Body XS / 13px',
    snippet: '<Typo.bodyXs>Body</Typo.bodyXs>',
  },
  {
    label: 'typo-body',
    className: 'typo-body',
    sample: 'Body / 15px',
    snippet: '<Typo.body>Body</Typo.body>',
  },
];

const meta: Scale[] = [
  {
    label: 'typo-caption',
    className: 'typo-caption',
    sample: 'Caption / 12px',
    snippet: '<Typo.caption>Caption</Typo.caption>',
  },
  {
    label: 'typo-overline',
    className: 'typo-overline',
    sample: 'OVERLINE / 11px',
    snippet: '<Typo.overline>OVERLINE</Typo.overline>',
  },
];

function ScaleGrid({ title, items }: { title: string; items: Scale[] }) {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${label}`, { duration: 1200 });
  };

  return (
    <div className="space-y-2">
      <Typo.h5 className="text-foreground">{title}</Typo.h5>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ label, className, sample, snippet }) => (
          <button
            key={label}
            onClick={() => copy(snippet, label)}
            className="border-border group flex flex-col items-start rounded-lg border bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800/40"
          >
            <span className={`${className} text-foreground mb-1`}>{sample}</span>
            <span className="text-muted-foreground group-hover:text-primary text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FontSection() {
  return (
    <div className="space-y-6">
      <div className="line-bottom space-y-1">
        <Typo.h3 className="text-primary">Font Tokens</Typo.h3>
        <Typo.caption className="text-muted-foreground">
          globals.css에 정의된 typo-* 클래스. 클릭하면 JSX 스니펫이 복사됩니다.
        </Typo.caption>
      </div>

      <ScaleGrid title="Headings" items={headings} />
      <ScaleGrid title="Body" items={bodies} />
      <ScaleGrid title="Meta" items={meta} />
    </div>
  );
}
