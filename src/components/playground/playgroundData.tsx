'use client';

import type { PlaygroundItem } from '@/types/playground';
import { templateItems } from './data/templates';
import { testingItems } from './data/testing';
import { pluginItems } from './data/plugin';
import { uxItems } from './data/ux';
import { uiItems } from './data/ui';

export const playgroundItems: PlaygroundItem[] = [
  ...templateItems,
  ...testingItems,
  ...pluginItems,
  ...uxItems,
  ...uiItems,
];
