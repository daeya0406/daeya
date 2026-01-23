import ObjectMethodsDemo from '../examples/js/ObjectMethodsDemo';
import ArrayMethodsDemo from '../examples/js/ArrayMethodsDemo';
import NullishPatternDemo from '../examples/js/NullishPatternDemo';
import TryCatchDemo from '../examples/js/TryCatchDemo';
import ThrottleDebounceDemo from '../examples/js/ThrottleDebounceDemo';
import ShallowDeepCopyDemo from '../examples/js/ShallowDeepCopyDemo';
import ClosureDemo from '../examples/js/ClosureDemo';
import ImmutabilityDemo from '../examples/js/ImmutabilityDemo';
import EventLoopDemo from '../examples/js/EventLoopDemo';
import ThisBindingDemo from '../examples/js/ThisBindingDemo';
import PromisePatternDemo from '../examples/js/PromisePatternDemo';
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
    code: `const nums = [1,2,3,4];
nums.map((n) => n * 2);          // [2,4,6,8]
nums.filter((n) => n % 2 === 0); // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 10
nums.find((n) => n % 2 === 0);   // 2
nums.every((n) => n > 0);        // true`,
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
