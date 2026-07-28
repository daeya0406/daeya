import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  role: z.string(),
  email: z.string().email(),
  links: z.object({
    github: z.string().url(),
    resume: z.string(),
    publishingPortfolio: z.string(),
    pdChallenge: z.string().url(),
    playgroundOrg: z.string().url(),
  }),
  career: z.object({
    total: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      fallback: z.string(),
    }),
    frontend: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      value: z.string(),
    }),
    publishing: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      value: z.string(),
    }),
  }),
});

export const careerEntrySchema = z.object({
  period: z.string(),
  client: z.string(),
  project: z.string(),
  role: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
});

export const careerYearSchema = z.object({
  year: z.string(),
  entries: z.array(careerEntrySchema),
});

export const projectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const projectCaseStudySchema = z.object({
  overview: z.string().optional(),
  goals: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  architecture: z.array(z.string()).optional(),
  challenges: z
    .array(
      z.object({
        title: z.string(),
        detail: z.string(),
        code: z.string().optional(),
      })
    )
    .optional(),
  outcomes: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  learnings: z.array(z.string()).optional(),
});

export const frontendProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  metrics: z.array(projectMetricSchema),
  role: z.string().optional(),
  period: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  links: z.object({
    caseStudy: z.string().optional(),
    github: z.string().optional(),
    live: z.string().optional(),
  }),
  featured: z.boolean().optional(),
  codeSnippets: z.array(z.string()).optional(),
  caseStudy: projectCaseStudySchema.optional(),
});

export const publishingProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  client: z.string(),
  period: z.string(),
  image: z.string().optional(),
  detailUrl: z.string(),
  featured: z.boolean().optional(),
});

export const designWorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  links: z.object({
    prototype: z.string().optional(),
    github: z.string().optional(),
    guide: z.string().optional(),
  }),
  featured: z.boolean().optional(),
  process: z.array(z.string()).optional(),
});

export const hobbyTeaserSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  href: z.string(),
  category: z.enum(['playground', 'note']),
  featured: z.boolean().optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type CareerEntry = z.infer<typeof careerEntrySchema>;
export type CareerYear = z.infer<typeof careerYearSchema>;
export type FrontendProject = z.infer<typeof frontendProjectSchema>;
export type PublishingProject = z.infer<typeof publishingProjectSchema>;
export type DesignWork = z.infer<typeof designWorkSchema>;
export type HobbyTeaser = z.infer<typeof hobbyTeaserSchema>;

export type WorkCategory = 'frontend' | 'design' | 'publishing';

export type FeaturedWork =
  | { category: 'frontend'; item: FrontendProject }
  | { category: 'design'; item: DesignWork }
  | { category: 'publishing'; item: PublishingProject };
