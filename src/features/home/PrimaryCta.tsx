import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icons';

type PrimaryCtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function PrimaryCta({ href, children, className, external }: PrimaryCtaProps) {
  const Comp = external ? 'a' : Link;
  const linkProps = external
    ? { href, target: '_blank', rel: 'noreferrer' }
    : { href };

  return (
    <Comp
      {...linkProps}
      className={cn(
        'bg-primary text-primary-foreground group inline-flex items-center gap-3 rounded-full py-3.5 pl-7 pr-3 text-sm font-semibold shadow-[0_12px_40px_-12px_rgba(81,137,250,0.55)] transition-spring hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
    >
      <span>{children}</span>
      <span className="bg-primary-foreground/15 flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5">
        <Icon name="arrowUpRight" size={16} />
      </span>
    </Comp>
  );
}
