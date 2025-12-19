'use client';
import * as React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
export function FadeUp({
  className,
  children,
  delay = 0,
  once = true,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
} & MotionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
