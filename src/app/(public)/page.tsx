import { HomeHero, HomeProjects, HomeCta } from '@/app/(public)/_components';

export default function HomePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <HomeHero />
      <HomeProjects />
      <HomeCta />
    </div>
  );
}
