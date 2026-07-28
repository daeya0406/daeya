import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
};

const speedClass = {
  slow: '[--marquee-duration:40s]',
  normal: '[--marquee-duration:28s]',
  fast: '[--marquee-duration:18s]',
};

export function Marquee({ items, className, speed = 'normal' }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        speedClass[speed],
        'mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div className="animate-marquee flex w-max gap-3 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="bg-depth-1 text-muted-foreground ring-border/60 shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

type ImageMarqueeProps = {
  images: string[];
  altPrefix?: string;
  className?: string;
};

export function ImageMarquee({ images, altPrefix = 'logo', className }: ImageMarqueeProps) {
  const doubled = [...images, ...images];

  return (
    <div
      className={cn(
        'relative overflow-hidden [--marquee-duration:32s]',
        'mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className
      )}
    >
      <div className="animate-marquee flex w-max items-center gap-8 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {doubled.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${altPrefix} ${(index % images.length) + 1}`}
            className="h-10 w-auto max-w-[120px] shrink-0 object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
