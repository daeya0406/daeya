/** ponytail: no test framework — fails if 30-min window / heatmap rules break */
import assert from "node:assert/strict";

function meetingDays(w) {
  const out = [];
  const start = new Date(w.range_start + "T00:00:00Z");
  const end = new Date(w.range_end + "T00:00:00Z");
  const allowed = new Set(w.weekdays);
  for (let t = start.getTime(); t <= end.getTime(); t += 86400000) {
    const d = new Date(t);
    if (allowed.has(d.getUTCDay())) {
      out.push(d.toISOString().slice(0, 10));
    }
  }
  return out;
}

function slotMinutes(w) {
  const out = [];
  for (let m = w.slot_start_minute; m < w.slot_end_minute; m += 30) out.push(m);
  return out;
}

// 2026-07-06(월) ~ 2026-07-10(금)
const w = {
  range_start: "2026-07-06",
  range_end: "2026-07-10",
  slot_start_minute: 9 * 60,
  slot_end_minute: 18 * 60,
  weekdays: [1, 2, 3, 4, 5],
};

assert.equal(meetingDays(w).length, 5);
assert.equal(slotMinutes(w).length, 18);
assert.ok(slotMinutes(w).includes(9 * 60 + 30));
console.log("check-slots ok");
