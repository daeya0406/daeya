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

export function ZustandCounterDemo() {
  const count = useCounterStore((s) => s.count);
  const increase = useCounterStore((s) => s.increase);
  const reset = useCounterStore((s) => s.reset);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={reset}
        className="border-border bg-depth-1 hover:border-primary/60 rounded-lg border px-3 py-2 text-sm shadow-sm transition"
      >
        Reset
      </button>
      <div className="border-border bg-depth-1 rounded-lg border px-3 py-2 text-sm shadow-sm">
        Count: {count}
      </div>
      <button
        onClick={increase}
        className="border-primary/30 bg-primary/10 text-primary hover:border-primary/60 rounded-lg border px-3 py-2 text-sm shadow-sm transition"
      >
        +1
      </button>
    </div>
  );
}
