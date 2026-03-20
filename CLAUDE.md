@AGENTS.md

## Project Overview

Tapestry GC Technology Enterprise Portal - a Next.js application with a minimalist white-background design and yellow brand theme.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Layout Structure
The app uses a fixed layout with three main parts:
- **Header** (`src/components/Header.tsx`) - Fixed top bar with brand name, yellow accent border
- **Sidebar** (`src/components/Sidebar.tsx`) - Collapsible left navigation (256px expanded / 64px collapsed)
- **MainContent** (`src/components/MainContent.tsx`) - Right content area, margin adjusts with sidebar state

### State Management
- Sidebar expand/collapse state managed via React Context (`SidebarProvider.tsx`)
- Uses `useSidebar()` hook to access `isExpanded` and `toggle`

### Brand Configuration
All brand constants in `src/lib/constants.ts`:
- `BRAND.name` - Portal title
- `BRAND.colors.primary` - Yellow (#EAB308)
- `LAYOUT` - Header height, sidebar widths
- `NAVIGATION_ITEMS` - Sidebar navigation items array

### Adding New Pages
1. Add page file in `src/app/` (e.g., `src/app/about/page.tsx`)
2. Add navigation entry to `NAVIGATION_ITEMS` in `src/lib/constants.ts`
3. Import icon from lucide-react and add to `iconMap` in `src/components/Sidebar.tsx`

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Path alias**: `@/*` maps to `./src/*`

## Spec-Driven Development

This project uses spec-driven workflow with documents in `.claude/specs/`. Each spec contains:
- `requirements.md` - User stories and acceptance criteria
- `design.md` - Technical architecture and component design
- `tasks.md` - Atomic implementation tasks