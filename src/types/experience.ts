export type Experience = {
  id: string;
  company: string;
  team: string | null;
  role: string;
  start_date: string; // ISO date end_date: string | null; // ISO date summary: string | null; highlights: string[]; skills: string[]; links: Record<string, unknown>; sort_order: number; is_public: boolean; created_at: string;
};
