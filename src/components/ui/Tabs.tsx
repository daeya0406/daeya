'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Tab<K extends string> {
  key: K;
  label: string;
}

interface TabsProps<K extends string> {
  tabs: readonly Tab<K>[];
  active: K;
  onChange: (key: K) => void;
}

export function TabsNav<K extends string>({ tabs, active, onChange }: TabsProps<K>) {
  return (
    <nav className="border-border text-foreground relative overflow-x-auto overflow-y-hidden border-b">
      <div className="flex w-max gap-6 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`text-md relative min-w-20 pb-3 font-semibold outline-none ${
              active === tab.key ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <motion.div
                layoutId="underline"
                className="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsCtx() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within <TabsRoot>');
  return ctx;
}

type TabsRootProps = {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

function TabsRoot({ value, defaultValue, onValueChange, children }: TabsRootProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;

  const api = useMemo(
    () => ({
      value: current,
      setValue: (val: string) => {
        setInternal(val);
        onValueChange?.(val);
      },
    }),
    [current, onValueChange]
  );

  return <TabsContext.Provider value={api}>{children}</TabsContext.Provider>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <nav className="border-border text-foreground relative mb-4 overflow-y-hidden border-b">
      <div className="flex w-max gap-6 px-1">{children}</div>
    </nav>
  );
}

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: active, setValue } = useTabsCtx();

  const isActive = active === value;
  return (
    <button
      onClick={() => setValue(value)}
      className={`text-md relative min-w-20 pb-3 font-semibold outline-none ${
        isActive ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
        />
      )}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

function TabsContent({ value, children }: TabsContentProps) {
  const { value: active } = useTabsCtx();
  const isActive = active === value;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
