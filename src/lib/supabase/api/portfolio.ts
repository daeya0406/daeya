import { supabasePublicServer } from '@/lib/supabase/publicServer';
import type { Experience } from '@/types/experience';
import type { Task } from '@/types/task';
import type { StudyPost } from '@/types/studyPost';
export async function getPublicExperiences(): Promise<Experience[]> {
  const supabase = supabasePublicServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_public', true)
    .order('sort_order', { ascending: true })
    .order('start_date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Experience[];
}
export async function getPublicTasks(): Promise<Task[]> {
  const supabase = supabasePublicServer();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('is_public', true)
    .order('status', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Task[];
}
export async function getPublicStudyPosts(limit = 20): Promise<StudyPost[]> {
  const supabase = supabasePublicServer();
  const { data, error } = await supabase
    .from('study_posts')
    .select('*')
    .eq('is_public', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as StudyPost[];
}
