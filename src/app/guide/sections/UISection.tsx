'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

import {
  Sun,
  Moon,
  Github,
  Menu,
  X,
  ChevronDown,
  Copy,
  Loader2,
  ChevronUp,
  Check,
  EllipsisVertical,
} from 'lucide-react';

import { toast } from 'sonner';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';

import {
  DropdownOption,
  DropdownOptionTrigger,
  DropdownOptionContent,
  DropdownOptionItem,
} from '@/components/ui/DropdownOption';
import { ContactFormDemo } from '@/components/guide/ContactFormDemo';
import { DateText } from '@/components/ui/DateText';
import { DatePicker } from '@/components/ui/DatePicker';
import {
  Table,
  TableBody,
  
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';

export default function UISection() {
  const [pickedDate, setPickedDate] = useState<Date | undefined>();
  const icons = {
    Sun,
    Moon,
    Github,
    Menu,
    X,
    ChevronDown,
    Copy,
    Loader2,
    ChevronUp,
    Check,
  };

  return (
    <>
      <div className="line-bottom mb-8 space-y-2">
        <h3 className="text-xl font-semibold text-primary">UI Components</h3>
        <span className="text-xs tracking-[0.01em] block">
          프로젝트에서 UI 컴포넌트입니다.
        </span>
      </div>

      <div className="flex flex-col gap-10">
        {/* Button */}
        <div className="flex flex-col gap-3">
          <p className="text-md font-normal">Button Variants</p>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">아웃라인</Button>
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-3">
          <p className="text-md font-normal">Input</p>
          <Input placeholder="이메일을 입력하세요" className="max-w-sm" />
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-3">
          <p className="text-md font-normal">Textarea</p>
          <Textarea placeholder="메시지를 입력하세요..." className="max-w-sm" />
        </div>

        {/* Select */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Select</p>
            <Badge variant="outline">Radix</Badge>
          </div>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="tailwind">Tailwind</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* DatePicker */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Date Picker</p>
            <Badge variant="outline">dayjs</Badge>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            <DatePicker value={pickedDate} onChange={setPickedDate} />
            <DateText value={pickedDate ?? new Date()} label="선택 날짜" />
          </div>
        </div>

        {/* Dialog */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Dialog</p>
            <Badge variant="outline">Modal</Badge>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-[160px]">모달 열기</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>모달 제목</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2 text-sm">
                모달입니다.
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dropdown Menu */}
        <div className="flex flex-col gap-3">
          <p className="text-md font-normal">Dropdown Menu</p>
          <DropdownOption>
            <DropdownOptionTrigger asChild>
              <Button variant="outline" className="w-[40px] px-0">
                <EllipsisVertical className="text-muted-foreground" />
              </Button>
            </DropdownOptionTrigger>

            <DropdownOptionContent align="start" sideOffset={4}>
              <DropdownOptionItem>프로필 보기</DropdownOptionItem>
              <DropdownOptionItem>수정하기</DropdownOptionItem>
              <DropdownOptionItem>삭제하기</DropdownOptionItem>
            </DropdownOptionContent>
          </DropdownOption>
        </div>

        {/* Icon */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Icons</p>
            <Badge variant="outline">Lucide</Badge>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                아이콘 보기
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogTitle>Icon Library</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm">
                클릭하면 JSX 코드가 복사됩니다.
              </DialogDescription>

              <div className="mt-4 grid grid-cols-5 gap-4">
                {Object.entries(icons).map(([name, Icon]) => (
                  <button
                    key={name}
                    onClick={() => {
                      const code = `<${name} className="h-5 w-5" />`;
                      navigator.clipboard.writeText(code);
                      toast.success(`Copied: ${name}`);
                    }}
                    className="hover:bg-muted/40 flex flex-col items-center justify-center gap-2 rounded-md p-3 transition"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-muted-foreground text-xs">{name}</span>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Table</p>
            <Badge variant="outline">컴파운드 패턴</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>알파</TableCell>
                <TableCell>프론트엔드</TableCell>
                <TableCell>
                  <Badge>In progress</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>베타</TableCell>
                <TableCell>백엔드</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                    Done
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* 테이블 데이터 없을 때 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Table</p>
            <Badge variant="outline">데이터 없을 때</Badge>
          </div>
          <TableEmpty>데이터가 없습니다.</TableEmpty>
        </div>

        {/* Form + Validation + Query */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="text-md font-normal">Form</p>
            <Badge variant="outline">React Hook Form + Zod + React Query</Badge>
          </div>
          <ContactFormDemo />
        </div>
      </div>
    </>
  );
}
