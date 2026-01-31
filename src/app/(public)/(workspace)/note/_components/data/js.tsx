import {
  ArrayMethodsDemo,
  ClosureDemo,
  EventLoopDemo,
  ImmutabilityDemo,
  NullishPatternDemo,
  ObjectMethodsDemo,
  PromisePatternDemo,
  ShallowDeepCopyDemo,
  ThisBindingDemo,
  ThrottleDebounceDemo,
  TryCatchDemo,
} from '../examples/js';
import type { PlaygroundItem } from '@/types/playground';

export const jsItems: PlaygroundItem[] = [
  {
    id: 'object-methods',
    title: '객체 메서드',
    tags: ['Object'],
    description: 'keys/values/entries/fromEntries/assign',
    categories: ['js'],
    demo: <ObjectMethodsDemo />,
    code: `const user = { id: 1, name: 'Daeya' };
Object.keys(user);        // ['id','name']
Object.entries(user);     // [['id',1],['name','Daeya']]
Object.assign(...user, { active: true });
Object.fromEntries(Object.entries(user));`,
  },
  {
    id: 'array-methods',
    title: '배열 메서드',
    tags: ['Array'],
    description: 'map / filter / reduce / find / every',
    categories: ['js'],
    demo: <ArrayMethodsDemo />,
    codes: [
      {
        label: '01. basic',
        code: `const nums = [1,2,3,4];
nums.map((n) => n * 2);          // [2,4,6,8]
nums.filter((n) => n % 2 === 0); // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 10
nums.find((n) => n % 2 === 0);   // 2
nums.every((n) => n > 0);        // true`,
      },
      {
        label: '02. map',
        code: `// 기본 구조
Array.map((현재값) => {
  return 변환된값;
});

// 단위 붙이기
const prices = [1000, 2000, 3000];
const priceText = prices.map(price => price + '원');

// React에서 상태값 가공
setList(list.map(item => ({
  ...item,
  isActive: true
})));`,
      },
      {
        label: '03. filter',
        code: `// 기본 구조
Array.filter((현재값) => {
  return true 또는 false;
});

// 특정 조건만 남기기
const nums = [1, 2, 3, 4, 5];
const evenNums = nums.filter(n => n % 2 === 0);

// 활성 데이터만 추출
const list = [
  { id: 1, isActive: true },
  { id: 2, isActive: false },
  { id: 3, isActive: true },
];
const activeList = list.filter(item => item.isActive);

// 검색 결과 필터링
const products = [
  { name: 'apple' },
  { name: 'banana' },
  { name: 'grape' },
];
const result = products.filter(item =>
  item.name.includes('a')
);

// 권한에 따른 메뉴 노출
const menus = [
  { name: '관리자', role: 'admin' },
  { name: '마이페이지', role: 'user' },
];
const userMenus = menus.filter(menu => menu.role !== 'admin');
`,
      },
      {
        label: '04. reduce',
        code: `// 기본 구조
Array.reduce((누적값, 현재값) => {
  return 계산;
}, 초기값)

// 마스킹 처리
const phone = '01012345678';
phone.slice(0, 3) + '****' + phone.slice(-4);

// 확장자 분리
const file = 'image.profile.png';
const ext = file.slice(file.lastIndexOf('.') + 1);

// 입력 제한
if (value.length > 100) {
  setValue(value.slice(0, 100));
}`,
      },
    ],
  },
  {
    id: 'nullish-pattern',
    title: '조건 처리',
    tags: ['??', '||', '&&', '? :'],
    description: 'null/undefined vs 빈 문자열 vs 값 존재를 버튼으로 전환하며 fallback 확인',
    categories: ['js'],
    demo: <NullishPatternDemo />,
    code: `const scenarios = {
  nullable: { name: 'Daeya', role: null, city: undefined, coupon: 'SPRING' },
  emptyString: { name: '', role: '', city: '', coupon: '' },
  full: { name: 'Jeongdae', role: 'admin', city: 'Seoul', coupon: 'VIP' },
};

const [scene, setScene] = useState<keyof typeof scenarios>('nullable');
const user = scenarios[scene];

const role = user.role ?? 'guest';              // null/undefined → guest
const city = user.city || 'Unknown';            // falsy → Unknown
const coupon = user.coupon && \`\${user.coupon} 사용\`; // truthy일 때만 실행
const greeting = user.name ? \`Hello, \${user.name}!\` : 'None!';`,
  },
  {
    id: 'async-loop',
    title: '비동기 흐름 / 이벤트 루프',
    tags: ['Async'],
    description: '마이크로태스크/매크로태스크 순서 체험',
    categories: ['js'],
    demo: <EventLoopDemo />,
    code: `queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise.then'));
setTimeout(() => console.log('setTimeout 0ms'), 0);
console.log('sync');`,
  },
  {
    id: 'closure',
    title: '클로저',
    tags: ['Closure'],
    description: '함수 스코프에 값 캡처하기',
    categories: ['js'],
    demo: <ClosureDemo />,
    code: `function createCounter() {
  let count = 0;
  return () => ++count;
}

const counterA = createCounter();
const counterB = createCounter();

counterA(); // 1
counterA(); // 2
counterB(); // 1 (독립)`,
  },
  {
    id: 'immutability',
    title: '불변성',
    tags: ['State'],
    description: '불변 업데이트 패턴',
    categories: ['js'],
    demo: <ImmutabilityDemo />,
    code: `const base = [{id:1,done:false},{id:2,done:true}];
const toggled = base.map(t => t.id === 1 ? {...t, done: !t.done} : t);
const appended = [...base, { id: 3, done: false }];
// base는 그대로, toggled/appended는 새 배열`,
  },
  {
    id: 'this-binding',
    title: 'this 정리',
    tags: ['this'],
    description: 'this 바인딩 규칙 정리',
    categories: ['js'],
    demo: <ThisBindingDemo />,
    code: `const obj = { value: 42, getThis() { return this.value; } };
const arrowHolder = { value: 100, getThis: () => obj.value };
const bound = obj.getThis.bind({ value: 7 });

obj.getThis();        // 42 (obj)
arrowHolder.getThis();// 42 (상위 obj 캡처)
bound();              // 7 (bind)`,
  },
  {
    id: 'try-catch',
    title: 'try ... catch',
    tags: ['Error'],
    description: 'try/catch/finally 기본 패턴',
    categories: ['js'],
    demo: <TryCatchDemo />,
    code: `try {
  const result = JSON.parse('{ "ok": true }');
  console.log('성공', result);
} catch (err) {
  console.error('에러', err);
} finally {
  // 정리 작업
}`,
  },
  {
    id: 'debounce',
    title: 'Throttle vs Debounce',
    tags: ['Utility'],
    description: '입력 지연 vs 주기적 실행 비교',
    categories: ['js'],
    demo: <ThrottleDebounceDemo />,
    code: `// debounce
const debounced = debounce(fn, 400);
// throttle
const throttled = throttle(fn, 400);`,
  },
  {
    id: 'promise-pattern',
    title: 'Promise 패턴',
    tags: ['Promise'],
    description: '병렬/직렬/타임아웃 레이스',
    categories: ['js'],
    demo: <PromisePatternDemo />,
    code: `Promise.all([fetchA(), fetchB()]);           // 병렬
for (const task of tasks) await task();      // 직렬
Promise.race([task(), timeout(5000)]);       // 타임아웃`,
  },
  {
    id: 'shallow-deep',
    title: '얕은 복사 vs 깊은 복사',
    tags: ['Copy'],
    description: '참조 공유 여부 확인',
    categories: ['js'],
    demo: <ShallowDeepCopyDemo />,
    code: `const shallow = { ...obj };              // 중첩 참조 공유
const deep = structuredClone(obj);       // 중첩까지 새로 생성
 
// 얕은 복사 예시
const [shallow, setShallow] = useState({ ...base });
const pushShallow = () => {
    shallow.tags.push('next');
    setShallow({ ...shallow });
  };

// 깊은 복사 예시
const [deep, setDeep] = useState(structuredClone(base));
const pushDeep = () => {
  const next = structuredClone(deep);
  next.tags.push('next');
  setDeep(next);
};`,
  },
];
