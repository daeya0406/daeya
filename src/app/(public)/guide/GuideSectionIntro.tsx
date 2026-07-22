type GuideSectionIntroProps = {
  title: string;
  description: string;
};

export function GuideSectionIntro({ title, description }: GuideSectionIntroProps) {
  return (
    <div className="mb-6 space-y-1">
      <h2 className="text-foreground text-lg font-bold">{title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
