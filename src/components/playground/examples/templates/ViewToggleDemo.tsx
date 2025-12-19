'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Text';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export default function ViewToggleDemo() {
  const data = [
    { title: 'Landing Page', owner: 'Daeya', status: '진행 중' },
    { title: 'Dashboard', owner: 'Team A', status: '완료' },
    { title: 'Mobile Web', owner: 'Daeya', status: '기획' },
  ];
  const [view, setView] = useState<'card' | 'table'>('card');

  return (
    <div className="space-y-3">
      <ToggleGroup
        type="single"
        value={view}
        className="flex gap-2"
        onValueChange={(v) => v && setView(v as 'card' | 'table')}
      >
        <ToggleGroupItem value="card" aria-label="카드 보기">
          카드형
        </ToggleGroupItem>
        <ToggleGroupItem value="table" aria-label="테이블 보기">
          테이블형
        </ToggleGroupItem>
      </ToggleGroup>

      {view === 'card' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {data.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <Text.Body16 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {item.title}
              </Text.Body16>
              <Text.Caption className="block text-slate-600 dark:text-slate-300">
                담당: {item.owner}
              </Text.Caption>
              <Badge className="mt-1" variant="outline">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>프로젝트</TableHead>
              <TableHead>담당</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.title}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
