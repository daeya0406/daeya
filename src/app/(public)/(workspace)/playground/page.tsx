'use client';

import { Suspense, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { extractTabsFromNav } from '@/shared/common/navigation';
import { playgroundItems } from '@/app/(public)/(workspace)/playground/_components/playgroundData';
import { useSyncedTab } from '@/hooks/useSyncedTab';
import { Icon } from '@/shared/ui/Icons';
import {
  TabbedWorkspaceLayout,
  WorkspaceSearchInput,
  WorkspaceListItem,
  WorkspaceHeaderCard,
  WorkspaceDemoCard,
  WorkspaceCodeCard,
  WorkspaceEmptyState,
} from '@/app/(public)/(workspace)/_components/workspace';

const tabs = extractTabsFromNav('Playground');

type TabKey = string;

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground py-10 text-center text-sm">Loading...</div>}
    >
      <PlaygroundPageContent />
    </Suspense>
  );
}

function PlaygroundPageContent() {
  const { activeTab, defaultTab, onChangeTab } = useSyncedTab(tabs, '/playground');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (value: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    if (typeof document === 'undefined') return false;
    // Fallback for non-secure contexts or older browsers.
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  };

  const filteredItems = useMemo(() => {
    const tabFiltered = playgroundItems.filter((item) =>
      item.categories.includes(activeTab as TabKey)
    );

    if (!searchQuery) return tabFiltered;

    const query = searchQuery.toLowerCase();
    return tabFiltered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [activeTab, searchQuery]);

  const [activeId, setActiveId] = useState<string | undefined>(filteredItems[0]?.id);
  const currentActiveId = useMemo(() => {
    if (!filteredItems.length) return undefined;
    if (activeId && filteredItems.some((i) => i.id === activeId)) return activeId;
    return filteredItems[0]?.id;
  }, [activeId, filteredItems]);

  const activeItem = filteredItems.find((item) => item.id === currentActiveId);
  const codeBlocks =
    activeItem &&
    (activeItem.codes
      ? activeItem.codes.map((entry) =>
          typeof entry === 'string' ? { label: undefined, code: entry } : entry
        )
      : activeItem.code
        ? [{ label: undefined, code: activeItem.code }]
        : []);

  const handleCopy = async (code: string, index: number, label?: string) => {
    try {
      const ok = await copyToClipboard(code);
      if (!ok) throw new Error('clipboard');
      setCopiedIndex(index);
      toast.success(`${label ?? `코드 ${index + 1}`}을(를) 복사했습니다.`);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error('복사에 실패했습니다');
    }
  };

  if (!tabs.length) return null;

  return (
    <TabbedWorkspaceLayout
      title="Playground"
      description="실무에서 쓰는 UI·UX·폼 패턴을 브라우저에서 바로 돌려보는 공간입니다"
      itemCount={filteredItems.length}
      tabs={tabs}
      activeTab={activeTab}
      defaultTab={defaultTab}
      onChangeTab={onChangeTab}
      searchSlot={<WorkspaceSearchInput value={searchQuery} onChange={setSearchQuery} />}
      sidebarTitle="목록"
      sidebarCount={filteredItems.length}
      sidebarSlot={
        filteredItems.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            이 탭에는 준비된 항목이 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const isActive = currentActiveId === item.id;
              return (
                <WorkspaceListItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  active={isActive}
                  onClick={() => setActiveId(item.id)}
                />
              );
            })}
          </div>
        )
      }
      contentSlot={
        activeItem ? (
          <div className="space-y-6">
            <WorkspaceHeaderCard
              title={activeItem.title}
              description={activeItem.description}
              tags={activeItem.tags}
              badgeLabel="Playground"
            />

            {activeItem.demo && <WorkspaceDemoCard>{activeItem.demo}</WorkspaceDemoCard>}

            {codeBlocks && codeBlocks.length > 0 && (
              <div className="space-y-4">
                {codeBlocks.map((block, idx) => (
                  <WorkspaceCodeCard
                    key={`${block.label ?? 'code'}-${idx}`}
                    label={block.label ?? `코드 예시 ${idx + 1}`}
                    code={block.code}
                    copied={copiedIndex === idx}
                    onCopy={() => handleCopy(block.code, idx, block.label)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <WorkspaceEmptyState
            title="항목을 선택하세요"
            description="왼쪽 목록에서 보고 싶은 데모를 클릭하세요"
            icon={<Icon name="code2" />}
          />
        )
      }
    />
  );
}
