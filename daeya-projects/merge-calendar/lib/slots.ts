/** 30-min slot helpers. Minutes from midnight. */

/** 하루 조율 창 최대 길이 (시간). 그리드가 너무 길어지지 않게. */
export const MAX_WINDOW_HOURS = 10;
export const MAX_WINDOW_MINUTES = MAX_WINDOW_HOURS * 60;

export type MeetingWindow = {
  range_start: string; // YYYY-MM-DD
  range_end: string;
  slot_start_minute: number;
  slot_end_minute: number;
  weekdays: number[]; // 0=Sun … 6=Sat
};

export function parseDateUTC(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function formatDateUTC(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Days in range that match weekdays filter. */
export function meetingDays(w: MeetingWindow): string[] {
  const out: string[] = [];
  const start = parseDateUTC(w.range_start);
  const end = parseDateUTC(w.range_end);
  const allowed = new Set(w.weekdays);
  for (let t = start.getTime(); t <= end.getTime(); t += 86400000) {
    const d = new Date(t);
    if (allowed.has(d.getUTCDay())) out.push(formatDateUTC(d));
  }
  return out;
}

/** Half-hour starts in [slot_start, slot_end). */
export function slotMinutes(w: MeetingWindow): number[] {
  const out: number[] = [];
  for (let m = w.slot_start_minute; m < w.slot_end_minute; m += 30) {
    out.push(m);
  }
  return out;
}

/** Hour labels for UI (unique hours that appear in the window). */
export function hourLabels(w: MeetingWindow): number[] {
  const hours = new Set<number>();
  for (const m of slotMinutes(w)) hours.add(Math.floor(m / 60));
  return [...hours].sort((a, b) => a - b);
}

export function minuteLabel(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}:${String(min).padStart(2, "0")}`;
}

export function isValidSlot(w: MeetingWindow, day: string, startMinute: number): boolean {
  if (!meetingDays(w).includes(day)) return false;
  if (startMinute % 30 !== 0) return false;
  return startMinute >= w.slot_start_minute && startMinute < w.slot_end_minute;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export function dayHeader(isoDate: string): string {
  const d = parseDateUTC(isoDate);
  return `${DAY_NAMES[d.getUTCDay()]}\n${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
}

export function dayShort(isoDate: string): string {
  const d = parseDateUTC(isoDate);
  return DAY_NAMES[d.getUTCDay()];
}
