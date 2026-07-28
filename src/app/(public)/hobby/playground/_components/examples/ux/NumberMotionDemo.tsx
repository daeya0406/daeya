'use client';

import { animate, useMotionValue, motion, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function NumberMotionDemo() {
  const motionValue = useMotionValue(0);
  const toFixed = useTransform(motionValue, (latest) => latest.toFixed(0));

  useEffect(() => {
    const control = animate(motionValue, 100, { duration: 2 });
    return () => control.stop();
  }, [motionValue]);

  return (
    <div className="flex h-20 items-center justify-center">
      <motion.pre className="text-4xl">{toFixed}</motion.pre>
    </div>
  );
}
