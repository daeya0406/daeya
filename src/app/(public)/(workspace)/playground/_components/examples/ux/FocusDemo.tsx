'use client';

export function FocusDemo() {
  return (
    <div className="space-y-3">
      <p className="text-md text-muted-foreground font-normal">
        키보드 포커스 / 접근성: focus-visible + aria-label
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <button className="border-border bg-depth-1 focus-visible:border-primary focus-visible:ring-primary/40 rounded-lg border px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:ring-2">
          기본 버튼 (Tab으로 포커스 확인)
        </button>
        <label className="border-border bg-depth-1 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm">
          <span className="text-muted-foreground text-xs tracking-[0.01em]">입력</span>
          <input
            className="border-border bg-depth-1 text-foreground focus-visible:border-primary focus-visible:ring-primary/40 placeholder:text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
            placeholder="aria-label 예시"
            aria-label="접근성 입력 필드"
          />
        </label>
      </div>
    </div>
  );
}
