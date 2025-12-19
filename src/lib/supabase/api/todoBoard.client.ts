'use client';
import { supabase } from '@/lib/supabase';
import type { Task, TaskStatus } from '@/types/task';
import type { TaskItem } from '@/types/taskItem';
export type TodoBoardData = { tasks: Task[]; items: TaskItem[] };
export async function fetchTodoBoard(): Promise<TodoBoardData> {
  const [tasksRes, itemsRes] = await Promise.all([
    supabase
      .from('tasks')
      .select('id,title,status,sort_order,tags,due_date,is_public,created_at,updated_at')
      .eq('is_public', true)
      .order('status', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('task_items')
      .select('id,task_id,title,done,sort_order,created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ]);
  if (tasksRes.error) throw new Error(tasksRes.error.message);
  if (itemsRes.error) throw new Error(itemsRes.error.message);
  return { tasks: (tasksRes.data ?? []) as Task[], items: (itemsRes.data ?? []) as TaskItem[] };
}
export async function createTaskCard(params: {
  title: string;
  status: TaskStatus;
  sort_order: number;
}) {
  const { error } = await supabase
    .from('tasks')
    .insert({
      title: params.title,
      status: params.status,
      sort_order: params.sort_order,
      tags: [],
      is_public: true,
    });
  if (error) throw new Error(error.message);
}
export async function deleteTaskCard(id: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
export async function addTaskItem(params: { taskId: string; title: string; sort_order: number }) {
  const { error } = await supabase
    .from('task_items')
    .insert({
      task_id: params.taskId,
      title: params.title,
      sort_order: params.sort_order,
      done: false,
    });
  if (error) throw new Error(error.message);
}
export async function toggleTaskItemDone(params: { id: string; done: boolean }) {
  const { error } = await supabase
    .from('task_items')
    .update({ done: params.done })
    .eq('id', params.id);
  if (error) throw new Error(error.message);
}
