'use client';

import { toast } from 'sonner';

interface ColorChipProps {
  name: string; // point, red, blue ...
  step: string; // 500, 600, default...
  hex: string; // #197ed1
}

export default function ColorChip({ name, step, hex }: ColorChipProps) {
  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isLeft = clickX < rect.width / 2;

    const className =
      step === 'default'
        ? `${isLeft ? 'text' : 'bg'}-${name}`
        : `${isLeft ? 'text' : 'bg'}-${name}-${step}`;

    navigator.clipboard.writeText(className);
    toast.success(`Copied: ${className}`, { duration: 1500 });
  };

  return (
    <div
      onClick={handleCopy}
      className="group relative h-[50px] w-[90px] cursor-pointer select-none rounded-md border border-white/10"
      style={{ backgroundColor: hex }}
    >
      <span className="absolute bottom-1 left-1 text-[12px] text-white/80">{step}</span>

      {/* Hover Overlay */}
      <div className="pointer-events-none absolute inset-0 flex rounded-md bg-black/40 text-[14px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-80">
        <div className="flex w-1/2 items-center justify-center border-r border-white/30">text</div>
        <div className="flex w-1/2 items-center justify-center">bg</div>
      </div>
    </div>
  );
}
