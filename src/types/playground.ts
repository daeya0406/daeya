import type React from 'react';

export type PlaygroundItem = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  code?: string;
  codes?: Array<{ label?: string; code: string } | string>;
  categories: string[];
  demo?: React.ReactNode;
};
