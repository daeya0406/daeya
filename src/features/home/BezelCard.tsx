import { cn } from '@/lib/utils';

type BezelCardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function BezelCard({ children, className, innerClassName }: BezelCardProps) {
  return (
    <div className={cn('bezel-shell', className)}>
      <div className={cn('bezel-inner', innerClassName)}>{children}</div>
    </div>
  );
}
