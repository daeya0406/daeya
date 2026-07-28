-- Load one attendee's existing marks for re-edit

create or replace function public.availability_by_invite(p_token text, p_name text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.meetings%rowtype;
  a public.attendees%rowtype;
  blocks json;
  marks json;
begin
  select * into m from public.meetings where invite_token = p_token;
  if not found then
    return json_build_object('error', '유효하지 않은 링크예요');
  end if;

  select * into a from public.attendees
  where meeting_id = m.id and name = trim(p_name);
  if not found then
    return json_build_object('error', '참석 명단에 없는 이름이에요');
  end if;

  select coalesce(json_agg(d.day), '[]'::json)
  into blocks
  from public.day_blocks d
  where d.attendee_id = a.id;

  select coalesce(json_agg(json_build_object(
    'day', s.day,
    'start_minute', s.start_minute,
    'mark', s.mark
  )), '[]'::json)
  into marks
  from public.slot_marks s
  where s.attendee_id = a.id;

  return json_build_object(
    'ok', true,
    'meeting_status', m.status,
    'attendee_status', a.status,
    'day_blocks', blocks,
    'marks', marks
  );
end;
$$;

revoke all on function public.availability_by_invite(text, text) from public;
grant execute on function public.availability_by_invite(text, text) to anon, authenticated;
