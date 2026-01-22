'use client';

import UISection from './sections/UISection';
import FontSection from './sections/FontSection';
import ColorSection from './sections/ColorSection';
import StackSection from './sections/StackSection';

type Props = {
  tab: string;
};

export function GuideTabContent({ tab }: Props) {
  if (tab === 'stack') return <StackSection />;
  if (tab === 'ui') return <UISection />;
  if (tab === 'font') return <FontSection />;
  if (tab === 'color') return <ColorSection />;
  return null;
}
