'use client';

type InfoBlockProps = {
  title?: string;
  description?: string;
  points: string[];
};

export function InfoBlock({ title, description, points }: InfoBlockProps) {
  return (
    <div className="space-y-2">
      {title && <h6 className="text-md font-semibold text-foreground">{title}</h6>}
      {description && (
        <p className="text-md font-normal text-muted-foreground">{description}</p>
      )}
      <ul className="list-disc space-y-1 pl-4 text-foreground">
        {points.map((p) => (
          <li key={p}>
            <p className="text-md font-normal">{p}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
