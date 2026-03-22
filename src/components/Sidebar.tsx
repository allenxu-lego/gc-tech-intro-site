'use client';

import { Home, GitBranch, PanelLeftClose, PanelLeft, LucideIcon } from 'lucide-react';
import { useSidebar } from './SidebarProvider';
import { NavItem } from './NavItem';
import { LAYOUT, NAVIGATION_ITEMS } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Home,
  GitBranch,
};

export function Sidebar() {
  const { isExpanded, toggle } = useSidebar();

  return (
    <aside
      className="fixed left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col"
      style={{
        top: LAYOUT.headerHeight,
        width: isExpanded ? LAYOUT.sidebar.expandedWidth : LAYOUT.sidebar.collapsedWidth,
      }}
    >
      {/* Navigation Items */}
      <nav className="px-2 py-2 flex-1">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon];
          return (
            <NavItem
              key={item.id}
              href={item.href}
              icon={IconComponent}
              label={item.label}
              isExpanded={isExpanded}
            />
          );
        })}
      </nav>
      {/* Toggle Button */}
      <div className="p-2 flex justify-end border-t border-gray-100">
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <PanelLeftClose className="w-5 h-5 text-gray-600" />
          ) : (
            <PanelLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </aside>
  );
}