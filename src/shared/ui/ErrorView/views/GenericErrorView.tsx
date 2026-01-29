import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export function GenericErrorView() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
      <p className="text-xl">예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      <Link href="/">
        <Button>홈으로</Button>
      </Link>
    </div>
  );
}
