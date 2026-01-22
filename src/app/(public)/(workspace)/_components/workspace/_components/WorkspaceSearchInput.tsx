'use client';

import { Search } from 'lucide-react';

type WorkspaceSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function WorkspaceSearchInput({
  value,
  onChange,
  placeholder = '제목, 설명, 태그로 검색...',
}: WorkspaceSearchInputProps) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-depth-1 text-foreground placeholder:text-muted-foreground border-border focus:border-primary focus:ring-primary/20 w-full rounded-xl border py-3 pl-12 pr-4 text-sm transition focus:outline-none focus:ring-2"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="text-muted-foreground hover:text-foreground absolute right-4 top-1/2 -translate-y-1/2 text-xs transition"
        >
          지우기
        </button>
      )}
    </div>
  );
}
