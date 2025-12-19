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
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
      >
        Reset
      </button>
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800">
        Count: {count}
      </div>
      <button
        onClick={increase}
        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700 shadow-sm hover:border-blue-300 dark:border-blue-600/50 dark:bg-blue-900/30 dark:text-blue-200"
      >
        +1
      </button>
    </div>
  );
}
