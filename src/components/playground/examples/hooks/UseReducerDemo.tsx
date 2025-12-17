'use client';

import { useReducer, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typo } from '@/components/ui/Text';

type Todo = { id: number; text: string; done: boolean };
type State = { count: number; todos: Todo[] };
type Action =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'reset' };

const initialState: State = { count: 0, todos: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 };
    case 'dec':
      return { ...state, count: state.count - 1 };
    case 'add':
      if (!action.text.trim()) return state;
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
      return initialState;
    default:
      return state;
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  return (
    <div className="space-y-4 rounded-lg border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">useReducer</p>
          <Typo.caption>state + action을 한곳에서 관리, dispatch로 명령 전달</Typo.caption>
        </div>
        <Badge variant="outline">dispatch</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-3 rounded-lg border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => dispatch({ type: 'dec' })}>
              -
            </Button>
            <Button size="sm" variant="outline" onClick={() => dispatch({ type: 'inc' })}>
              +
            </Button>
            <Button size="sm" onClick={() => dispatch({ type: 'reset' })}>
              reset
            </Button>
            <Typo.bodySm className="ml-auto text-slate-700 dark:text-slate-100">
              count: {state.count}
            </Typo.bodySm>
          </div>
          <Typo.caption className="text-slate-500">
            액션 객체에 따라 reducer가 상태를 계산. 로직이 한곳에 모여 테스트/확장이 쉬움
          </Typo.caption>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/60">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: 'add', text });
              setText('');
            }}
          >
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="할 일 추가"
            />
            <Button type="submit" size="sm">
              추가
            </Button>
          </form>
          <div className="space-y-1 text-sm text-slate-800 dark:text-slate-100">
            {state.todos.length === 0 && <p className="text-slate-500">아직 없음</p>}
            {state.todos.map((todo) => (
              <button
                key={todo.id}
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-slate-200/70 bg-white/80 px-3 py-2 text-left hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60"
                onClick={() => dispatch({ type: 'toggle', id: todo.id })}
              >
                <span className={todo.done ? 'line-through text-slate-400' : ''}>
                  {todo.text}
                </span>
                <Badge variant={todo.done ? 'secondary' : 'outline'}>
                  {todo.done ? 'done' : 'todo'}
                </Badge>
              </button>
            ))}
          </div>
          <Typo.caption className="text-slate-500">
            dispatch({`{ type: 'toggle', id }`}) 한 번으로 상태 계산/렌더까지 처리
          </Typo.caption>
        </div>
      </div>
    </div>
  );
}
