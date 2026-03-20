'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { BRAND } from '@/lib/constants';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isExpanded: boolean;
}

export function NavItem({ href, icon: Icon, label, isExpanded }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-yellow-50 text-yellow-600 border-r-4'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      style={isActive ? { borderColor: BRAND.colors.primary } : {}}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {isExpanded && <span className="truncate">{label}</span>}
    </Link>
  );
}