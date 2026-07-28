import type { MeetingWindow } from "./slots";
import { isValidSlot, meetingDays, slotMinutes } from "./slots";

export type AttendeeRole = "required" | "optional";
export type Mark = "ok" | "pref" | "unavail";

export type AttendeeInput = {
  id: string;
  name: string;
  role: AttendeeRole;
  status: "pending" | "submitted";
  dayBlocks: string[]; // ISO dates
  marks: Record<string, Mark>; // `${day}|${startMinute}` → mark (only pref/unavail stored; missing = ok)
};

export type CellKind =
  | "best" // 전원 가능
  | "coord" // 선택 불가 또는 비선호 — 뱃지
  | "blocked" // 필수 불가 / ok < 3
  | "empty"; // 혼재·복잡 → 빈 칸 (겹쳐보기)

export type HeatCell = {
  day: string;
  startMinute: number;
  kind: CellKind;
  badges: { name: string; tone: "unavail" | "pref"; required: boolean }[];
  selectable: boolean;
};

function markOf(a: AttendeeInput, day: string, startMinute: number): Mark {
  if (a.dayBlocks.includes(day)) return "unavail";
  return a.marks[`${day}|${startMinute}`] ?? "ok";
}

/** Prototype heatmap-rules condensed for MVP. */
export function buildHeatmap(
  w: MeetingWindow,
  attendees: AttendeeInput[],
): HeatCell[] {
  const submitted = attendees.filter((a) => a.status === "submitted");
  const days = meetingDays(w);
  const mins = slotMinutes(w);
  const cells: HeatCell[] = [];

  // 제출 0명이면 집계하지 않음 (호출측에서 empty state 권장)
  if (submitted.length === 0) return cells;

  for (const day of days) {
    for (const startMinute of mins) {
      if (!isValidSlot(w, day, startMinute)) continue;

      const states = submitted.map((a) => ({
        a,
        mark: markOf(a, day, startMinute),
      }));

      const requiredUnavail = states.filter(
        (s) => s.a.role === "required" && s.mark === "unavail",
      );
      const optionalUnavail = states.filter(
        (s) => s.a.role === "optional" && s.mark === "unavail",
      );
      const prefs = states.filter((s) => s.mark === "pref");
      const oks = states.filter((s) => s.mark === "ok");

      let kind: CellKind;
      const badges: HeatCell["badges"] = [];

      // 프로토타입 "ok < 3"은 제출이 충분할 때만. 소수 제출이면 전원 ok면 best.
      const tooFewOk =
        submitted.length >= 3 && oks.length < 3;

      if (requiredUnavail.length > 0 || tooFewOk) {
        kind = "blocked";
      } else if (states.every((s) => s.mark === "ok")) {
        kind = "best";
      } else if (optionalUnavail.length > 0 && prefs.length === 0) {
        kind = "coord";
        for (const s of optionalUnavail.slice(0, 1)) {
          badges.push({ name: s.a.name, tone: "unavail", required: false });
        }
      } else if (optionalUnavail.length === 0 && prefs.length > 0 && prefs.length <= 2) {
        kind = "coord";
        for (const s of prefs.slice(0, 2)) {
          badges.push({
            name: s.a.name,
            tone: "pref",
            required: s.a.role === "required",
          });
        }
      } else if (optionalUnavail.length > 0 && prefs.length > 0) {
        kind = "empty";
      } else if (prefs.length >= 3) {
        kind = "empty";
      } else {
        kind = "empty";
      }

      cells.push({
        day,
        startMinute,
        kind,
        badges,
        selectable: kind === "best" || kind === "coord",
      });
    }
  }
  return cells;
}

export function layerColor(
  attendees: AttendeeInput[],
  activeIds: Set<string>,
  day: string,
  startMinute: number,
): "ok" | "pref" | "unavail" | "none" {
  const active = attendees.filter(
    (a) => activeIds.has(a.id) && a.status === "submitted",
  );
  if (active.length === 0) return "none";
  // 불가 > 비선호 > 가능
  let worst: Mark = "ok";
  for (const a of active) {
    const m = markOf(a, day, startMinute);
    if (m === "unavail") return "unavail";
    if (m === "pref") worst = "pref";
  }
  return worst;
}
