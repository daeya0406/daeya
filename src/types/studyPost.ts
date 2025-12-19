export type StudyPost = {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  tags: string[];
  source: string;
  url: string | null;
  published_at: string; // ISO date is_public: boolean; created_at: string;
};
