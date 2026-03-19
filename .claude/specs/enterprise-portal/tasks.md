# Implementation Plan

## Task Overview
Initialize a Next.js enterprise portal for Tapestry GC Technology with a minimalist design, collapsible sidebar navigation, and homepage displaying the coach.png image.

## Steering Document Compliance
New project - follows Next.js App Router conventions and Tailwind CSS best practices.

## Atomic Task Requirements
**Each task must meet these criteria for optimal agent execution:**
- **File Scope**: Touches 1-3 related files maximum
- **Time Boxing**: Completable in 15-30 minutes
- **Single Purpose**: One testable outcome per task
- **Specific Files**: Must specify exact files to create/modify
- **Agent-Friendly**: Clear input/output with minimal context switching

---

## Tasks

- [ ] 1. Initialize Next.js project with TypeScript and Tailwind CSS
  - File: Project root (creates package.json, tsconfig.json, next.config.ts, etc.)
  - Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git`
  - Purpose: Set up Next.js 14+ project foundation with all required tooling
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Move coach.png asset to public folder
  - Files: `public/coach.png` (create), `assets/coach.png` (remove after move)
  - Move the existing coach.png from assets/ to public/ folder
  - Purpose: Make image accessible via Next.js static asset serving
  - _Requirements: 6.1_

- [ ] 3. Create TypeScript interfaces and brand constants
  - File: `src/lib/constants.ts`
  - Define brand configuration (name, colors, dimensions)
  - Define navigation items array
  - Purpose: Centralize configuration for consistency and maintainability
  - _Requirements: 7.1, 7.2_

- [ ] 4. Create SidebarProvider context component
  - File: `src/components/SidebarProvider.tsx`
  - Create React Context for sidebar expand/collapse state
  - Export SidebarProvider component and useSidebar hook
  - Purpose: Enable sidebar state sharing between Sidebar and MainContent
  - _Requirements: 3.3_

- [ ] 5. Create Header component
  - File: `src/components/Header.tsx`
  - Fixed header with portal name "Tapestry GC Technology" (left-aligned)
  - Yellow accent bar below title
  - Height: 64px
  - Purpose: Brand identification at top of every page
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 6. Create NavItem component
  - File: `src/components/NavItem.tsx`
  - Navigation link with icon and label
  - Active state styling (yellow highlight)
  - Use Next.js Link for client-side navigation
  - Purpose: Reusable navigation item for sidebar
  - _Requirements: 4.2, 4.3_

- [ ] 7. Create Sidebar component
  - File: `src/components/Sidebar.tsx`
  - Collapsible sidebar (256px expanded, 64px collapsed)
  - Toggle button with menu icon
  - Render NavItem for Homepage
  - Read state from SidebarProvider
  - Purpose: Navigation panel with expand/collapse functionality
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 8. Update RootLayout with Header, Sidebar, and MainContent
  - File: `src/app/layout.tsx`
  - Wrap with SidebarProvider
  - Include Header (fixed at top)
  - Include Sidebar (fixed on left)
  - Main content area with proper margins
  - Purpose: Establish overall page layout structure
  - _Requirements: 2.1, 3.1, 5.1, 5.2_

- [ ] 9. Create Homepage with centered coach.png
  - File: `src/app/page.tsx`
  - Use Next.js Image component for optimization
  - Center image horizontally and vertically
  - Purpose: Landing page displaying brand visual
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 10. Update global styles for white background
  - File: `src/app/globals.css`
  - Ensure white background (#FFFFFF)
  - Remove default Next.js gradient background
  - Add minimal base styles
  - Purpose: Establish clean, minimalist base styling
  - _Requirements: 7.1_

---

## Verification

After completing all tasks:
1. Run `npm run dev` to start development server
2. Verify header displays "Tapestry GC Technology" (left-aligned) with yellow accent bar
3. Verify sidebar appears on left with Homepage navigation
4. Verify sidebar toggles between expanded (256px) and collapsed states
5. Verify homepage shows centered coach.png image
6. Verify white background throughout
7. Verify yellow (#EAB308) accent color is applied correctly