'use client';

import type { PlaygroundItem } from '@/types/playground';
import { jsItems } from './data/js';
import { reactItems } from './data/react';
import { hookItems } from './data/hooks';
import { tsItems } from './data/ts';
import { nextItems } from './data/nextjs';
import { tailwind } from './data/tailwind';
import { troubleshootingItems } from './data/troubleshooting';

export const noteItems: PlaygroundItem[] = [
  ...jsItems,
  ...reactItems,
  ...hookItems,
  ...tsItems,
  ...nextItems,
  ...tailwind,
  ...troubleshootingItems,
];
