'use client';

export default function PortfolioSection() {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">Portfolio</h3>
      <span className="text-xs tracking-[0.01em] block text-muted-foreground">
        실제 프로젝트/역할/스택을 카드로 정리할 공간입니다.
      </span>
      <div className="rounded-xl border border-border bg-depth-1/70 p-4 shadow-sm">
        <p className="text-sm text-foreground">프로젝트 카드 리스트를 여기에 배치하세요.</p>
      </div>
    </div>
  );
}
