import type { PlaygroundItem } from '@/types/playground';
import ResponsiveTableDemo from '../examples/templates/ResponsiveTableDemo';
import ViewToggleDemo from '../examples/templates/ViewToggleDemo';

export const uiItems: PlaygroundItem[] = [
  {
    id: 'ui-basic',
    title: '컴포넌트 구성 형태',
    tags: ['Components'],
    description: '컴포넌트 만들 때 Props, children, 이벤트, 상태 4개 중 필요한 것만 섞으면 끝',
    categories: ['ui'],
    codes: [
      {
        label: '01.basic',
        code: `type Props = {};

export function ComponentName({}: Props) {
  return <div>ComponentName</div>;
}`,
      },
      {
        label: '02,props-basic',
        code: `type Props = {
  label: string;
  count?: number;
  active?: boolean;
};

export function ComponentName({ label, count = 0, active = false }: Props) {
  return (
    <div className={active ? "active" : ""}>
      {label} – {count}
    </div>
  );
}`,
      },
      {
        label: '03.children',
        code: `type Props = {
  children: React.ReactNode;
};

export default function ComponentName({ children }: Props) {
  return <div className="wrapper">{children}</div>;
}`,
      },
      {
        label: '04.event',
        code: `type Props = {
  onClick?: () => void;
  label: string;
};

export function Button({ onClick, label }: Props) {
  return (
    <button onClick={onClick} className="btn">
      {label}
    </button>
  );
}`,
      },
      {
        label: '05.compound',
        code: `export const Component = ({ children }: { children: React.ReactNode }) => {
  return <div className="component">{children}</div>;
};

const Item = ({ children }: { children: React.ReactNode }) => {
  return <div className="component-item">{children}</div>;
};

Component.Item = Item;

export { Component }; // default 없을 때 따로 내보내는 방식도 참고

// 사용
<Component>
  <Component.Item>One</Component.Item>
  <Component.Item>Two</Component.Item>
</Component>`,
      },
      {
        label: '06.polymorphic',
        code: `import { ElementType, ComponentProps } from "react";

type Props<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
} & ComponentProps<T>;

export function PolymorphicBox<T extends ElementType = "span">({
  as,
  children,
  ...rest
}: Props<T>) {
  const Component = as || "span";
  return <Component {...rest}>{children}</Component>;
}`,
      },
      {
        label: '07.stateful',
        code: `"use client";

import { useState } from "react";

type Props = {};

export function ComponentName({}: Props) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Value: {value}</p>
    </div>
  );
}`,
      },
      {
        label: '08.async-fetch',
        code: `"use client";

import { useEffect, useState } from "react";

export default function ComponentName() {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/endpoint");
      const json = await res.json();
      setData(json);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
      },
    ],
  },
  {
    id: 'responsive-table',
    title: 'Table(반응형)',
    tags: ['Table', 'UI', 'Responsive'],
    description: '데스크톱은 테이블, 모바일은 카드형으로 전환',
    categories: ['ui'],
    demo: <ResponsiveTableDemo />,
    code: `// md 이상에서는 Table, md 미만에서는 카드 리스트
  <Table className="hidden md:block">...</Table>
  <div className="md:hidden"> {/* 카드형 리스트 */} </div>`,
  },
  {
    id: 'view-toggle',
    title: 'Table(토글 변환형)',
    tags: ['ToggleGroup', 'UI'],
    description: '토글로 레이아웃 전환 (카드 ↔ 테이블)',
    categories: ['ui'],
    demo: <ViewToggleDemo />,
    code: `<ToggleGroup type="single" value={view} onValueChange={setView}>
    <ToggleGroupItem value="card">카드형</ToggleGroupItem>
    <ToggleGroupItem value="table">테이블형</ToggleGroupItem>
  </ToggleGroup>
  {view === 'card' ? <CardGrid /> : <TableView />}`,
  },
];
