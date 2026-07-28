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
    id: 'tailwind-fonts',
    title: 'font 설정',
    tags: ['fonts', 'google-fonts'],
    description: '구글 폰트와 로컬 폰트를 Tailwind에 통합하는 방법',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. 구글 폰트 추가하기',
        code: `/* globals.css */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@theme {
  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-display: 'Inter', system-ui, sans-serif;
}

/* 사용 예시 */
.text-sans { font-family: var(--font-family-sans); }
.text-display { font-family: var(--font-family-display); }`,
      },
      {
        label: '02. 로컬 폰트 추가하기',
        code: `/* globals.css */
@import "tailwindcss";

/* 로컬 폰트 정의 */
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@theme {
  --font-family-kr: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;
}`,
      },
      {
        label: '03. 폰트 확장 설정',
        code: `/* tailwind.config.js */
export default {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'kr': ['Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
      }
    }
  }
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
    id: 'tailwind-utils',
    title: 'cn 활용',
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
    id: 'tailwind-cva',
    title: 'cva 활용',
    tags: ['cva', 'design-system'],
    description: '타입 안전한 컴포넌트 변형 관리(Class Variance Authority)',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. CVA 설치 및 기본 설정',
        code: `npm i class-variance-authority
# 또는
pnpm add class-variance-authority`,
      },
      {
        label: '02. Button 컴포넌트 with CVA',
        code: `import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  // 기본 스타일 (항상 적용)
  "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      // variant 옵션들
      variant: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary:
          "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
        outline:
          "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      },
      // size 옵션들
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      // disabled 옵션
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    // 기본값 설정
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isDisabled = false,
  className,
}: ButtonProps) => {
  const buttonClasses = twMerge(
    // className은 속성을 특별하게 처리하여, variants에 정의되지 않아도 자동으로 클래스로 변환함
    clsx(buttonVariants({ variant, size, disabled: isDisabled, className }))
  );

  return (
    <button className={buttonClasses} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;`,
      },
      {
        label: '03. CVA 고급 활용 (Compound Variants)',
        code: `import { cva } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg border p-6 transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        destructive: "bg-red-50 border-red-200",
        success: "bg-green-50 border-green-200",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    // 복합 변형: 특정 조합일 때 추가 스타일
    compoundVariants: [
      {
        variant: "destructive",
        size: "lg",
        className: "border-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);`,
      },
    ],
  },
  {
    id: 'tailwind-variants',
    title: 'tv 활용',
    tags: ['tv', 'tailwind-variants', 'design-system'],
    description: 'Tailwind CSS에 최적화된 타입 안전한 컴포넌트 변형 및 슬롯 관리',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. tv 설치',
        code: `npm i tailwind-variants
# 또는
pnpm add tailwind-variants`,
      },
      {
        label: '02. Button 컴포넌트 with TV (기본 활용)',
        code: `import { tv, type VariantProps } from "tailwind-variants";

// tv는 내부에 twMerge와 clsx 기능이 포함되어 있어 별도 설정이 필요 없음
const button = tv({
  base: "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2",
  variants: {
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
      outline: "border border-gray-600 text-gray-600 hover:bg-gray-50",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

// TV는 타입을 추출하는 기능이 간편함
type ButtonVariants = VariantProps<typeof button>;
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, color, size, disabled, className }: ButtonProps) => {
  return (
    <button className={button({ color, size, disabled, className })}>
      {children}
    </button>
  );
};`,
      },
      {
        label: '03. 슬롯(Slots) 기능 활용 (고급 활용)',
        code: `import { tv } from "tailwind-variants";

// 하나의 컴포넌트 안에 여러 요소가 있을 때 각 부위별로 스타일을 정의 가능
const card = tv({
  slots: {
    base: "flex flex-col rounded-lg border bg-white shadow-sm",
    header: "flex items-center p-4 border-b",
    body: "p-6 text-gray-700",
    footer: "p-4 border-t bg-gray-50",
  },
  variants: {
    isHoverable: {
      true: {
        base: "hover:shadow-md transition-shadow cursor-pointer",
      },
    },
  },
});

const { base, header, body, footer } = card({ isHoverable: true });

/* 사용 예시:
<div className={base()}>
  <div className={header()}>제목</div>
  <div className={body()}>본문 내용</div>
  <div className={footer()}>버튼 영역</div>
</div>
*/`,
      },
    ],
  },
  {
    id: 'tailwind-plugins',
    title: '유용한 Tailwind 플러그인',
    tags: ['plugins', 'markdown', 'form', 'etc'],
    description: '실무에서 자주 사용하는 Tailwind 플러그인 모음',
    categories: ['tailwind'],
    codes: [
      {
        label: '01. 필수 플러그인 설치',
        code: `npm i -D @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio tailwindcss-animate
# 또는
pnpm add -D @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio tailwindcss-animate`,
      },
      {
        label: '02. tailwind.config.js 플러그인 설정',
        code: `export default {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
}`,
      },
      {
        label: '03. 플러그인 활용 예시',
        code: `/* Typography Plugin - 마크다운 스타일링 */
<article className="prose prose-lg prose-slate dark:prose-invert">
  <!-- 마크다운 콘텐츠 -->
</article>

/* Forms Plugin - 폼 스타일 자동화 */
<input type="text" className="form-input" />
<select className="form-select"></select>

/* Aspect Ratio Plugin - 비디오/이미지 비율 */
<div class="aspect-w-16 aspect-h-9">
  <iframe src="video.mp4"></iframe>
</div>

/* Animate Plugin - 애니메이션 확장 */
<div class="animate-pulse">로딩 중...</div>
<div class="animate-bounce">점프!</div>`,
      },
    ],
  },
  {
    id: 'tailwind-gradient',
    title: '그라디언트 활용',
    tags: ['gradient'],
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
];
