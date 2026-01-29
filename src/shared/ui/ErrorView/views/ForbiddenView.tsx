import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export function ForbiddenView() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
      <p className="text-xl">접근 권한이 없습니다.</p>
      <Link href="/">
        <Button>홈으로</Button>
      </Link>
    </div>
  );
}
