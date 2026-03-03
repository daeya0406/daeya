'use client';

import { animate, useMotionValue, motion, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function NumberMotionDemo() {
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
    <div className="flex h-20 items-center justify-center">
      <motion.pre className="text-4xl">{toFixed}</motion.pre>
    </div>
  );
}
