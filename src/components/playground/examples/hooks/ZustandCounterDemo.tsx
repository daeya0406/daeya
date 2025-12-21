'use client';

import { create } from 'zustand';

type CounterStore = {
  count: number;
  increase: () => void;
  reset: () => void;
};

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

export default function ZustandCounterDemo() {
  const count = useCounterStore((s) => s.count);
  const increase = useCounterStore((s) => s.increase);
  const reset = useCounterStore((s) => s.reset);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={reset}
        className="rounded-lg border border-border bg-bg-depth-1 px-3 py-2 text-sm shadow-sm transition hover:border-primary/60"
      >
        Reset
      </button>
      <div className="rounded-lg border border-border bg-bg-depth-1 px-3 py-2 text-sm shadow-sm">
        Count: {count}
      </div>
      <button
        onClick={increase}
        className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary shadow-sm transition hover:border-primary/60"
      >
        +1
      </button>
    </div>
  );
}
