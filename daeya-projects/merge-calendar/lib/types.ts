export type MeetingRow = {
  id: string;
  host_id: string;
  title: string;
  range_start: string;
  range_end: string;
  slot_start_minute: number;
  slot_end_minute: number;
  weekdays: number[];
  invite_token: string;
  status: "collecting" | "confirmed";
  confirmed_day: string | null;
  confirmed_start_minute: number | null;
};

export type AttendeeRow = {
  id: string;
  meeting_id: string;
  name: string;
  role: "required" | "optional";
  status: "pending" | "submitted";
};
