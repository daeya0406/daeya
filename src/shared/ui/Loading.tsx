'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface LoadingProps {
  text?: string;
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean;

  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

export function Loading({
  text = 'Loading...',
  fullscreen = false,
  size = 'md',
  blur = true,
  className,
}: LoadingProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className={clsx('border-muted border-t-primary animate-spin rounded-full', sizeMap[size])}
      />

      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (!fullscreen) {
    return <div className={clsx('flex items-center justify-center', className)}>{spinner}</div>;
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        blur ? 'bg-background/60 backdrop-blur-sm' : 'bg-background',
        className
      )}
    >
      {spinner}
    </div>
  );
}
