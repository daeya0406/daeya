import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'bg-primary/10 text-primary inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase',
        className
      )}
    >
      {children}
    </span>
  );
}
