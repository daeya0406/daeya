'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const spring = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...spring, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
