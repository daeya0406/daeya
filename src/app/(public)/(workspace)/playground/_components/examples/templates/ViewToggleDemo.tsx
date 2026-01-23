'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/ToggleGroup';
import { Badge } from '@/shared/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/Table';

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
              className="rounded-lg border border-border bg-depth-1 p-3 shadow-sm"
            >
              <p className="text-lg font-normal text-base font-semibold text-foreground">
                {item.title}
              </p>
              <span className="text-xs tracking-[0.01em] block text-muted-foreground">
                담당: {item.owner}
              </span>
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
