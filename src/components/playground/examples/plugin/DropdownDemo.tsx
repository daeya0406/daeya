'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownOption,
  DropdownOptionTrigger,
  DropdownOptionContent,
  DropdownOptionItem,
} from '@/components/ui/DropdownOption';

import { EllipsisVertical } from 'lucide-react';

export default function DropdownDemo() {
  return (
    <div className="space-y-2">
      <DropdownOption>
        <DropdownOptionTrigger asChild>
          <Button variant="outline" className="w-10 px-0">
            <EllipsisVertical className="text-muted-foreground" />
          </Button>
        </DropdownOptionTrigger>
        <DropdownOptionContent align="start" sideOffset={4}>
          <DropdownOptionItem>프로필 보기</DropdownOptionItem>
          <DropdownOptionItem>알림 설정</DropdownOptionItem>
          <DropdownOptionItem>로그아웃</DropdownOptionItem>
        </DropdownOptionContent>
      </DropdownOption>
    </div>
  );
}
