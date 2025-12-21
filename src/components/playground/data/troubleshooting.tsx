import type { PlaygroundItem } from '@/types/playground';

export const troubleshootingItems: PlaygroundItem[] = [
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
