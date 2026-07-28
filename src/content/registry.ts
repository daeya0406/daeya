import { CAREER_TIMELINE } from './career';
import { FEATURED_HOBBY_TEASERS } from './hobby/teasers';
import { FEATURED_DESIGN_WORKS, DESIGN_WORKS } from './work/design';
import { FEATURED_FRONTEND_PROJECTS, FRONTEND_PROJECTS } from './work/frontend';
import { FEATURED_PUBLISHING_PROJECTS, PUBLISHING_PROJECTS } from './work/publishing';
import type { FeaturedWork, FrontendProject, WorkCategory } from './schema';

export function getFrontendProjects() {
  return FRONTEND_PROJECTS;
}

export function getFrontendProjectById(id: string) {
  return FRONTEND_PROJECTS.find((p) => p.id === id);
}

export function getFeaturedFrontendProjects() {
  return FEATURED_FRONTEND_PROJECTS;
}

export function getDesignWorks() {
  return DESIGN_WORKS;
}

export function getFeaturedDesignWorks() {
  return FEATURED_DESIGN_WORKS;
}

export function getPublishingProjects() {
  return PUBLISHING_PROJECTS;
}

export function getFeaturedPublishingProjects() {
  return FEATURED_PUBLISHING_PROJECTS;
}

export function getFeaturedHobbyTeasers() {
  return FEATURED_HOBBY_TEASERS;
}

export function getFeaturedWorks(limit = 6): FeaturedWork[] {
  const works: FeaturedWork[] = [
    ...FEATURED_FRONTEND_PROJECTS.map((item) => ({ category: 'frontend' as const, item })),
    ...FEATURED_DESIGN_WORKS.map((item) => ({ category: 'design' as const, item })),
    ...FEATURED_PUBLISHING_PROJECTS.map((item) => ({ category: 'publishing' as const, item })),
  ];
  return works.slice(0, limit);
}

export function getWorkByCategory(category: WorkCategory) {
  switch (category) {
    case 'frontend':
      return getFrontendProjects();
    case 'design':
      return getDesignWorks();
    case 'publishing':
      return getPublishingProjects();
  }
}

export function getCareerTimeline() {
  return CAREER_TIMELINE;
}

export function getCareerStats() {
  const entries = CAREER_TIMELINE.flatMap((group) => group.entries);
  return {
    years: 5,
    projects: entries.length,
    clients: new Set(entries.map((e) => e.client)).size,
    frontendProjects: FRONTEND_PROJECTS.length,
    publishingProjects: PUBLISHING_PROJECTS.length,
  };
}

export function getCareerChartData() {
  return CAREER_TIMELINE.map((group) => ({
    year: group.year,
    count: group.entries.length,
  })).reverse();
}

export function getAllCodeSnippets() {
  return FRONTEND_PROJECTS.flatMap((p) => p.codeSnippets ?? []);
}

export { type FrontendProject };
