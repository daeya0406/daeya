'use client';

type CodeCardProps = {
  title: string;
  description?: string;
  code: string;
};

export function CodeCard({ title, description, code }: CodeCardProps) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-depth-1 p-4 text-sm shadow-sm">
      <div>
        <h6 className="text-md font-semibold text-foreground">{title}</h6>
        {description ? (
          <p className="text-md font-normal text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <pre className="whitespace-pre-wrap rounded-md bg-depth-2 p-3 font-mono text-xs text-foreground">
        {code}
      </pre>
    </div>
  );
}
