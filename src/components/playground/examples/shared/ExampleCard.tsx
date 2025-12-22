import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Text';

type ExampleCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ExampleCard({ title, children, className }: ExampleCardProps) {
  return (
    <div className={cn('section-component', className)}>
      <Text.S12 className="text-primary dark:text-foreground font-semibold">{title}</Text.S12>
      <div className="text-foreground dark:text-muted-foreground mt-2 space-y-1 font-mono text-xs">
        {children}
      </div>
    </div>
  );
}

type CodeLineProps = {
  label: string;
  value: string;
  className?: string;
};

export function CodeLine({ label, value, className }: CodeLineProps) {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <span className="text-muted-foreground">{label}:</span>
      <span className="break-all">{value}</span>
    </div>
  );
}
