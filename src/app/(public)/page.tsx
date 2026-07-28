import {
  HomeCareerSection,
  HomeCta,
  HomeHero,
  HomeHobbyTeaser,
  HomeWorkPreview,
} from '@/app/(public)/_components/HomeSections';

export default function HomePage() {
  return (
    <div className="space-y-20 py-4 lg:space-y-32 lg:py-8">
      <HomeHero />
      <HomeWorkPreview />
      <HomeCareerSection />
      <HomeHobbyTeaser />
      <HomeCta />
    </div>
  );
}
