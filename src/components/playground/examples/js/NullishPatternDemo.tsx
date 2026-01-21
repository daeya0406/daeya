'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function NullishPatternDemo() {
  const scenarios = {
    nullable: { name: 'Daeya', role: null, city: undefined, coupon: 'SPRING' },
    emptyString: { name: '', role: '', city: '', coupon: '' },
    full: { name: 'Jeongdae', role: 'admin', city: 'Seoul', coupon: 'VIP' },
  } as const;

  const [scene, setScene] = useState<keyof typeof scenarios>('nullable');
  const user = scenarios[scene];
  const fallbackRole = user.role ?? 'guest';
  const cityOrUnknown = user.city || 'Unknown';
  const couponApplied = user.coupon && `${user.coupon} 사용`;
  const greeting = user.name ? `Hello, ${user.name}!` : 'Hello!';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setScene('nullable')}>
          null/undefined
        </Button>
        <Button size="sm" variant="outline" onClick={() => setScene('emptyString')}>
          빈 문자열
        </Button>
        <Button size="sm" variant="outline" onClick={() => setScene('full')}>
          값 존재
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="border-border bg-depth-1 rounded-lg border p-3 text-sm">
          <span className="text-xs tracking-[0.01em] font-semibold">현재 데이터</span>
          <pre className="text-foreground mt-2 whitespace-pre-wrap text-xs">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div className="border-border bg-depth-1 space-y-2 rounded-lg border p-3 text-sm">
          <p>
            role (??): <Badge variant="outline">{fallbackRole}</Badge>
          </p>
          <p>
            city (||): <Badge variant="outline">{cityOrUnknown}</Badge>
          </p>
          <p>
            coupon (&&): <Badge variant="outline">{couponApplied || '(없음)'}</Badge>
          </p>
          <p>
            삼항: <Badge variant="outline">{greeting}</Badge>
          </p>
        </div>
      </div>
    </div>
  );
}
