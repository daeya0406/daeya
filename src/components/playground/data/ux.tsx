import type { PlaygroundItem } from '@/types/playground';
import MotionDemo from '../examples/ux/MotionDemo';
import SkeletonDemo from '../examples/ux/SkeletonDemo';
import UxOptimisticDemo from '../examples/ux/OptimisticDemo';
import FocusDemo from '../examples/ux/FocusDemo';
import ToastDemo from '../examples/ux/ToastDemo';
import { InfoBlock } from '../examples/InfoBlock';

export const uxItems: PlaygroundItem[] = [
  {
    id: 'ux-motion',
    title: 'Motion 기본 패턴',
    tags: ['Framer', 'Fade/Slide'],
    description: '마이크로 인터랙션: Fade + Slide로 "보여줄게 있다"는 신호 주기',
    categories: ['ux'],
    demo: <MotionDemo />,
    code: `// Framer Motion
<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} />`,
  },
  {
    id: 'ux-skeleton',
    title: 'Skeleton / Shimmer',
    tags: ['Skeleton', 'Loading UX'],
    description: '레이아웃 점프를 줄이는 Skeleton vs Spinner 비교',
    categories: ['ux'],
    demo: <SkeletonDemo />,
    code: `<div className="animate-pulse h-4 w-3/4 rounded bg-bg-depth-3" />`,
  },
  {
    id: 'ux-optimistic',
    title: 'Optimistic UI',
    tags: ['Optimistic', 'Mutation'],
    description: '클릭 즉시 반영 후 실패 시 롤백하는 패턴',
    categories: ['ux'],
    demo: <UxOptimisticDemo />,
    code: `setState(+1); mutate().catch(() => setState(-1));`,
  },
  {
    id: 'ux-focus',
    title: 'Focus Indicator / 접근성',
    tags: ['A11y', 'Focus'],
    description: 'focus-visible 스타일과 aria-label 예시',
    categories: ['ux'],
    demo: <FocusDemo />,
    code: `<button className="focus-visible:ring-2" aria-label="...">`,
  },
  {
    id: 'ux-toast',
    title: 'Toast / Snackbar',
    tags: ['Toast', 'Feedback'],
    description: '즉각적 피드백 + 자동 dismiss + role="alert"',
    categories: ['ux'],
    demo: <ToastDemo />,
    code: `toast.success('저장됨', { duration: 1800, dismissible: true });
    
onClick={() => toast.success('저장되었습니다', { duration: 1800, dismissible: true })}
onClick={() => toast.error('에러가 발생했습니다', { duration: 2200 })}`,
  },
  {
    id: 'ux-a11y-info',
    title: 'UX 메모: 접근성과 마이크로 인터랙션',
    tags: ['UX Note'],
    description: '왜 필요한지 짧게 정리',
    categories: ['ux'],
    demo: (
      <InfoBlock
        title="UX 패턴 요약"
        points={[
          'Skeleton: 레이아웃을 고정하고 심리적 체감 로딩 감소',
          'Optimistic UI: 사용자 손가락보다 빠르게 UI 반응',
          'Focus/ARIA: 키보드/스크린리더도 동일한 경험 제공',
          'Toast: 짧은 정보, 배경을 가리지 않는 위치/시간',
        ]}
      />
    ),
    code: `// UX 메모
// Skeleton, Optimistic, Focus-visible, Toast`,
  },
];
