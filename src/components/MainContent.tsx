'use client';

import { useSidebar } from './SidebarProvider';
import { LAYOUT } from '@/lib/constants';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <main
      className="pt-16 min-h-screen transition-all duration-300 bg-white"
      style={{
        marginLeft: isExpanded ? LAYOUT.sidebar.expandedWidth : LAYOUT.sidebar.collapsedWidth,
      }}
    >
      {children}
    </main>
  );
}