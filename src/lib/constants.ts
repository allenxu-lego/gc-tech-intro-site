// Brand Configuration
export const BRAND = {
  name: 'Tapestry GC Technology',
  logo: {
    src: '/logo.png',
    alt: 'Tapestry GC Technology',
    height: 36,
    width: 36,
  },
  colors: {
    primary: '#EAB308', // yellow-500
    background: '#FFFFFF',
  },
} as const;

// Layout Dimensions
export const LAYOUT = {
  headerHeight: '64px',
  sidebar: {
    expandedWidth: '256px',
    collapsedWidth: '64px',
  },
} as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  {
    id: 'homepage',
    label: 'Homepage',
    href: '/',
    icon: 'Home',
  },
] as const;

// Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}