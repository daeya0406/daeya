import DatePickerDemo from '../examples/plugin/DatePickerDemo';
import SwitchDemo from '../examples/plugin/SwitchDemo';
import AccordionDemo from '../examples/plugin/AccordionDemo';
import DropdownDemo from '../examples/plugin/DropdownDemo';
import type { PlaygroundItem } from '@/types/playground';

export const pluginItems: PlaygroundItem[] = [
  {
    id: 'date-picker',
    title: 'Date Picker',
    tags: ['dayjs', 'UI'],
    description: '날짜 선택 입력 + 포맷',
    categories: ['plugin'],
    demo: <DatePickerDemo />,
    code: `<DatePicker value={date} onChange={setDate} format="YYYY.MM.DD" />`,
  },
  {
    id: 'switch',
    title: 'Switch',
    tags: ['Switch', 'UI'],
    description: '토글 스위치와 설명 텍스트 패턴',
    categories: ['plugin'],
    demo: <SwitchDemo />,
    code: `<Switch checked={enabled} onCheckedChange={setEnabled} />`,
  },
  {
    id: 'accordion',
    title: 'Accordion',
    tags: ['Accordion', 'UI'],
    description: 'FAQ / 상세 정보 접기/펼치기 패턴',
    categories: ['plugin'],
    demo: <AccordionDemo />,
    code: `<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>질문</AccordionTrigger>
    <AccordionContent>답변</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    id: 'dropdown',
    title: 'Dropdown Option',
    tags: ['Radix', 'Dropdown', 'UI'],
    description: 'Radix Dropdown Option 프로필 메뉴',
    categories: ['plugin'],
    demo: <DropdownDemo />,
    code: `<DropdownOption>
  <DropdownOptionTrigger asChild>
    <Button>옵션 UI</Button>
  </DropdownOptionTrigger>
  <DropdownOptionContent className="w-48">
    <DropdownOptionLabel>내 계정</DropdownOptionLabel>
    <DropdownOptionSeparator />
    <DropdownOptionItem>프로필 보기</DropdownOptionItem>
    <DropdownOptionItem>알림 설정</DropdownOptionItem>
    <DropdownOptionItem>로그아웃</DropdownOptionItem>
  </DropdownOptionContent>
</DropdownOption>`,
  },
];
