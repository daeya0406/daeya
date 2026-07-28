/** Minimal product events — console for MVP; swap sink later. */
export type AnalyticsEvent =
  | "signup"
  | "login"
  | "core_action_success"
  | "core_action_fail";

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean | null | undefined>,
) {
  const payload = { event, ...props, ts: new Date().toISOString() };
  // ponytail: console sink; PostHog later
  console.info("[analytics]", JSON.stringify(payload));
}
