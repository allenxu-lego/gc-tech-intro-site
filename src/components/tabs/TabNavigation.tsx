'use client';

import { useRef, KeyboardEvent } from 'react';
import { BRAND } from '@/lib/constants';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const newTabId = tabs[newIndex]?.id;
    if (newTabId) {
      onTabChange(newTabId);
      // Focus the new tab after state update
      setTimeout(() => {
        document.getElementById(`tab-${newTabId}`)?.focus();
      }, 0);
    }
  };

  return (
    <nav
      className="flex justify-center gap-1 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide"
      role="tablist"
      aria-label="Content tabs"
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            ref={isActive ? activeTabRef : null}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={isActive ? 0 : -1}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
              ${
                isActive
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }
            `}
            style={isActive ? { borderBottomColor: BRAND.colors.primary } : {}}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
