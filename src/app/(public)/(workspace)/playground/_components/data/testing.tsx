import type { PlaygroundItem } from '@/types/playground';

const CustomButton = () => {
  return <button>Custom Button</button>;
};

export { CustomButton };

export const testingItems: PlaygroundItem[] = [
  {
    id: 'jest-setup',
    title: 'Jest 설치 및 설정',
    tags: ['Jest', 'Testing'],
    description: 'Jest 테스트 환경 설정하기',
    categories: ['testing'],
    codes: [
      {
        label: '설치',
        code: `npm install --save-dev jest @types/jest`,
      },
      {
        label: 'package.json 설정',
        code: `{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}`,
      },
      {
        label: 'jest.config.js',
        code: `module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
};`,
      },
    ],
  },
  {
    id: 'jest-basic-test',
    title: '기본 테스트 작성',
    tags: ['Jest', 'Testing'],
    description: 'Jest의 기본 문법과 테스트 작성 방법',
    categories: ['testing'],
    codes: [
      {
        label: '함수 테스트 예시',
        code: `function sum(a, b) {
  return a + b;
}

describe('sum 함수', () => {
  test('두 수를 더한 결과를 반환해야 함', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('음수도 더할 수 있어야 함', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});`,
      },
      {
        label: '다양한 Matcher 사용',
        code: `describe('Matcher 예시', () => {
  test('toBe - 정확한 값 비교', () => {
    expect(2 + 2).toBe(4);
  });

  test('toEqual - 객체 비교', () => {
    const user = { name: 'John', age: 30 };
    expect(user).toEqual({ name: 'John', age: 30 });
  });

  test('toContain - 배열 포함 확인', () => {
    expect([1, 2, 3]).toContain(2);
  });

  test('toBeTruthy / toBeFalsy', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });

  test('toThrow - 에러 발생 확인', () => {
    expect(() => {
      throw new Error('에러!');
    }).toThrow('에러!');
  });
});`,
      },
    ],
  },
  {
    id: 'aaa-pattern',
    title: 'AAA 패턴',
    tags: ['Jest', 'Testing'],
    description: 'Arrange(준비) → Act(실행) → Assert(검증) 패턴으로 테스트 코드 구조화하기',
    categories: ['testing'],
    codes: [
      {
        label: '기본 예제',
        code: `function add(a, b) {
  return a + b;
}

test('두 수를 더한 결과를 반환한다', () => {
  // Arrange: 테스트에 필요한 값 준비
  const a = 2;
  const b = 3;

  // Act: 테스트 대상 함수 실행
  const result = add(a, b);

  // Assert: 결과 검증
  expect(result).toBe(5);
});`,
      },
      {
        label: 'React 컴포넌트 예제',
        code: `import { render, screen } from '@testing-library/react';
import Counter from './Counter';

test('버튼 클릭 시 카운트가 증가한다', () => {
  // Arrange: 컴포넌트 렌더링 및 요소 선택
  render(<Counter initialCount={0} />);
  const button = screen.getByRole('button', { name: '증가' });
  const count = screen.getByRole('status');

  // Act: 사용자 행동 수행
  fireEvent.click(button);

  // Assert: 결과 검증
  expect(count).toHaveTextContent('1');
});`,
      },
    ],
  },
  {
    id: 'jest-async-test',
    title: 'Async 테스트',
    tags: ['Jest', 'Testing', 'Async'],
    description: 'Promise와 async/await 테스트 방법',
    categories: ['testing'],
    codes: [
      {
        label: 'Promise 테스트',
        code: `function fetchUser(id) {
  return Promise.resolve({ id, name: 'John' });
}

describe('fetchUser', () => {
  test('Promise 반환 테스트', () => {
    return fetchUser(1).then(user => {
      expect(user.name).toBe('John');
    });
  });

  test('resolves matcher 사용', () => {
    return expect(fetchUser(1)).resolves.toEqual({
      id: 1,
      name: 'John'
    });
  });
});`,
      },
      {
        label: 'async/await 테스트',
        code: `describe('async/await 테스트', () => {
  test('async 함수 테스트', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
  });

  test('reject 처리', async () => {
    await expect(fetchUser(-1)).rejects.toThrow();
  });
});`,
      },
    ],
  },
  {
    id: 'jest-mock-test',
    title: 'Mock 함수 사용',
    tags: ['Jest', 'Testing', 'Mock'],
    description: '함수 호출 추적 및 Mock 데이터 사용',
    categories: ['testing'],
    codes: [
      {
        label: 'Mock 함수 기본',
        code: `describe('Mock 함수', () => {
  test('mock 함수 호출 확인', () => {
    const mockFn = jest.fn();
    
    mockFn('hello');
    mockFn('world');

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith('hello');
  });

  test('mock 함수 반환값 설정', () => {
    const mockFn = jest.fn().mockReturnValue(42);
    
    expect(mockFn()).toBe(42);
  });
});`,
      },
      {
        label: 'Module Mock',
        code: `// api.js
export function fetchData() {
  // 실제 API 호출
}

// api.test.js
jest.mock('./api');
import { fetchData } from './api';

describe('API Mock', () => {
  test('mock된 API 테스트', () => {
    fetchData.mockResolvedValue({ data: 'mocked' });
    
    return expect(fetchData()).resolves.toEqual({ data: 'mocked' });
  });
});`,
      },
    ],
  },
  {
    id: 'test-coverage',
    title: '테스트 커버리지',
    tags: ['Jest', 'Testing', 'Coverage'],
    description: '테스트가 코드를 얼마나 검증하는지 측정하기',
    categories: ['testing'],
    codes: [
      {
        label: '커버리지 확인 명령어',
        code: `# 커버리지 리포트 생성
npm run test:coverage

# 터미널에 표 형태로 출력되며
# coverage/lcov-report/index.html을 브라우저로 열어 상세 리포트 확인 가능`,
      },
      {
        label: '커버리지 설정 (package.json)',
        code: `{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.js",
      "!src/**/*.d.ts",
      "!**/node_modules/**"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}`,
      },
      {
        label: '커버리지 유형별 설명',
        code: `// 구문 커버리지 (Statements)
function getDiscount(price, isMember) {
  let discount = 0; // 구문 1
  if (isMember) {
    discount = price * 0.1; // 구문 2
  }
  return price - discount; // 구문 3
}
// isMember=false로만 테스트 → 67% (2/3)

// 분기 커버리지 (Branch)
function getLabel(score) {
  if (score >= 90) {
    return "A"; // true 분기
  } else {
    return "B"; // false 분기
  }
}
// score=95로만 테스트 → 50% (true만 실행)

// 함수 커버리지 (Functions)
function add(a, b) { return a + b; } // 호출됨
function subtract(a, b) { return a - b; } // 호출 안 됨
// 50% (1/2)

// 라인 커버리지 (Lines)
const x = 1; // 라인 1
const y = 2; // 라인 2
const z = x + y; // 라인 3
// 실행된 라인 / 전체 라인으로 계산`,
      },
    ],
  },
  {
    id: 'tdd-approach',
    title: 'TDD (테스트 주도 개발)',
    tags: ['TDD', 'Testing', 'Best Practice'],
    description: '테스트를 먼저 작성하고 코드를 구현하는 개발 방법론',
    categories: ['testing'],
    codes: [
      {
        label: 'Red - 실패하는 테스트 작성',
        code: `// add.test.js
const { add } = require('./add');

test('두 수를 더한 결과를 반환한다', () => {
  expect(add(2, 3)).toBe(5);
});
// ❌ add.js가 없어서 테스트 실패 (Red)`,
      },
      {
        label: 'Green - 최소한의 코드 작성',
        code: `// add.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
// ✅ 테스트 통과 (Green)`,
      },
      {
        label: 'Refactor - 코드 개선',
        code: `// 테스트가 계속 통과하는 상태에서 개선
// - 가독성 향상
// - 성능 최적화
// - 중복 코드 제거

// 테스트가 깨지면 리팩토링 중 실수가 생긴 것
// → 즉시 수정하고 진행`,
      },
      {
        label: 'TDD 사이클 순서',
        code: `1. Red: 실패하는 테스트 작성
   → 구현할 기능의 명세를 테스트로 정의

2. Green: 최소한의 코드로 통과시키기
   → 테스트를 만족하는 가장 단순한 구현

3. Refactor: 코드 개선
   → 테스트가 계속 통과하며 코드 품질 향상

이 사이클을 반복하면 자연스럽게 테스트 커버리지가 높아짐`,
      },
    ],
  },
  {
    id: 'react-testing-library-intro',
    title: 'RTL',
    tags: ['RTL', 'React', 'Testing'],
    description: 'React 컴포넌트를 사용자 관점에서 테스트하는 라이브러리(React Testing Library)',
    categories: ['testing'],
    codes: [
      {
        label: 'RTL 설치',
        code: `npm install -D jest @types/jest jest-environment-jsdom \\
  @testing-library/react @testing-library/dom \\
  @testing-library/jest-dom ts-node`,
      },
      {
        label: 'jest.config.ts 설정',
        code: `import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;`,
      },
      {
        label: 'jest.setup.ts 설정',
        code: `// jest.setup.ts
import '@testing-library/jest-dom';

// @testing-library/jest-dom의 커스텀 매처를 전역으로 등록
// 모든 테스트에서 toBeInTheDocument() 등을 바로 사용 가능`,
      },
      {
        label: 'RTL의 핵심 철학',
        code: `// ❌ 나쁜 예: 내부 구현 기반 테스트
test('카운터', () => {
  render(<Counter />);
  const { getByState } = screen;
  expect(getByState('count')).toBe(0);
});

// ✅ 좋은 예: 사용자 관점의 테스트
test('카운터 버튼 클릭 시 숫자가 증가한다', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: '증가' });
  const display = screen.getByRole('status');
  
  fireEvent.click(button);
  expect(display).toHaveTextContent('1');
});

// RTL은 '사용자가 보고 상호작용하는 방식'에 집중`,
      },
    ],
  },
  {
    id: 'rtl-render-screen',
    title: 'RTL: 렌더링, 화면 조회',
    tags: ['RTL', 'React', 'Testing'],
    description: '컴포넌트 렌더링과 DOM 조회 방법',
    categories: ['testing'],
    codes: [
      {
        label: 'render() 함수',
        code: `import { render } from '@testing-library/react';
import Button from './Button';

test('버튼이 렌더링된다', () => {
  // 컴포넌트를 가상 DOM(jsdom)에 마운트
  render(<Button label="확인" />);
});

test('Provider를 사용하는 컴포넌트', () => {
  render(<ThemedButton />, {
    wrapper: ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
  });
});`,
      },
      {
        label: 'screen 객체',
        code: `import { render, screen } from '@testing-library/react';

test('화면 조회', () => {
  render(<Greeting name="홍길동" />);

  // screen은 render된 DOM 전체를 대상으로 조회
  const heading = screen.getByText('안녕하세요, 홍길동!');
  expect(heading).toBeInTheDocument();
});

// 추천: render 반환값이 아닌 screen을 사용하자
// ❌ const { getByText } = render(<Component />);
// ✅ const text = screen.getByText('...');`,
      },
    ],
  },
  {
    id: 'rtl-query-functions',
    title: 'RTL: 쿼리 함수',
    tags: ['RTL', 'React', 'Testing'],
    description: 'DOM 요소를 찾는 다양한 쿼리 방법',
    categories: ['testing'],
    codes: [
      {
        label: '쿼리 함수 비교',
        code: `import { screen } from '@testing-library/react';

// getBy... : 요소가 없으면 에러 throw, 여러 개면 에러
screen.getByRole('button', { name: '제출' });

// queryBy... : 요소가 없으면 null 반환 (존재하지 않음을 검증할 때)
screen.queryByRole('dialog'); // null이면 테스트 통과

// findBy... : async/await 필요, 비동기 대기 (동적 로딩 요소)
await screen.findByRole('status');`,
      },
      {
        label: 'getByRole (가장 권장)',
        code: `import { render, screen } from '@testing-library/react';

test('버튼을 role로 찾기', () => {
  render(
    <div>
      <h1>회원가입</h1>
      <button>제출</button>
      <button>취소</button>
    </div>,
  );

  // role과 name으로 특정 요소를 찾음
  expect(screen.getByRole('heading', { name: '회원가입' }))
    .toBeInTheDocument();
  expect(screen.getByRole('button', { name: '제출' }))
    .toBeInTheDocument();
});`,
      },
      {
        label: 'getByText',
        code: `import { screen } from '@testing-library/react';

test('텍스트로 요소 찾기', () => {
  render(<button>제출</button>);

  // 문자열: 완전 일치
  expect(screen.getByText('제출')).toBeInTheDocument();

  // 정규식: 부분 일치 (대소문자 무시)
  expect(screen.getByText(/제출/i)).toBeInTheDocument();
});`,
      },
      {
        label: 'getByLabelText',
        code: `import { screen } from '@testing-library/react';

test('레이블로 입력 필드 찾기', () => {
  render(
    <form>
      <label htmlFor="email">이메일</label>
      <input id="email" type="email" />
    </form>,
  );

  // label 텍스트로 연결된 input을 직접 찾음
  const emailInput = screen.getByLabelText('이메일');
  expect(emailInput).toBeInTheDocument();
});`,
      },
      {
        label: 'queryByRole (존재하지 않음 검증)',
        code: `import { screen } from '@testing-library/react';

test('모달이 닫혀 있을 때', () => {
  render(<Modal isOpen={false} />);

  // 요소가 없으면 null 반환
  // 존재하지 않음을 검증할 때는 queryBy... 사용
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('모달이 열려 있을 때', () => {
  render(<Modal isOpen={true} />);

  // 요소가 있으면 getBy... 사용
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});`,
      },
    ],
  },
  {
    id: 'rtl-dom-matchers',
    title: 'RTL: DOM 매처',
    tags: ['RTL', 'React', 'Testing'],
    description: '@testing-library/jest-dom이 제공하는 DOM 검증 매처',
    categories: ['testing'],
    codes: [
      {
        label: 'toBeInTheDocument',
        code: `import { render, screen } from '@testing-library/react';

test('요소가 DOM에 존재하는가', () => {
  render(<h1>안녕하세요</h1>);

  // 요소가 존재하는지 검증
  expect(screen.getByText('안녕하세요')).toBeInTheDocument();
});

test('요소가 없는가', () => {
  render(<Form />);

  // 요소가 없음을 검증
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});`,
      },
      {
        label: 'toHaveTextContent',
        code: `import { screen } from '@testing-library/react';

test('요소의 텍스트 검증', () => {
  render(<CartBadge count={3} />);

  const badge = screen.getByRole('status');

  // 부분 일치
  expect(badge).toHaveTextContent('3');
  expect(badge).toHaveTextContent('3개');

  // 정규식으로 완전 일치
  expect(badge).toHaveTextContent(/^3개$/);
});`,
      },
      {
        label: 'toHaveClass',
        code: `import { screen } from '@testing-library/react';

test('CSS 클래스 검증', () => {
  render(<Tab label="홈" isActive={true} />);

  const tab = screen.getByRole('tab', { name: '홈' });

  // 특정 클래스 보유 확인
  expect(tab).toHaveClass('active');
  
  // 여러 클래스 동시 검증
  expect(tab).toHaveClass('tab', 'active');

  // 클래스가 없음을 검증
  expect(tab).not.toHaveClass('disabled');
});`,
      },
      {
        label: 'toBeDisabled & toBeChecked',
        code: `import { screen } from '@testing-library/react';

test('버튼 활성화 상태 검증', () => {
  render(<SignupForm agreed={false} />);

  const submitButton = screen.getByRole('button', { name: '가입하기' });
  expect(submitButton).toBeDisabled();
});

test('체크박스 선택 상태 검증', () => {
  render(<NotificationSettings defaultChecked={true} />);

  const checkbox = screen.getByRole('checkbox', {
    name: '이메일 알림 수신',
  });
  expect(checkbox).toBeChecked();
  
  // 선택되지 않음 검증
  expect(checkbox).not.toBeChecked();
});`,
      },
    ],
  },
  {
    id: 'rtl-events',
    title: 'RTL: 이벤트 발생',
    tags: ['RTL', 'React', 'Testing'],
    description: 'fireEvent와 userEvent로 사용자 상호작용 시뮬레이션',
    categories: ['testing'],
    codes: [
      {
        label: 'fireEvent.click',
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('버튼 클릭 시 카운트 증가', () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: '증가' });
  const count = screen.getByRole('status');

  expect(count).toHaveTextContent('0');

  fireEvent.click(button);
  expect(count).toHaveTextContent('1');

  fireEvent.click(button);
  expect(count).toHaveTextContent('2');
});`,
      },
      {
        label: 'fireEvent.change (input 입력)',
        code: `import { render, screen, fireEvent } from '@testing-library/react';

test('이름 입력 시 입력값 반영', () => {
  render(<NameInput />);

  const input = screen.getByRole('textbox', { name: '이름' });
  
  // input 값 변경
  fireEvent.change(input, { target: { value: '홍길동' } });

  expect(input).toHaveValue('홍길동');
});`,
      },
      {
        label: 'fireEvent.submit & 기타 이벤트',
        code: `import { render, screen, fireEvent } from '@testing-library/react';

test('폼 제출', () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: '로그인' });
  fireEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test('키보드 이벤트', () => {
  render(<Modal isOpen={true} />);

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Escape 키 누름
  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('마우스 이벤트', () => {
  render(<Tooltip content="도움말" />);

  const trigger = screen.getByRole('button');

  // 마우스 진입 (hover)
  fireEvent.mouseEnter(trigger);
  expect(screen.getByText('도움말')).toBeInTheDocument();

  // 마우스 이탈
  fireEvent.mouseLeave(trigger);
  expect(screen.queryByText('도움말')).not.toBeInTheDocument();
});`,
      },
      {
        label: 'fireEvent 메서드 정리',
        code: `// fireEvent 주요 메서드

fireEvent.click(element)
// → click 이벤트 발생, 버튼/링크 클릭

fireEvent.change(element, { target: { value } })
// → change 이벤트, input/select/textarea 값 변경

fireEvent.input(element, { target: { value } })
// → input 이벤트, onChange 트리거

fireEvent.submit(element)
// → submit 이벤트, 폼 제출

fireEvent.focus(element)
// → focus 이벤트, 요소에 포커스

fireEvent.blur(element)
// → blur 이벤트, 포커스 해제

fireEvent.keyDown(element, { key, code })
fireEvent.keyUp(element, { key, code })
// → 키보드 이벤트

fireEvent.mouseEnter(element)
fireEvent.mouseLeave(element)
// → 마우스 이벤트`,
      },
    ],
  },
];
