import type { PlaygroundItem } from '@/types/playground';
import { GradientDemo } from '../examples/tailwind';

export const tailwind: PlaygroundItem[] = [
  {
    id: 'tailwind-globals',
    title: 'globals.css',
    tags: ['tailwind'],
    description: 'tailwind 세팅 꿀팁',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. 전체 흐름',
        code: `@import "tailwindcss";

@theme {            
  // 테마 정의 (디자인 시스템)
}
@layer base {       
  // 기본 스타일 - HTML 태그 기본값 (우선순위 하단 베이스)
}
@layer components { 
  // 컴포넌트 스타일 - 반복되는 UI 조각 (우선순위 중간)
}
@layer utilities {  
  // 유틸리티 스타일 - 아주 특수한 경우 (우선순위 가장 높음)
}`,
      },
      {
        label: '02. 상세 구조',
        code: `@import "tailwindcss";

@theme {
  /* 색상 추가(or 오버라이딩) */
  --color-primary: #3b82f6;
  --color-brand: #ff5a5f;
  
  /* 반응형 브레이크포인트 커스텀 */
  --breakpoint-tablet: 768px;
  --breakpoint-pc: 1280px;

  /* 수치 커스텀 (w-150 등을 쓸 수 있게) */
  --spacing-150: 37.5rem; /* 600px */
}

@layer base {
  body {
    @apply bg-white text-gray-900 antialiased;
  }
  
  h1 {
    @apply text-2xl font-bold;
  }
}

@layer components {
  .btn-base {
    @apply px-4 py-2 rounded-md transition-all active:scale-95;
  }
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, blue, purple);
    -webkit-background-clip: text;
    color: transparent;
  }
}`,
      },
    ],
  },
  {
    id: 'tailwind-utils',
    title: '클래스 병합 및 관리',
    tags: ['tailwind', 'setup'],
    description: '조건부 클래스 적용 시 발생하는 충돌을 방지하고 가독성을 높이는 설정',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. 패키지 설치',
        code: `npm i clsx tailwind-merge
# 또는
pnpm add clsx tailwind-merge`,
      },
      {
        label: '02. cn 유틸리티 함수 만들기 (lib/utils.ts)',
        code: `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
      {
        label: '03. 실무 사용 예시',
        code: `import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'ghost';
  className?: string;
}

export function Button({ variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={cn(
        // 기본 스타일
        "px-4 py-2 transition-colors",
        
        // 조건부 스타일 (가독성 향상)
        variant === 'primary' && "bg-blue-500 text-white hover:bg-blue-600",
        variant === 'ghost' && "bg-transparent border border-gray-300",
        
        // 외부에서 주입된 추가 클래스 (중복 발생 시 twMerge가 해결)
        className
      )}
    >
      Click Me
    </button>
  );
}`,
      },
    ],
  },
  {
    id: 'tailwind-advanced-state',
    title: 'group, peer, has',
    tags: ['group', 'peer', 'has-[:]'],
    description: '부모, 형제, 자식 요소에 따라 제어',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. 부모/형제 상태 감지 (Group & Peer)',
        code: `/* 부모 hover 시 자식 변경 (group) */
<div className="group border p-4 hover:bg-gray-50">
  <p className="group-hover:text-blue-500">마우스 올리면 변함</p>
</div>

/* 형제 상태 감지 (peer) */
<input type="checkbox" className="peer" id="chk" />
<label htmlFor="chk" className="peer-checked:text-blue-600">체크되면 글자색 변경</label>`,
      },
      {
        label: '02. 자식 상태로 부모 제어 (has-[:])',
        code: `/* 내부에 체크박스가 체크되면 부모인 div 전체 배경 변경 */
<div className="has-[:checked]:bg-blue-50 border p-4">
  <input type="checkbox" />
  <span>자식이 체크되면 내가 변해!</span>
</div>`,
      },
    ],
  },
  {
    id: 'tailwind-gradient',
    title: '그라디언트 활용',
    tags: ['tailwind'],
    description: '그라디언트 활용 정리',
    categories: ['tailwind'],
    demo: <GradientDemo />,
    codes: [
      {
        label: '01. 배경 그라디언트',
        code: `<span className="h-6 w-6 rounded-full bg-linear-to-tr from-[#096cde] from-30% to-[#ddf1ff]" />`,
      },
      {
        label: '02. 텍스트 그라디언트',
        code: `<span className="bg-linear-to-r from-[#15c064] from-20% to-[#00d1ff] to-90% bg-clip-text px-1 text-4xl font-bold leading-[1.1] text-transparent">
  Text Gradient
</span>`,
      },
    ],
  },
  // {
  //   id: 'tailwind-basic',
  //   title: '제목',
  //   tags: ['tailwind'],
  //   description: '내용',
  //   categories: ['tailwind'],
  //   code: `코드`,
  // },
];
