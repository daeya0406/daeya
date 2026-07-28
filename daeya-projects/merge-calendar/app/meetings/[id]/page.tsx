import { MeetingHostView } from "@/components/MeetingHostView";
import type { AttendeeInput } from "@/lib/heatmap";
import { createClient } from "@/lib/supabase/server";
import type { MeetingWindow } from "@/lib/slots";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: meeting } = await supabase
    .from("meetings")
    .select("*")
    .eq("id", id)
    .eq("host_id", user.id)
    .maybeSingle();

  if (!meeting) notFound();

  const { data: attendees } = await supabase
    .from("attendees")
    .select("*")
    .eq("meeting_id", id)
    .order("name");

  const attendeeIds = (attendees ?? []).map((a) => a.id);
  const { data: blocks } = attendeeIds.length
    ? await supabase.from("day_blocks").select("*").in("attendee_id", attendeeIds)
    : { data: [] as { attendee_id: string; day: string }[] };
  const { data: marks } = attendeeIds.length
    ? await supabase.from("slot_marks").select("*").in("attendee_id", attendeeIds)
    : {
        data: [] as {
          attendee_id: string;
          day: string;
          start_minute: number;
          mark: "unavail" | "pref";
        }[],
      };

  const inputs: AttendeeInput[] = (attendees ?? []).map((a) => {
    const dayBlocks = (blocks ?? [])
      .filter((b) => b.attendee_id === a.id)
      .map((b) => b.day);
    const markMap: AttendeeInput["marks"] = {};
    for (const m of marks ?? []) {
      if (m.attendee_id !== a.id) continue;
      markMap[`${m.day}|${m.start_minute}`] = m.mark;
    }
    return {
      id: a.id,
      name: a.name,
      role: a.role,
      status: a.status,
      dayBlocks,
      marks: markMap,
    };
  });

  const window: MeetingWindow = {
    range_start: meeting.range_start,
    range_end: meeting.range_end,
    slot_start_minute: meeting.slot_start_minute,
    slot_end_minute: meeting.slot_end_minute,
    weekdays: meeting.weekdays,
  };

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? `${proto}://${host}`;

  return (
    <MeetingHostView
      meetingId={meeting.id}
      title={meeting.title}
      inviteToken={meeting.invite_token}
      status={meeting.status}
      confirmedDay={meeting.confirmed_day}
      confirmedStartMinute={meeting.confirmed_start_minute}
      window={window}
      attendees={inputs}
      origin={origin}
      userLabel={user.email}
    />
  );
}
