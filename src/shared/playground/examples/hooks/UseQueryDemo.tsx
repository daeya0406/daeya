'use client';

import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

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
    <div className="space-y-3 rounded-lg border border-border bg-depth-1 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">useQuery</p>
          <span className="text-xs tracking-[0.01em]">
            queryKey / select / staleTime 예시
          </span>
        </div>
        <Badge variant={isFetching ? 'default' : 'outline'}>{isFetching ? 'fetching' : 'idle'}</Badge>
      </div>

      {isPending && (
        <span className="text-xs tracking-[0.01em] text-muted-foreground">로딩 중...</span>
      )}
      {error && (
        <span className="text-xs tracking-[0.01em] text-[rgb(var(--status-danger))]">
          에러: {error.message}
        </span>
      )}

      {data && (
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">총 {data.total}건</p>
          <p className="text-muted-foreground">
            완료: {data.done.map((todo) => todo.title).join(', ') || '없음'}
          </p>
          <p className="text-muted-foreground">
            대기: {data.pending.map((todo) => todo.title).join(', ') || '없음'}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => refetch()}>
          수동 refetch
        </Button>
        <span className="text-xs tracking-[0.01em] text-muted-foreground">
          staleTime 동안 캐시 유지
        </span>
      </div>
    </div>
  );
}
