'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={scrollToTop}
      className={`hidden lg:flex fixed bottom-6 left-[calc(50%+520px)] z-50 h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-depth-1/90 text-foreground shadow-xl backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:bg-bg-depth-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
