'use client';

export function GradientDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="bg-linear-to-tr h-12 w-12 rounded-full from-[#096cde] from-30% to-[#ddf1ff]" />
      <span className="bg-linear-to-r from-[#15c064] from-20% to-[#00d1ff] to-90% bg-clip-text px-1 text-4xl font-bold leading-[1.1] text-transparent">
        Text Gradient
      </span>
    </div>
  );
}
