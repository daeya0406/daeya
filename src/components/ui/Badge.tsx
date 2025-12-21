'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'outline';
};

const variantClass = {
  default: 'bg-primary-100 text-primary',
  outline: 'border border-primary text-primary',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClass[variant],
        className
      )}
      {...props}
    />
  );
}
