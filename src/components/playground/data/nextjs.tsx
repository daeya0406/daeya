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
    id: 'suspense-error-boundary',
    title: 'ErrorBoundary + Suspense 조합',
    tags: ['Suspense', 'ErrorBoundary'],
    description:
      '데이터 로딩은 Suspense fallback, 에러는 ErrorBoundary fallback으로 분리해 UX 유지',
    categories: ['nextjs'],
    demo: (
      <InfoBlock
        title="패턴"
        points={[
          'ErrorBoundary는 render/error에서 던진 에러 처리 → 에러 UI/복구 액션',
          'Suspense는 pending 상태만 처리 → 데이터 로딩 skeleton/스피너',
          'Next App Router에서도 클라이언트 컴포넌트 내부에 조합 가능',
        ]}
      />
    ),
    code: `import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback() {
  return <div>문제가 발생했습니다. 새로고침하거나 다시 시도하세요.</div>;
}

function Loading() {
  return <div>로딩 중...</div>;
}

export default function Page() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </ErrorBoundary>
  );
}

// PostList 내부에서 useQuery(Suspense 모드)나 fetcher가 throw하면 ErrorBoundary가 처리`,
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
  {
    id: 'middleware-role-redirect',
    title: 'Middleware',
    tags: ['auth'],
    description:
      '쿠키에 저장된 role을 읽어서 /admin 경로 접근 시 권한 없는 사용자를 리다이렉트하는 패턴. matcher로 필요한 경로에만 적용할 것.',
    categories: ['nextjs'],
    code: `import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('role')?.value;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// middleware.ts에 저장하고, 필요시 config.matcher로 범위를 좁힙니다.`,
  },
];
