import type { PlaygroundItem } from '@/types/playground';
import { InfoBlock } from '../examples/InfoBlock';

export const nextItems: PlaygroundItem[] = [
  {
    id: 'structure',
    title: 'Next.js 디렉토리 구조',
    tags: ['Structure'],
    description: '프로젝트 구조 - 라우팅/레이아웃/도메인 분리',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        points={[
          'app/: 라우트·레이아웃·페이지 엔트리',
          'components/: 공통 UI, 도메인별 컴포넌트',
          'hooks/ · lib/ · types/: 훅, 유틸, 타입 분리',
        ]}
      />
    ),
    code: `src/
├ app/
│ ├ layout.tsx          // 최상위 레이아웃·메타
│ ├ page.tsx            // 홈 (또는 (marketing)/page.tsx)
│ ├ (auth)/             // 로그인/회원가입 그룹
│ ├ blog/[slug]/page.tsx// 동적 라우트 예시
│ ├ api/                // route handler (REST/RPC)
│ └ global-error.tsx    // 전역 에러 UI
├ components/
│ ├ ui/                 // 버튼·폼 등 재사용 UI
│ └ common/             // Header, Footer, Navigation
├ hooks/                // 공용 훅 (예: usePrefetch)
├ lib/                  // fetcher, auth, utils
├ styles/               // 글로벌 스타일, tokens
└ types/                // 전역 타입 선언`,
  },
  {
    id: 'layer-separation',
    title: '레이어 분리(응집도 생각)',
    tags: ['Architecture'],
    description: '컴포넌트는 UI, 도메인은 로직, 인프라는 IO',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="분리 패턴"
        points={[
          'Presentation: 컴포넌트는 상태+렌더만, 데이터 로드는 훅/서비스로',
          'Domain: 토큰 검증/권한 체크 등 비즈니스 규칙은 순수 함수로',
          'Infra: localStorage, fetch, router.push 같은 IO는 한곳에 모으기',
        ]}
      />
    ),
    code: `// ❌ 안티 패턴: 모든 계층이 뒤섞임
"use client";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Infrastructure (localStorage)
    const token = localStorage.getItem('accessToken');

    // 2. Domain Logic (토큰 검증)
    if (!token || isTokenExpired(token)) {
      router.push('/login');
      return;
    }
    // 3. Infrastructure (fetch)
    fetch('/api/user', {
      headers: { Authorization: \`Bearer \${token}\` }
    })
    // 4. Presentation Logic
    .then(res => res.json())
    .then(data => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}


// ✅ 개선된 패턴: 역할별로 분리

// infra (io.ts)
export const getToken = () => localStorage.getItem('accessToken');
export const fetchMe = (token: string) => fetch('/api/user', { headers: { Authorization: \`Bearer \${token}\` }});

// domain (auth.ts)
export const isValidToken = (token: string) => !isExpired(token);

// hook (useUser.ts)
export function useUser() {
  const token = getToken();
  const enabled = token && isValidToken(token);
  return useQuery(['me'], () => fetchMe(token!), { enabled });
}

// presentation
function ProfilePage() {
  const { data: user } = useUser();
  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}`,
  },
  {
    id: 'server-client-components',
    title: '서버/클라이언트 컴포넌트 차이',
    tags: ['Server/Client'],
    description: '서버/클라이언트 컴포넌트 경계 이해',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="Server vs Client Components"
        points={[
          '서버: 데이터 fetch, 직렬화 가능한 props만 전달',
          '클라이언트: 상태/이벤트 처리, "use client" 필요',
          '경계에서 props는 직렬화 가능한 값만 허용',
        ]}
      />
    ),
    code: `"use client" // 클라 컴포넌트 상단에 선언
export default function Button(...) { ... }`,
  },
  {
    id: 'rendering-modes',
    title: 'SSR / CSR / SSG / ISR 비교',
    tags: ['Rendering'],
    description: 'Next 렌더링 모드 비교',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="렌더링 모드"
        points={[
          'SSR: 요청 시 생성, SEO 강점, 캐시 전략 필요',
          'CSR: 클라 렌더, 첫 페인트 느림, 이후 빠름',
          'SSG/ISR: 정적 빌드 + 재검증, 트래픽 많은 페이지에 적합',
        ]}
      />
    ),
    code: `export const revalidate = 3600; // ISR
export const dynamic = "force-dynamic"; // SSR
export const dynamic = "force-static"; // SSG`,
  },
  {
    id: 'server-actions',
    title: '서버 액션',
    tags: ['Server Actions'],
    description: '폼/뮤테이션을 서버 함수로 처리',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="Server Actions"
        points={[
          '서버에서 실행되는 함수 → 클라 폼에서 직접 호출',
          '보안/시크릿 유지, 클라 번들 축소',
          'async function action(formData) { ... }',
        ]}
      />
    ),
    code: `'use server'
export async function createTodo(formData: FormData) {
  // DB 작업
}`,
  },
  {
    id: 'fetch-cache',
    title: 'fetch 캐싱',
    tags: ['Cache'],
    description: 'Next fetch 캐시/재검증 전략',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="fetch 캐시"
        points={[
          '기본: GET fetch는 자동 캐싱, revalidate로 재검증',
          'no-store로 캐시 비활성화',
          'route segment별 revalidate 적용',
        ]}
      />
    ),
    code: `await fetch(url, { next: { revalidate: 3600 } });
await fetch(url, { cache: 'no-store' });`,
  },
  {
    id: 'routing',
    title: '라우팅 구조 정리',
    tags: ['Routing'],
    description: 'app router 기본 구조',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="라우팅"
        points={[
          'app/(group)/page.tsx: 경로 구성',
          'layout.tsx로 섹션별 레이아웃',
          'route handler (app/api/*)로 서버 API 작성',
        ]}
      />
    ),
    code: `app/blog/[slug]/page.tsx
app/(marketing)/page.tsx
app/api/todos/route.ts`,
  },
];
