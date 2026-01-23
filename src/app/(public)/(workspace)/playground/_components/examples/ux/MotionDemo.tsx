'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/Button';

export function MotionDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <p className="text-md text-muted-foreground font-normal">
        Fade + Slide 기본 모션 예제 (마이크로 인터랙션)
      </p>
      <div className="border-border bg-depth-1 h-32 overflow-hidden rounded-lg border p-4">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="border-primary/40 bg-primary/10 text-primary rounded-md border p-4 text-sm shadow-sm"
            >
              사용자에게 보여줄 내용이 생겼다는 신호를 주는 가장 기본 모션입니다.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button size="sm" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide' : 'Show'} Panel
      </Button>
    </div>
  );
}
