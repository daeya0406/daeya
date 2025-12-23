'use client';

import { useReducer, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

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
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
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
    <div className="border-border bg-depth-1 space-y-4 rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-semibold">useReducer</p>
          <Text.Caption>state + action을 한곳에서 관리, dispatch로 명령 전달</Text.Caption>
        </div>
        <Badge variant="outline">dispatch</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border-border bg-depth-2 space-y-3 rounded-lg border p-3">
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
            <Text.Body14 className="text-foreground ml-auto">count: {state.count}</Text.Body14>
          </div>
          <Text.Caption className="text-muted-foreground">
            액션 객체에 따라 reducer가 상태를 계산. 로직이 한곳에 모여 테스트/확장이 쉬움
          </Text.Caption>
        </div>

        <div className="border-border bg-depth-2 space-y-3 rounded-lg border p-3">
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
          <div className="text-foreground space-y-1 text-sm">
            {state.todos.length === 0 && <p className="text-muted-foreground">아직 없음</p>}
            {state.todos.map((todo) => (
              <button
                key={todo.id}
                type="button"
                className="border-border bg-depth-1 hover:border-primary/50 flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition"
                onClick={() => dispatch({ type: 'toggle', id: todo.id })}
              >
                <span className={todo.done ? 'text-muted-foreground line-through' : ''}>
                  {todo.text}
                </span>
                <Badge variant={todo.done ? 'default' : 'outline'}>
                  {todo.done ? 'done' : 'todo'}
                </Badge>
              </button>
            ))}
          </div>
          <Text.Caption className="text-muted-foreground">
            dispatch({`{ type: 'toggle', id }`}) 한 번으로 상태 계산/렌더까지 처리
          </Text.Caption>
        </div>
      </div>
    </div>
  );
}
