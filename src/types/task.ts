export type TaskStatus = 'todo' | 'doing' | 'done';
export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  sort_order: number;
  tags: string[];
  due_date: string | null; // ISO date is_public: boolean; created_at: string; updated_at: string;
};
