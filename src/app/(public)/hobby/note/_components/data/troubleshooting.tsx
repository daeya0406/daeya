import type { PlaygroundItem } from '@/types/playground';
import { InfoBlock } from '../examples/InfoBlock';

export const troubleshootingItems: PlaygroundItem[] = [
  {
    id: 'layer-separation',
    title: '레이어 분리(응집도 생각)',
    tags: ['Architecture'],
    description: '컴포넌트는 UI, 도메인은 로직, 인프라는 IO',
    categories: ['troubleshooting'],
    demo: (
      <InfoBlock
        title="분리 패턴"
        points={[
          'Presentation: 컴포넌트는 상태+렌더만, 데이터 로드는 훅/서비스로',
          'Domain: 토큰 검증/권한 체크 등 비즈니스 규칙은 순수 함수로',
          'Infra: localStorage, fetch, router.push 같은 IO는 한곳에 모으기',
          '단방향: Presentation → Domain → IO (위에서 아래로만 흐름. 아래 레이어는 상위 레이어를 모름)',
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

// infra (io.ts) : 입출력 IO(input, output) - 밖이랑 소통
export const getToken = () => localStorage.getItem('accessToken');
export const fetchMe = (token: string) => fetch('/api/user', { headers: { Authorization: \`Bearer \${token}\` }});

// domain (auth.ts) : 규칙을 정하는 곳
export const isValidToken = (token: string) => !isExpired(token);

// hook (useUser.ts) : 훅
export function useUser() {
  const token = getToken();
  const enabled = token && isValidToken(token);
  return useQuery(['me'], () => fetchMe(token!), { enabled });
}

// presentation : 보여주고 받아오기
function ProfilePage() {
  const { data: user } = useUser();
  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}`,
  },
  {
    id: 'rq-suspense-empty-list',
    title: 'React Query + Suspense에서 목록 무한 로딩',
    tags: ['react-query', 'suspense', 'app-router'],
    description:
      'App Router + Suspense 환경에서 queryFn이 데이터 없음을 에러로 던지며 fallback 반복 → 빈 상태는 정상 흐름으로 분리. 처음엔 Suspense 문제라고 생각했으나, 실제론 queryFn 내부에서 throw를 남발한 설계 문제',
    categories: ['troubleshooting'],
    code: `// 원인: 데이터 없을 때 throw 하던 로직
// if (!data) throw new Error('no data');

// 해결: 빈 배열은 정상 케이스로 반환
const result = await fetchSomething();
if (!result) {
  return [];
}
return result;`,
  },
];
