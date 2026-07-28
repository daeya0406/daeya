import { loadMeetingByToken } from "@/app/actions";
import { RespondFlow } from "@/components/RespondFlow";
import { PhoneShell } from "@/components/ui";
import type { MeetingWindow } from "@/lib/slots";
import Link from "next/link";

export default async function RespondPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let data = null;
  let loadError: string | null = null;
  try {
    data = await loadMeetingByToken(token);
  } catch (e) {
    loadError = e instanceof Error ? e.message : "불러오기 실패";
  }

  if (!data) {
    return (
      <PhoneShell title="일정 입력">
        <h2 className="text-[22px] font-bold">링크를 열 수 없어요</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-toss-muted">
          회의를 찾을 수 없거나, Supabase에 초대용 SQL(
          <code className="text-[13px]">002_invite_rpc.sql</code>)이 아직 없을 수
          있어요.
        </p>
        {loadError ? (
          <p className="mt-3 text-[13px] text-toss-red">{loadError}</p>
        ) : null}
        <Link href="/" className="mt-8 inline-block font-semibold text-toss-blue">
          홈으로
        </Link>
      </PhoneShell>
    );
  }

  const window: MeetingWindow = {
    range_start: data.meeting.range_start,
    range_end: data.meeting.range_end,
    slot_start_minute: data.meeting.slot_start_minute,
    slot_end_minute: data.meeting.slot_end_minute,
    weekdays: data.meeting.weekdays,
  };

  return (
    <RespondFlow
      token={token}
      title={data.meeting.title}
      window={window}
      attendees={data.attendees}
      meetingStatus={data.meeting.status}
    />
  );
}
