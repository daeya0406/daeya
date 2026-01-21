-- Portfolio schema (public read, admin write)
-- Run in Supabase SQL editor.
--
-- Assumptions:
-- - You already have `auth.users`
-- - You have `public.profiles` with columns: `id uuid primary key` and `role text`
--   and the authenticated user can read their own profile row.
--
-- Policy strategy:
-- - Anyone (anon) can SELECT rows where `is_public = true`
-- - Only authenticated users with `profiles.role = 'admin'` can INSERT/UPDATE/DELETE

-- =========================
-- Experiences (career cards)
-- =========================
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  team text,
  role text not null,
  start_date date not null,
  end_date date,
  summary text,
  highlights text[] not null default '{}',
  skills text[] not null default '{}',
  links jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.experiences enable row level security;

drop policy if exists "experiences_public_read" on public.experiences;
create policy "experiences_public_read"
on public.experiences
for select
to anon, authenticated
using (is_public = true);

drop policy if exists "experiences_admin_write" on public.experiences;
create policy "experiences_admin_write"
on public.experiences
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

-- ==============
-- Tasks (kanban)
-- ==============
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null check (status in ('todo', 'doing', 'done')),
  sort_order int not null default 0,
  tags text[] not null default '{}',
  due_date date,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_status_sort_idx on public.tasks (status, sort_order);

alter table public.tasks enable row level security;

drop policy if exists "tasks_public_read" on public.tasks;
create policy "tasks_public_read"
on public.tasks
for select
to anon, authenticated
using (is_public = true);

drop policy if exists "tasks_admin_write" on public.tasks;
create policy "tasks_admin_write"
on public.tasks
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

-- ======================
-- Task items (checklist)
-- ======================
create table if not exists public.task_items (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists task_items_task_id_sort_idx on public.task_items (task_id, sort_order);
create index if not exists task_items_task_id_done_idx on public.task_items (task_id, done);

alter table public.task_items enable row level security;

drop policy if exists "task_items_public_read" on public.task_items;
create policy "task_items_public_read"
on public.task_items
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.tasks t
    where t.id = task_items.task_id
      and t.is_public = true
  )
);

drop policy if exists "task_items_admin_write" on public.task_items;
create policy "task_items_admin_write"
on public.task_items
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

-- =========================
-- Study posts (table/blog)
-- =========================
create table if not exists public.study_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  category text not null,
  tags text[] not null default '{}',
  source text not null default 'note',
  url text,
  published_at date not null default (now()::date),
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists study_posts_published_idx on public.study_posts (published_at desc);

alter table public.study_posts enable row level security;

drop policy if exists "study_posts_public_read" on public.study_posts;
create policy "study_posts_public_read"
on public.study_posts
for select
to anon, authenticated
using (is_public = true);

drop policy if exists "study_posts_admin_write" on public.study_posts;
create policy "study_posts_admin_write"
on public.study_posts
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

-- =========================
-- Cards (existing table)
-- =========================
-- This project already uses `cards` in `/work?tab=cards`.
-- If cards are stuck in "loading" or show RLS errors, ensure policies exist.

alter table public.cards enable row level security;

-- Performance: cards list queries order by `created_at`.
create index if not exists cards_created_at_idx on public.cards (created_at desc);

drop policy if exists "cards_public_read" on public.cards;
create policy "cards_public_read"
on public.cards
for select
to anon, authenticated
using (true);

drop policy if exists "cards_admin_write" on public.cards;
create policy "cards_admin_write"
on public.cards
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);
