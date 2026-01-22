import { cva } from 'class-variance-authority';

export const badgeVariants = cva('inline-flex items-center rounded-full font-semibold', {
  variants: {
    variant: {
      default: 'bg-primary-100 text-primary',
      outline: 'border border-primary text-primary',
      subtle: 'bg-depth-2 text-foreground',
      ghost: 'border border-primary/30 bg-primary/10 text-primary',
    },
    size: {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-xs',
      lg: 'px-4 py-2 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});
