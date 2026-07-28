"use server";

import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/server";
import { isValidSlot, MAX_WINDOW_MINUTES, type MeetingWindow } from "@/lib/slots";
import { redirect } from "next/navigation";

export type CreateMeetingInput = {
  title: string;
  range_start: string;
  range_end: string;
  slot_start_minute: number;
  slot_end_minute: number;
  weekdays: number[];
  attendees: { name: string; role: "required" | "optional" }[];
};

export async function createMeeting(input: CreateMeetingInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    track("core_action_fail", { action: "create_meeting", reason: "no_session" });
    return { error: "로그인이 필요해요" };
  }

  const title = input.title.trim();
  if (!title) return { error: "회의 이름을 입력해주세요" };
  if (!input.attendees.length) return { error: "참석자를 한 명 이상 추가해주세요" };
  if (input.attendees.some((a) => !a.name.trim())) {
    return { error: "참석자 이름을 입력해주세요" };
  }
  if (input.slot_end_minute <= input.slot_start_minute) {
    return { error: "끝나는 시간은 시작보다 늦어야 해요" };
  }
  const span = input.slot_end_minute - input.slot_start_minute;
  if (span > MAX_WINDOW_MINUTES) {
    return { error: "하루 가능 시간은 최대 10시간까지예요" };
  }
  if (input.weekdays.length === 0) return { error: "요일을 하나 이상 선택해주세요" };

  const { data: meeting, error } = await supabase
    .from("meetings")
    .insert({
      host_id: user.id,
      title,
      range_start: input.range_start,
      range_end: input.range_end,
      slot_start_minute: input.slot_start_minute,
      slot_end_minute: input.slot_end_minute,
      weekdays: input.weekdays,
    })
    .select("id, invite_token")
    .single();

  if (error || !meeting) {
    track("core_action_fail", { action: "create_meeting", reason: error?.message });
    return { error: error?.message ?? "회의 생성에 실패했어요" };
  }

  const { error: attErr } = await supabase.from("attendees").insert(
    input.attendees.map((a) => ({
      meeting_id: meeting.id,
      name: a.name.trim(),
      role: a.role,
    })),
  );

  if (attErr) {
    track("core_action_fail", { action: "create_meeting", reason: attErr.message });
    return { error: attErr.message };
  }

  track("core_action_success", { action: "create_meeting" });
  redirect(`/meetings/${meeting.id}`);
}

export async function confirmSlot(meetingId: string, day: string, startMinute: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    track("core_action_fail", { action: "confirm_slot", reason: "no_session" });
    return { error: "로그인이 필요해요" };
  }

  const { data: meeting, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("id", meetingId)
    .eq("host_id", user.id)
    .single();

  if (error || !meeting) {
    track("core_action_fail", { action: "confirm_slot", reason: "not_found" });
    return { error: "회의를 찾을 수 없어요" };
  }

  const w: MeetingWindow = {
    range_start: meeting.range_start,
    range_end: meeting.range_end,
    slot_start_minute: meeting.slot_start_minute,
    slot_end_minute: meeting.slot_end_minute,
    weekdays: meeting.weekdays,
  };

  if (!isValidSlot(w, day, startMinute)) {
    return { error: "선택할 수 없는 시간이에요" };
  }

  const { error: upd } = await supabase
    .from("meetings")
    .update({
      status: "confirmed",
      confirmed_day: day,
      confirmed_start_minute: startMinute,
    })
    .eq("id", meetingId)
    .eq("host_id", user.id);

  if (upd) {
    track("core_action_fail", { action: "confirm_slot", reason: upd.message });
    return { error: upd.message };
  }

  track("core_action_success", { action: "confirm_slot" });
  return { ok: true };
}

export type SubmitAvailabilityInput = {
  token: string;
  name: string;
  dayBlocks: string[];
  marks: { day: string; startMinute: number; mark: "unavail" | "pref" }[];
};

