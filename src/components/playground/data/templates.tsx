import FormPatternDemo from '../examples/templates/FormPatternDemo';
import TableFilterDemo from '../examples/templates/TableFilterDemo';
import DataBoundaryDemo from '../examples/templates/DataBoundaryDemo';
import { InfoBlock } from '../examples/InfoBlock';
import type { PlaygroundItem } from '@/types/playground';

export const templateItems: PlaygroundItem[] = [
  {
    id: 'form-pattern',
    title: 'Form',
    tags: ['RHF', 'Zod', 'Pattern'],
    description: 'RHF + ZOD (폼 상태/검증 패턴)',
    categories: ['templates'],
    demo: <FormPatternDemo />,
    code: `const schema = z.object({ email: z.string().email() })
const form = useZodForm({ schema })

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField control={form.control} name="email" render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <Button type="submit">Submit</Button>
  </form>
</Form>`,
  },
  {
    id: 'data-boundary',
    title: 'Data 처리',
    tags: ['Boundary', 'Skeleton'],
    description: '로딩/빈/에러/성공 상태를 한곳에서 처리',
    categories: ['templates'],
    demo: <DataBoundaryDemo />,
    code: `if (state === 'loading') return <Skeleton />;
if (state === 'error') return <Error />;
if (state === 'empty') return <Empty />;
return <List data={data} />;`,
  },
  {
    id: 'fetch-template',
    title: 'fetch',
    tags: ['Fetch'],
    description: 'fetch + 상태 분기 기본 예제',
    categories: ['templates'],
    demo: (
      <InfoBlock
        title="fetch 패턴"
        points={['loading/error 분기', '언마운트 후 setState 방지 플래그']}
      />
    ),
    code: `import { useEffect, useState } from "react";

export default function Demo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

        const json = await res.json();
        if (!ignore) setData(json);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    run();
    return () => {
      ignore = true; // 언마운트 후 setState 방지
    };
  }, []);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러: {String(error.message ?? error)}</p>;

  return (
    <ul>
      {(data ?? []).map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 'axios-template',
    title: 'axios',
    tags: ['Axios'],
    description: 'axios로 리스트 fetch 예제',
    categories: ['templates'],
    demo: <InfoBlock title="axios 패턴" points={['axios.get + useEffect', '간단한 목록 렌더링']} />,
    code: `import axios from "axios";
import { useEffect, useState } from "react";

export default function Demo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const run = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(res.data);
    };
    run();
  }, []);

  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 'table-filter',
    title: 'Table 필터•정렬',
    tags: ['Table', 'Filter', 'UI'],
    description: '필터/정렬/빈 상태 패턴',
    categories: ['templates'],
    demo: <TableFilterDemo />,
    code: `const filtered = items
  .filter((i) => i.status === filter)
  .sort((a,b) => {
    const aTime = dayjs(a.date, 'YYYY.MM.DD').valueOf();
    const bTime = dayjs(b.date, 'YYYY.MM.DD').valueOf();
    return sort === 'desc' ? bTime - aTime : aTime - bTime;
  });`,
  },
  {
    id: 'eslint-prettier',
    title: 'ESLint + Prettier 세팅',
    tags: ['Lint'],
    description: '코드 품질/포매팅 템플릿',
    categories: ['templates'],
    demo: (
      <InfoBlock
        title="ESLint + Prettier"
        points={[
          'eslint-config-next + @typescript-eslint 기본 설정',
          'prettier / prettier-plugin-tailwindcss 적용',
          'lint 스크립트와 pre-push 훅에 연결 권장',
        ]}
      />
    ),
    code: `// package.json
"lint": "eslint",
"format": "prettier --write ."`,
  },
  {
    id: 'tailwind-ui',
    title: 'Tailwind UI 템플릿',
    tags: ['Tailwind'],
    description: '레이아웃/카드/폼 베이스 템플릿',
    categories: ['templates'],
    demo: (
      <InfoBlock
        title="Tailwind UI Base"
        points={[
          'section-card, button, input 등 기본 유틸 클래스',
          '라이트/다크 모드 색상 토큰 정리',
          '레이아웃(max-width, grid) 기본 프리셋',
        ]}
      />
    ),
    code: `<div className="section-card">...</div>`,
  },
  {
    id: 'query-template',
    title: 'React Query 템플릿',
    tags: ['Query'],
    description: 'queryKey + enabled + staleTime 기본 패턴',
    categories: ['templates'],
    demo: (
      <InfoBlock
        title="Query 템플릿"
        points={[
          'queryKey로 캐시 구분, enabled로 조건부 실행',
          'staleTime으로 캐시 신선도 조절',
          'isPending/error 분기, data는 캐시에서 재활용',
        ]}
      />
    ),
    code: `const { data, isPending, error } = useQuery({
  queryKey: ['posts', page],   // 캐시 식별
  queryFn: () => getPosts(page), // 패칭 함수
  enabled: !!page,             // 조건부 요청
  staleTime: 1000 * 60,        // 캐시 신선도(1분)
});

if (isPending) return <Skeleton />;
if (error) return <Error />;
return <PostList posts={data} />;`,
  },

  {
    id: 'zustand-template',
    title: 'Zustand 템플릿',
    tags: ['State'],
    description: '경량 전역 상태 예제',
    categories: ['templates'],
    demo: (
      <InfoBlock
        title="Zustand 패턴"
        points={[
          'slice 분리, persist 미들웨어로 저장소 유지',
          'selector로 불필요 렌더 방지',
          'immer와 함께 쓰면 불변 업데이트 간결',
        ]}
      />
    ),
    code: `import { create } from 'zustand';

type CounterStore = {
  count: number;
  inc: () => void;
};

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  inc: () =>
    set((s) => ({
      count: s.count + 1,
    })),
}));

function CounterView() {
  // count만 구독 → count 변경 시에만 리렌더
  const count = useCounterStore((state) => state.count);
  return <h2>현재 카운트: {count}</h2>;
}

function CounterButton() {
  // action만 구독 → count 변경과 무관
  const inc = useCounterStore((state) => state.inc);
  return <button onClick={inc}>+1 증가</button>;
}

export default function App() {
  return (
    <div>
      <CounterView />
      <CounterButton />
    </div>
  );
}`,
  },
];
