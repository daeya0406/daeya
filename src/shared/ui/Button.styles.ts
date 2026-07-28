import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(81,137,250,0.55)] hover:scale-[1.02] hover:bg-primary/90',
        secondary: 'bg-depth-3 text-foreground hover:bg-depth-2',
        outline:
          'border border-border text-foreground bg-depth-1 hover:border-primary/30 hover:text-primary',
        none: 'text-foreground hover:text-primary',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-8 w-8',
        full: 'w-full h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
