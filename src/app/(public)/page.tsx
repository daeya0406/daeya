import { getPublicExperiences, getPublicStudyPosts } from '@/lib/supabase/api/portfolio';
import { FadeUp } from '@/shared/motion/FadeUp';
import { HomeHero, HomeStats, HomeProjects, HomeWhy, HomeCta } from '@/app/(public)/_components';

export default async function HomePage() {
  await Promise.allSettled([getPublicExperiences(), getPublicStudyPosts(5)]);

  return (
    <div className="space-y-16 lg:space-y-24">
      <FadeUp>
        <HomeHero />
      </FadeUp>

      <FadeUp delay={0.1}>
        <HomeStats />
      </FadeUp>

      <HomeProjects />
      <HomeWhy />
      <HomeCta />
    </div>
  );
}
