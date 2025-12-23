'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBlockProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

const prismTheme = {
  ...duotoneLight,
  keyword: { color: '#b560ff', fontWeight: '600' },
  number: { color: '#F97316' },
  operator: { color: '#b560ff' },
  builtin: { color: '#A855F7' },
  function: { color: '#5e7aff' },
  tag: { color: '#ff7823' },
  punctuation: { color: '#cb9f00' },
};

export function CodeBlock({ code, language = 'tsx', showLineNumbers = true }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={prismTheme}
      className="border"
      wrapLongLines={false}
      showLineNumbers={showLineNumbers}
      customStyle={{
        borderRadius: 12,
        padding: '16px',
        margin: 0,
        color: 'rgb(var(--foreground))',
        background: 'rgb(var(--bg-depth-1))',
        fontSize: '12px',
        lineHeight: 1.6,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
      codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco' } }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
