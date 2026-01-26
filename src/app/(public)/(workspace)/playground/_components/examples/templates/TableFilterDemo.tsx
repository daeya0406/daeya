'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/Table';
import dayjs from 'dayjs';

export function TableFilterDemo() {
  const data = useMemo(
    () => [
      { title: 'Alpha', status: 'open', date: dayjs('2024-11-30').format('YYYY.MM.DD') },
      { title: 'Beta', status: 'closed', date: dayjs('2024-10-30').format('YYYY.MM.DD') },
      { title: 'Gamma', status: 'open', date: dayjs('2024-09-30').format('YYYY.MM.DD') },
    ],
    []
  );
  const [status, setStatus] = useState<'all' | 'open' | 'closed'>('all');
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');

  const filtered = data
    .filter((item) => (status === 'all' ? true : item.status === status))
    .sort((a, b) => {
      const aTime = dayjs(a.date, 'YYYY.MM.DD').valueOf();
      const bTime = dayjs(b.date, 'YYYY.MM.DD').valueOf();
      return sort === 'desc' ? bTime - aTime : aTime - bTime;
    });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Select value={status} onValueChange={(v: 'all' | 'open' | 'closed') => setStatus(v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v: 'desc' | 'asc') => setSort(v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">최신순</SelectItem>
            <SelectItem value="asc">오래된순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">조건에 맞는 데이터가 없습니다.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.title}>
                <TableCell>{item.title}</TableCell>
                <TableCell className="capitalize">{item.status}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
