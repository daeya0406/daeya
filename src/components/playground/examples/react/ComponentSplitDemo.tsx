'use client';
import { Badge } from '@/components/ui/Badge';

type Profile = {
  name: string;
  role: string;
  tags: string[];
};

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="section-component">
      <p className="text-lg font-normal font-semibold text-foreground dark:text-foreground">
        {profile.name}
      </p>
      <span className="text-xs tracking-[0.01em] text-muted-foreground dark:text-muted-foreground">
        {profile.role}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ComponentSplitDemo() {
  const profiles: Profile[] = [
    { name: 'Daeya', role: 'Frontend', tags: ['React', 'FE'] },
    { name: 'Jeongdae', role: 'Publisher', tags: ['Figma', 'UI•UX'] },
  ];

  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2">
        {profiles.map((p) => (
          <ProfileCard key={p.name} profile={p} />
        ))}
      </div>
    </div>
  );
}
