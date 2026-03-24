'use client';

import { ReactNode } from 'react';

export interface TabContentProps {
  children: ReactNode;
  isActive: boolean;
  tabId: string;
}

export function TabContent({ children, isActive, tabId }: TabContentProps) {
  return (
    <div
      className="w-full"
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      style={{ visibility: isActive ? 'visible' : 'hidden', position: isActive ? 'relative' : 'absolute', top: 0, left: 0 }}
    >
      {children}
    </div>
  );
}