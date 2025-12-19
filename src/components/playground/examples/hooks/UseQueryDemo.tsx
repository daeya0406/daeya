'use client';

import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type TodoSummary = {
  total: number;
  done: Todo[];
  pending: Todo[];
};

const fetchTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    { id: 1, title: 'queryKey로 캐싱', done: true },
    { id: 2, title: 'select로 데이터 정제', done: false },
    { id: 3, title: 'staleTime 설정', done: false },
  ];
};

export default function UseQueryDemo() {
  const { data, isPending, isFetching, refetch, error } = useQuery<Todo[], Error, TodoSummary>({
    queryKey: ['todos', 'demo'],
    queryFn: fetchTodos,
    staleTime: 1000 * 30,
    select: (todos) => ({
      total: todos.length,
      done: todos.filter((todo) => todo.done),
      pending: todos.filter((todo) => !todo.done),
    }),
  });

  return (
    <div className="space-y-3 rounded-lg border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">useQuery</p>
          <Text.Caption>queryKey / select / staleTime 예시</Text.Caption>
        </div>
        <Badge variant={isFetching ? 'default' : 'outline'}>{isFetching ? 'fetching' : 'idle'}</Badge>
      </div>

      {isPending && <Text.Caption className="text-slate-500">로딩 중...</Text.Caption>}
      {error && <Text.Caption className="text-rose-500">에러: {error.message}</Text.Caption>}

      {data && (
        <div className="space-y-1 text-sm">
          <p className="font-medium text-slate-900 dark:text-slate-100">총 {data.total}건</p>
          <p className="text-slate-600 dark:text-slate-300">
            완료: {data.done.map((todo) => todo.title).join(', ') || '없음'}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            대기: {data.pending.map((todo) => todo.title).join(', ') || '없음'}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => refetch()}>
          수동 refetch
        </Button>
        <Text.Caption className="text-slate-500">staleTime 동안 캐시 유지</Text.Caption>
      </div>
    </div>
  );
}
