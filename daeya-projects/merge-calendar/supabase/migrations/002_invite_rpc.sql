-- Invite link access without service_role (anon can call these RPCs only)

create or replace function public.meeting_by_invite(p_token text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.meetings%rowtype;
  atts json;
begin
  select * into m from public.meetings where invite_token = p_token;
  if not found then
    return null;
  end if;

  select coalesce(json_agg(json_build_object(
    'id', a.id,
    'name', a.name,
    'role', a.role,
    'status', a.status
  ) order by a.name), '[]'::json)
  into atts
  from public.attendees a
  where a.meeting_id = m.id;

  return json_build_object(
    'meeting', json_build_object(
      'id', m.id,
      'title', m.title,
      'range_start', m.range_start,
      'range_end', m.range_end,
      'slot_start_minute', m.slot_start_minute,
      'slot_end_minute', m.slot_end_minute,
      'weekdays', m.weekdays,
      'status', m.status,
      'invite_token', m.invite_token
    ),
    'attendees', atts
  );
end;
$$;

revoke all on function public.meeting_by_invite(text) from public;
grant execute on function public.meeting_by_invite(text) to anon, authenticated;

create or replace function public.submit_availability_by_invite(
  p_token text,
  p_name text,
  p_day_blocks date[],
  p_marks jsonb -- [{day, start_minute, mark}]
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.meetings%rowtype;
  a public.attendees%rowtype;
  rec jsonb;
  d date;
  sm int;
  mk text;
begin
  select * into m from public.meetings where invite_token = p_token;
  if not found then
    return json_build_object('error', '유효하지 않은 링크예요');
  end if;
  if m.status = 'confirmed' then
    return json_build_object('error', '이미 확정된 회의예요');
  end if;

  select * into a from public.attendees
  where meeting_id = m.id and name = trim(p_name);
  if not found then
    return json_build_object('error', '참석 명단에 없는 이름이에요');
  end if;

  delete from public.day_blocks where attendee_id = a.id;
  delete from public.slot_marks where attendee_id = a.id;

  if p_day_blocks is not null then
    foreach d in array p_day_blocks loop
      if d between m.range_start and m.range_end
         and extract(dow from d)::int = any (m.weekdays) then
        insert into public.day_blocks (attendee_id, day) values (a.id, d);
      end if;
    end loop;
  end if;

  if p_marks is not null then
    for rec in select * from jsonb_array_elements(p_marks)
    loop
      d := (rec->>'day')::date;
      sm := (rec->>'start_minute')::int;
      mk := rec->>'mark';
      if mk in ('unavail', 'pref')
         and d between m.range_start and m.range_end
         and extract(dow from d)::int = any (m.weekdays)
         and sm >= m.slot_start_minute and sm < m.slot_end_minute
         and sm % 30 = 0 then
        insert into public.slot_marks (attendee_id, day, start_minute, mark)
        values (a.id, d, sm, mk);
      end if;
    end loop;
  end if;

  update public.attendees set status = 'submitted' where id = a.id;
  return json_build_object('ok', true);
end;
$$;

revoke all on function public.submit_availability_by_invite(text, text, date[], jsonb) from public;
grant execute on function public.submit_availability_by_invite(text, text, date[], jsonb) to anon, authenticated;
