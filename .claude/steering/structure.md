# Structure Steering

## Directory Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (header, sidebar, main)
│   ├── page.tsx            # Homepage
│   └── [route]/            # Feature pages
│       └── page.tsx
│
├── components/             # React components
│   ├── Header.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Left sidebar navigation
│   ├── MainContent.tsx     # Content wrapper
│   ├── NavItem.tsx         # Navigation item component
│   ├── SidebarProvider.tsx # Sidebar state context
│   └── [feature]/          # Feature-specific components
│       ├── index.tsx       # Main component
│       ├── Context.tsx     # Feature context (if needed)
│       └── ...             # Supporting components
│
└── lib/
    └── constants.ts        # Brand, layout, navigation config
```

## Naming Conventions

### Files
- Components: PascalCase (e.g., `FlowchartNode.tsx`)
- Pages: lowercase with dashes (e.g., `cicd-workflow/page.tsx`)
- Context: `[Feature]Provider.tsx` or `[Feature]Context.tsx`

### Components
- Named exports: `export function ComponentName()`
- Props interface: `ComponentNameProps`
- Provider pattern: `use[Feature]()` hook for consumers

### Constants
- `BRAND` - Brand configuration (name, colors, logo)
- `LAYOUT` - Layout dimensions (header height, sidebar widths)
- `NAVIGATION_ITEMS` - Sidebar navigation array
- `as const` assertion for type safety

## Adding New Features

### 1. New Page
1. Create `src/app/[route]/page.tsx`
2. Add entry to `NAVIGATION_ITEMS` in `src/lib/constants.ts`
3. Import icon from lucide-react, add to `iconMap` in `Sidebar.tsx`

### 2. Feature Components
1. Create `src/components/[feature]/` directory
2. Main component as `index.tsx` or `[Feature].tsx`
3. Context file if shared state needed
4. Sub-components in same directory

### 3. Constants Update
- Add to appropriate constant object in `src/lib/constants.ts`
- Use `as const` for new configuration arrays/objects

## Spec-Driven Development

Specs located in `.claude/specs/[feature]/`:
- `requirements.md` - User stories and acceptance criteria
- `design.md` - Technical architecture and component design
- `tasks.md` - Atomic implementation tasks

## Static Export Structure

```
out/
├── index.html
├── [route]/
│   └── index.html
└── _next/
    └── static/           # JS, CSS assets
```

Post-export script (`scripts/post-export.js`) fixes:
- Asset paths for local file access
- Navigation links for HTML file references