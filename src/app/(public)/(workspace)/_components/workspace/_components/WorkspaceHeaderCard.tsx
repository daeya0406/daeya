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
    <div className="border-border from-primary/5 dark:from-primary/5 dark:via-depth-1 dark:to-depth-1 relative overflow-hidden rounded-2xl border bg-gradient-to-br via-white to-white p-8 shadow-sm">
      <div className="bg-primary/10 absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">
              {badgeLabel}
            </span>
          </div>
          <h2 className="text-foreground mb-3 text-2xl font-bold lg:text-3xl">{title}</h2>
          {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary ring-primary/20 rounded-full px-3 py-1.5 text-xs font-semibold ring-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
