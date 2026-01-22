import { ReactNode } from 'react';

interface SkeletonBaseProps {
  children: ReactNode;
  className?: string;
}

interface CircleProps {
  size?: number | string;
  className?: string;
}

interface RowProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SkeletonBase = ({ children, className }: SkeletonBaseProps) => {
  return <div className={className}>{children}</div>;
};

const Circle = ({ size, className }: CircleProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`animate-pulse rounded-full bg-gray-200 ${className || ''}`}
    ></div>
  );
};

const Row = ({ width, height, className }: RowProps) => {
  return (
    <div
      style={{ width, height }}
      className={`animate-pulse rounded bg-gray-200 ${className || ''}`}
    ></div>
  );
};

const Rect = ({ width, height, className }: RowProps) => {
  return (
    <div
      style={{ width, height }}
      className={`animate-pulse rounded-md bg-gray-200 ${className || ''}`}
    ></div>
  );
};

export const Skeleton = SkeletonBase as typeof SkeletonBase & {
  Circle: typeof Circle;
  Row: typeof Row;
  Rect: typeof Rect;
};

Skeleton.Circle = Circle;
Skeleton.Row = Row;
Skeleton.Rect = Rect;
