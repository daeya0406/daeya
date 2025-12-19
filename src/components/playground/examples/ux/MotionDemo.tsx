'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

export default function MotionDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <Text.Body14 className="text-slate-600 dark:text-slate-200">
        Fade + Slide 기본 모션 예제 (마이크로 인터랙션)
      </Text.Body14>
      <div className="h-32 overflow-hidden rounded-lg border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="rounded-md border border-blue-200/70 bg-blue-50 p-4 text-sm text-blue-800 shadow-sm dark:border-blue-400/30 dark:bg-blue-900/40 dark:text-blue-100"
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
