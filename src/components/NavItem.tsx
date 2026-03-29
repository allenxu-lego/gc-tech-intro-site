'use client';

import { useState, useEffect } from 'react';
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
  const [isLocalFile, setIsLocalFile] = useState(false);

  useEffect(() => {
    setIsLocalFile(window.location.protocol === 'file:');
  }, []);

  const linkClassName = `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? 'bg-yellow-50 text-yellow-600 border-r-4'
      : 'text-gray-700 hover:bg-gray-100'
  }`;

  const staticHref = href === '/' ? './index.html' : `./${href.replace(/^\/+/, '')}.html`;

  if (isLocalFile) {
    return (
      <a
        href={staticHref}
        className={linkClassName}
        style={isActive ? { borderColor: BRAND.colors.primary } : {}}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {isExpanded && <span className="truncate">{label}</span>}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClassName}
      style={isActive ? { borderColor: BRAND.colors.primary } : {}}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {isExpanded && <span className="truncate">{label}</span>}
    </Link>
  );
}