/** Attendee path — invite token + name; uses SECURITY DEFINER RPCs (no service_role). */
export async function submitAvailability(input: SubmitAvailabilityInput) {
  try {
    const name = input.name.trim();
    if (!name) return { error: "이름을 입력해주세요" };

    const supabase = await createClient();
    const { data, error } = await supabase.rpc("submit_availability_by_invite", {
      p_token: input.token,
      p_name: name,
      p_day_blocks: input.dayBlocks,
      p_marks: input.marks.map((m) => ({
        day: m.day,
        start_minute: m.startMinute,
        mark: m.mark,
      })),
    });

    if (error) {
      track("core_action_fail", { action: "submit_availability", reason: error.message });
      const hint =
        error.message.includes("Could not find the function") ||
        error.message.includes("schema cache")
          ? " — Supabase SQL에 002_invite_rpc.sql을 실행해주세요"
          : "";
      return { error: `${error.message}${hint}` };
    }

    const result = data as { ok?: boolean; error?: string } | null;
    if (result?.error) {
      track("core_action_fail", { action: "submit_availability", reason: result.error });
      return { error: result.error };
    }

    track("core_action_success", { action: "submit_availability" });
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "제출 실패";
    track("core_action_fail", { action: "submit_availability", reason: msg });
    return { error: msg };
  }
}

export async function loadAvailability(token: string, name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("availability_by_invite", {
    p_token: token,
    p_name: name.trim(),
  });

  if (error) {
    const hint =
      error.message.includes("Could not find the function") ||
      error.message.includes("schema cache")
        ? " — Supabase SQL에 003_availability_rpc.sql을 실행해주세요"
        : "";
    return { error: `${error.message}${hint}` };
  }

  const payload =
    typeof data === "string" ? JSON.parse(data) : data;
  if (!payload || payload.error) {
    return { error: (payload?.error as string) ?? "불러오기 실패" };
  }

  const dayBlocks = Array.isArray(payload.day_blocks)
    ? (payload.day_blocks as string[]).map((d) =>
        typeof d === "string" ? d : String(d),
      )
    : [];

  const marks: Record<string, "unavail" | "pref"> = {};
  if (Array.isArray(payload.marks)) {
    for (const m of payload.marks as {
      day: string;
      start_minute: number;
      mark: "unavail" | "pref";
    }[]) {
      marks[`${m.day}|${m.start_minute}`] = m.mark;
    }
  }

  return {
    ok: true as const,
    meetingStatus: payload.meeting_status as string,
    attendeeStatus: payload.attendee_status as string,
    dayBlocks,
    marks,
  };
}

export async function loadMeetingByToken(token: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("meeting_by_invite", {
    p_token: token,
  });

  if (error) {
    console.error("[meeting_by_invite]", error.message);
    if (
      error.message.includes("Could not find the function") ||
      error.message.includes("schema cache")
    ) {
      throw new Error(
        "meeting_by_invite RPC가 없습니다. Supabase SQL Editor에서 002_invite_rpc.sql을 실행해주세요.",
      );
    }
    throw new Error(error.message);
  }
  if (!data) return null;

  const payload =
    typeof data === "string" ? (JSON.parse(data) as Record<string, unknown>) : data;

  const meeting = (payload as { meeting?: unknown }).meeting;
  const rawAttendees = (payload as { attendees?: unknown }).attendees;
  const attendees = Array.isArray(rawAttendees) ? rawAttendees : [];

  if (!meeting || typeof meeting !== "object") return null;

  return {
    meeting: meeting as {
      id: string;
      title: string;
      range_start: string;
      range_end: string;
      slot_start_minute: number;
      slot_end_minute: number;
      weekdays: number[];
      status: "collecting" | "confirmed";
      invite_token: string;
    },
    attendees: attendees as {
      id: string;
      name: string;
      role: string;
      status: string;
    }[],
  };
}

