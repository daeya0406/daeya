'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/Accordion';

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="section-component w-full">
      <AccordionItem value="a">
        <AccordionTrigger>이 프로젝트는 무엇을 다루나요?</AccordionTrigger>
        <AccordionContent>
          React Query, RHF, Zod 등을 결합한 패턴과 UI 컴포넌트를 실험하는 Playground입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>코드는 어디서 볼 수 있나요?</AccordionTrigger>
        <AccordionContent>
          Work/Guide 탭과 Playground의 코드 복사 버튼을 참고하세요.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
