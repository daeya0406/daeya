import ComponentSplitDemo from '../examples/react/ComponentSplitDemo';
import CompoundPatternDemo from '../examples/react/CompoundPatternDemo';
import ReactMemoDemo from '../examples/react/ReactMemoDemo';
import { InfoBlock } from '../examples/InfoBlock';
import type { PlaygroundItem } from '@/types/playground';

export const reactItems: PlaygroundItem[] = [
  {
    id: 'component-split',
    title: '컴포넌트 분리',
    tags: ['React', 'Props'],
    description: '컴포넌트 분리 & props 전달 기본 패턴',
    categories: ['react'],
    demo: <ComponentSplitDemo />,
    code: `function ProfileCard({ profile }) {
  return (
    <Card>
      <h4>{profile.name}</h4>
      <p>{profile.role}</p>
      {profile.tags.map((t) => <Badge key={t}>{t}</Badge>)}
    </Card>
  );
}

const profiles = [...];
return profiles.map((p) => <ProfileCard key={p.name} profile={p} />);`,
  },
  {
    id: 'compoundpattern',
    title: '컴파운드 패턴(탭 예시)',
    tags: ['React', 'Compound'],
    description: 'Context 흐름에 맞춰 Card.Root/Badge를 읽는 법 정리',
    categories: ['react'],
    demo: <CompoundPatternDemo />,
    code: `// 핵심 한 문장: CardRoot가 Provider로 variant를 내려주고, CardBadge가 useContext로 꺼낸다

// 1) 공유 통로(Context)
const CardContext = React.createContext(null);

// 2) Provider = 스코프 생성자, children이 Provider 아래로 들어감
function CardRoot({ variant = 'primary', children }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className="card">{children}</div>
    </CardContext.Provider>
  );
}

// 3) Context 그 자체가 아니라 꺼내는 로직 + 가드 헬퍼
function useCard() {
  const ctx = React.useContext(CardContext);
  if (!ctx) throw new Error('Card.* 는 <Card.Root> 안에서만 사용하세요');
  return ctx;
}

// 4) Sub 컴포넌트는 Provider 범위 안에서 값 소비
function CardBadge({ children }) {
  const { variant } = useCard();
  return <span data-variant={variant}>{children}</span>;
}

// 5) Card.Root / Card.Badge 표기는 컴포넌트를 객체로 묶은 네임스페이스
export const Card = { Root: CardRoot, Badge: CardBadge };

// 사용 예시: DOM에 찍히는 건 Root/Badge가 반환하는 요소뿐, Card 자체는 렌더 X
<Card.Root variant="success">
  <Card.Badge>예약완료</Card.Badge>
</Card.Root>;`,
  },
  {
    id: 'memo-usecallback',
    title: 'memo / useCallback 렌더 비교',
    tags: ['React', 'Performance'],
    description: 'props 안정화로 자식 렌더 줄이기',
    categories: ['react'],
    demo: (
      <InfoBlock
        title="memo + useCallback"
        points={[
          '부모 함수 props는 useCallback으로 메모이즈',
          '자식은 React.memo로 props 동일 시 스킵',
          '불필요한 deps 추가는 오히려 비용, 필요한 곳에만 사용',
        ]}
      />
    ),
    code: `const Child = memo(({ onClick }) => ...);
const onClick = useCallback(() => doSomething(), [deps]);
<Child onClick={onClick} />;`,
  },
  {
    id: 'react-memo',
    title: 'React.memo + useMemo',
    tags: ['React', 'Memo'],
    description: '불필요 렌더를 줄이는 기본 예시',
    categories: ['react'],
    demo: <ReactMemoDemo />,
    code: `const Child = React.memo(({ value }) => {
  const computed = useMemo(() => heavy(value), [value]);
  return <div>{computed}</div>;
});

<Child value={value} />`,
  },
  {
    id: 'suspense-boundary',
    title: 'Suspense / Error Boundary',
    tags: ['React', 'Boundary'],
    description: '비동기/에러 경계 패턴',
    categories: ['react'],
    demo: (
      <InfoBlock
        title="Suspense + ErrorBoundary"
        points={[
          'Suspense: 비동기 로딩 UI 분리',
          'ErrorBoundary: 자식 오류 격리, fallback 제공',
          '데이터 패칭 라이브러리(React Query)와 함께 사용하면 효과적',
        ]}
      />
    ),
    code: `<Suspense fallback={<Spinner />}>
  <ErrorBoundary fallback={<Error />}>
    <Profile />
  </ErrorBoundary>
</Suspense>`,
  },
];
