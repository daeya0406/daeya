'use client';

export default function DashboardSection() {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">Dashboard</h3>
      <span className="text-xs tracking-[0.01em] block text-muted-foreground">
        보호된 위젯/요약 정보를 배치할 공간입니다.
      </span>
      <div className="rounded-xl border border-border bg-depth-1/70 p-4 shadow-sm">
        <p className="text-sm text-foreground">인증/권한이 필요한 영역을 샘플로 보여주세요.</p>
      </div>
    </div>
  );
}
