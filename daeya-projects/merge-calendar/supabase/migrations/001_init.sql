-- 일정 맞추기 MVP schema + RLS

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  range_start date not null,
  range_end date not null,
  -- minutes from midnight, 30-min aligned; end is exclusive
  slot_start_minute int not null check (slot_start_minute >= 0 and slot_start_minute < 1440),
  slot_end_minute int not null check (slot_end_minute > 0 and slot_end_minute <= 1440),
  -- 0=Sun … 6=Sat (JS getDay)
  weekdays int[] not null default '{1,2,3,4,5}',
  invite_token text not null unique default encode(gen_random_bytes(12), 'hex'),
  status text not null default 'collecting' check (status in ('collecting', 'confirmed')),
  confirmed_day date,
  confirmed_start_minute int,
  created_at timestamptz not null default now(),
  check (slot_end_minute > slot_start_minute),
  check (slot_start_minute % 30 = 0 and slot_end_minute % 30 = 0),
  check (range_end >= range_start)
);

create table public.attendees (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings (id) on delete cascade,
  name text not null,
  role text not null check (role in ('required', 'optional')),
  status text not null default 'pending' check (status in ('pending', 'submitted')),
  unique (meeting_id, name)
);

create table public.day_blocks (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid not null references public.attendees (id) on delete cascade,
  day date not null,
  unique (attendee_id, day)
);

create table public.slot_marks (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid not null references public.attendees (id) on delete cascade,
  day date not null,
  start_minute int not null check (start_minute >= 0 and start_minute < 1440 and start_minute % 30 = 0),
  mark text not null check (mark in ('unavail', 'pref')),
  unique (attendee_id, day, start_minute)
);

create index meetings_host_id_idx on public.meetings (host_id);
create index meetings_invite_token_idx on public.meetings (invite_token);
create index attendees_meeting_id_idx on public.attendees (meeting_id);
create index day_blocks_attendee_id_idx on public.day_blocks (attendee_id);
create index slot_marks_attendee_id_idx on public.slot_marks (attendee_id);

alter table public.profiles enable row level security;
alter table public.meetings enable row level security;
alter table public.attendees enable row level security;
alter table public.day_blocks enable row level security;
alter table public.slot_marks enable row level security;

-- profiles: own row only
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_upsert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- meetings: host only (attendee access via server service_role)
create policy "meetings_select_host" on public.meetings
  for select using (auth.uid() = host_id);
create policy "meetings_insert_host" on public.meetings
  for insert with check (auth.uid() = host_id);
create policy "meetings_update_host" on public.meetings
  for update using (auth.uid() = host_id);
create policy "meetings_delete_host" on public.meetings
  for delete using (auth.uid() = host_id);

-- attendees: via meeting host
create policy "attendees_select_host" on public.attendees
  for select using (
    exists (
      select 1 from public.meetings m
      where m.id = meeting_id and m.host_id = auth.uid()
    )
  );
create policy "attendees_insert_host" on public.attendees
  for insert with check (
    exists (
      select 1 from public.meetings m
      where m.id = meeting_id and m.host_id = auth.uid()
    )
  );
create policy "attendees_update_host" on public.attendees
  for update using (
    exists (
      select 1 from public.meetings m
      where m.id = meeting_id and m.host_id = auth.uid()
    )
  );
create policy "attendees_delete_host" on public.attendees
  for delete using (
    exists (
      select 1 from public.meetings m
      where m.id = meeting_id and m.host_id = auth.uid()
    )
  );

-- day_blocks / slot_marks: host can read; writes for attendees go through service_role on server
create policy "day_blocks_select_host" on public.day_blocks
  for select using (
    exists (
      select 1 from public.attendees a
      join public.meetings m on m.id = a.meeting_id
      where a.id = attendee_id and m.host_id = auth.uid()
    )
  );

create policy "slot_marks_select_host" on public.slot_marks
  for select using (
    exists (
      select 1 from public.attendees a
      join public.meetings m on m.id = a.meeting_id
      where a.id = attendee_id and m.host_id = auth.uid()
    )
  );

-- auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
