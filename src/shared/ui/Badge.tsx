'use client';

import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/shared/ui/Badge.styles';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
