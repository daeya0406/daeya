'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/Table';

export function ResponsiveTableDemo() {
  const data = [
    { title: 'Landing Page', owner: 'Daeya', status: '진행 중' },
    { title: 'Dashboard', owner: 'Team A', status: '완료' },
    { title: 'Mobile Web', owner: 'Daeya', status: '기획' },
  ];

  return (
    <div className="space-y-3">
      <div className="hidden md:block">
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
      </div>

      <div className="grid gap-2 md:hidden">
        {data.map((item) => (
          <div
            key={item.title}
            className="border-border bg-depth-1 rounded-lg border p-3 text-sm shadow-sm"
          >
            <p className="text-foreground text-base font-semibold">{item.title}</p>
            <p className="text-muted-foreground">담당: {item.owner}</p>
            <p className="text-muted-foreground">상태: {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
