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
    "test:watch": "jest --watch"
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
    tags: ['Jest', 'Testing', 'Best Practice'],
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
];
