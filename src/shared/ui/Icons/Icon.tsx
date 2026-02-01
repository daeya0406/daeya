import { Icons } from './icons';

type IconName = keyof typeof Icons;

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 16, className }: Props) {
  const LucideIcon = Icons[name];
  return <LucideIcon size={size} className={className} />;
}
