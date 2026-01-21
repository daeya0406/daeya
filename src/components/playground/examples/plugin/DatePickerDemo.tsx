'use client';

import { useState, useMemo } from 'react';
import { DatePicker } from '@/components/ui/DatePicker';
import { Badge } from '@/components/ui/Badge';
import dayjs from 'dayjs';

// 고정된 예시 날짜로 SSR/CSR 포맷 차이를 없앱니다.
const DEFAULT_DATE = dayjs('2025-12-04').toDate();

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(DEFAULT_DATE);
  const display = useMemo(() => (date ? dayjs(date).format('YYYY.MM.DD') : '선택 전'), [date]);

  return (
    <div className="space-y-3">
      <DatePicker value={date ?? undefined} onChange={(d) => setDate(d)} />
      <span className="text-xs tracking-[0.01em] block">
        선택 날짜: <Badge variant="outline">{display}</Badge>
      </span>
    </div>
  );
}
