import type { PlaygroundItem } from '@/types/playground';
import {
  FocusDemo,
  ToastDemo,
  OptimisticDemo,
  SkeletonDemo,
  NumberMotionDemo,
} from '../examples/ux';

export const uxItems: PlaygroundItem[] = [
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
    title: 'Toast',
    tags: ['Toast'],
    description: '즉각적 피드백 + 자동 dismiss + role="alert"',
    categories: ['ux'],
    demo: <ToastDemo />,
    code: `toast.success('저장됨', { duration: 1800, dismissible: true });
    
onClick={() => toast.success('저장되었습니다', { duration: 1800, dismissible: true })}
onClick={() => toast.error('에러가 발생했습니다', { duration: 2200 })}`,
  },
  {
    id: 'framer-motion',
    title: 'Framer Motion',
    tags: ['Framer'],
    description: 'Framer Motion 기본 구조',
    categories: ['ux'],
    codes: [
      {
        label: '',
        code: `<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
></motion.div>`,
      },
      {
        label: 'template.tsx에 넣으면 공통 적용(layout.tsx는 리렌더링 X)',
        code: `// app/template.tsx

import PageTransition from "@/components/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}`,
      },
      {
        label: '페이지 공통 모션 컴포넌트',
        code: `// app/components/PageTransition/index.tsx

import * as motion from "motion/react-client";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
`,
      },
    ],
  },
  {
    id: 'number-motion',
    title: '숫자 카운트 모션',
    tags: ['Framer', 'Count'],
    description: '숫자 카운트 모션',
    categories: ['ux'],
    demo: <NumberMotionDemo />,
    codes: [
      {
        label: '설치',
        code: `pnpm add motion`,
      },
      {
        label: '숫자 카운트 모션 적용',
        code: `"use client";

import { animate, useMotionValue, motion, useTransform } from 'framer-motion';
import { useEffect } from "react";

export default function Home() {
  // 1. 리렌더링과 독립적으로 관리되는 motion value 생성
  const motionValue = useMotionValue(0);

  // 2. motion value를 주시하고, 새로운 motion value(toFixed)를 생성
  const toFixed = useTransform(motionValue, (latest) => latest.toFixed(0));

  useEffect(() => {
    // 3. motionValue 객체의 값을 현재 값(0)에서 목표 값인 100으로 2초 동안 부드럽게 변경
    const control = animate(motionValue, 100, { duration: 2 });

    return () => control.stop();
  }, [motionValue]);

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.pre className="text-4xl">{toFixed}</motion.pre>
    </div>
  );
}
`,
      },
    ],
  },
  {
    id: 'ux-skeleton',
    title: 'Skeleton / Shimmer',
    tags: ['Skeleton', 'Loading UX'],
    description: '레이아웃 점프를 줄이는 Skeleton vs Spinner 비교',
    categories: ['ux'],
    demo: <SkeletonDemo />,
    code: `<div className="animate-pulse h-4 w-3/4 rounded bg-depth-3" />`,
  },
  {
    id: 'ux-optimistic',
    title: 'Optimistic UI',
    tags: ['Optimistic', 'Mutation'],
    description: '클릭 즉시 반영 후 실패 시 롤백하는 패턴',
    categories: ['ux'],
    demo: <OptimisticDemo />,
    code: `setState(+1); mutate().catch(() => setState(-1));`,
  },
];
