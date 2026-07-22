'use client';

type WorkspaceHeaderCardProps = {
  title: string;
  description?: string;
  tags?: string[];
  badgeLabel: string;
};

export function WorkspaceHeaderCard({
  title,
  description,
  tags,
  badgeLabel,
}: WorkspaceHeaderCardProps) {
  return (
    <div className="border-border bg-depth-1 rounded-2xl border p-5 shadow-sm lg:p-6">
      <p className="text-muted-foreground mb-1 text-xs font-medium">{badgeLabel}</p>
      <h2 className="text-foreground text-xl font-bold lg:text-2xl">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-depth-2 text-foreground rounded-full px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
