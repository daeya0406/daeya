import ToggleHookDemo from '../examples/hooks/ToggleHookDemo';
import UseEffectDependencyDemo from '../examples/hooks/UseEffectDependencyDemo';
import UseStateDemo from '../examples/hooks/UseStateDemo';
import UseReducerDemo from '../examples/hooks/UseReducerDemo';
import UseMemoDemo from '../examples/hooks/UseMemotDemo';
import UseRefDemo from '../examples/hooks/UseRefDemo';
import type { PlaygroundItem } from '@/types/playground';
import ZustandCounterDemo from '../examples/hooks/ZustandCounterDemo';

export const hookItems: PlaygroundItem[] = [
  {
    id: 'use-state-basic',
    title: 'useState',
    tags: ['Hooks', 'State'],
    description: '컨트롤드 인풋 + 목록 추가, 무거운 초기값은 lazy initializer로 1회만',
    categories: ['hooks'],
    demo: <UseStateDemo />,
    code: `const [text, setText] = useState('');
const [names, setNames] = useState(['홍길동']);
const [heavy, setHeavy] = useState(() => heavyInit()); // 최초 렌더 1회만 실행

const add = () => {
  if (!text.trim()) return;
  setNames((prev) => [text, ...prev]);
  setText('');
};

return (
  <>
    <input value={text} onChange={(e) => setText(e.target.value)} />
    <button onClick={add}>추가</button>
    <p>{names.join(', ')}</p>
    <button onClick={() => setHeavy(heavyInit())}>무거운 연산 다시 실행</button>
  </>
);`,
  },
  {
    id: 'use-reducer',
    title: 'useReducer',
    tags: ['Hooks', 'Reducer'],
    description: 'state + action을 한곳에서 관리, dispatch로 명령 전달',
    categories: ['hooks'],
    demo: <UseReducerDemo />,
    code: `type State = { count: number; todos: { id: number; text: string; done: boolean }[] };
type Action =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 };
    case 'dec':
      return { ...state, count: state.count - 1 };
    case 'add':
      return {
        ...state,
        todos: [{ id: Date.now(), text: action.text, done: false }, ...state.todos],
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case 'reset':
      return { count: 0, todos: [] };
    default:
      return state;
  }
}

const initial: State = { count: 0, todos: [] };
const [state, dispatch] = useReducer(reducer, initial);

dispatch({ type: 'inc' });
dispatch({ type: 'add', text: '새 할 일' });
dispatch({ type: 'toggle', id: 1 });`,
  },
  {
    id: 'use-effect-deps',
    title: 'useEffect',
    tags: ['Hooks', 'Effect'],
    description: '렌더마다 / 마운트 1회 / deps 변경 시 / 타이머 cleanup 흐름 비교',
    categories: ['hooks'],
    demo: <UseEffectDependencyDemo />,
    code: `const [count, setCount] = useState(0);
const [text, setText] = useState('');

useEffect(() => {
  console.log('렌더마다 실행 (마운트 + 업데이트)');
});

useEffect(() => {
  console.log('마운트 1회만 실행');
  return () => console.log('언마운트 시 cleanup');
}, []);

useEffect(() => {
  console.log('count가 바뀔 때만 실행', count);
}, [count]);

useEffect(() => {
  console.log('text가 바뀔 때만 실행', text);
}, [text]);

useEffect(() => {
  if (!running) return;
  const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(timer); // deps가 바뀔 때마다 정리
}, [running]);`,
  },
  {
    id: 'use-memo',
    title: 'useMemo',
    tags: ['Hooks', 'Memoization'],
    description: '값이 변할 때만 무거운 계산 재실행, 나머지 렌더는 캐시 사용',
    categories: ['hooks'],
    demo: <UseMemoDemo />,
    code: `// 수정 전 : 상태가 바뀔 때마다 무거운 연산이 매번 실행됨
const hardSum = ... ;
    
// 수정 후 : useMemo로 연산 결과를 캐싱해줄 것(useMemo(() => {}, [deps]) 로 감싸주면 됨)
const hardSum = useMemo(() => {
  ...
}, [deps]);

// 이렇게하면 렌더링마다 실행되지 않기 때문에 쉬운 계산기에 영향이 가지 않음.`,
  },
  {
    id: 'use-ref',
    title: 'useRef',
    tags: ['Hooks', 'Ref'],
    description: 'DOM 직접 참조 / 렌더링 없이 값 저장',
    categories: ['hooks'],
    demo: <UseRefDemo />,
    code: `// DOM 직접 제어: ref 없으면 focus/값 삽입이 불편
const inputRef = useRef<HTMLInputElement>(null);
// const 돔요소Ref = useRef<HTML돔요소Element>(초기값); -> DOM 참조할땐 항상 이렇게 됨
const focus = () => inputRef.current?.focus();
const fill = () => { if (inputRef.current) inputRef.current.value = 'ref로 삽입'; };

// 렌더 없이 값 저장: ref는 변해도 렌더 X, 필요할 때만 state로 동기화
const silentRef = useRef(0);
const [visible, setVisible] = useState(0); // 렌더링 시켜서 값 확인용
const add = () => { silentRef.current += 1; }; // 렌더 X
const sync = () => setVisible(silentRef.current); // 이때만 렌더`,
  },
  {
    id: 'use-toggle',
    title: 'useToggle',
    tags: ['Hook', 'State'],
    description: '불리언 상태를 간단히 토글/설정',
    categories: ['hooks'],
    demo: <ToggleHookDemo />,
    code: `function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback((next?: boolean) => {
    if (typeof next === 'boolean') return setValue(next);
    setValue((v) => !v);
  }, []);
  return { value, toggle, setValue };
}`,
  },
  {
    id: 'zustand-basic',
    title: 'Zustand',
    tags: ['State', 'Zustand'],
    description: 'create로 간단한 카운터 스토어 만들기',
    categories: ['hooks'],
    demo: <ZustandCounterDemo />,
    code: `import { create } from 'zustand';

type CounterStore = { count: number; increase: () => void; reset: () => void };

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

// 사용
const { count, increase, reset } = useCounterStore();`,
  },
];
