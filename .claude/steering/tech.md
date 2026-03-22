# Technology Steering

## Core Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16+ |
| Language | TypeScript | 5.x (strict mode) |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | Latest |
| Path Alias | `@/*` | Maps to `./src/*` |

## Architecture Decisions

### App Router
- Use Next.js App Router (not Pages Router)
- File-based routing in `src/app/`
- Server Components by default, `'use client'` directive when needed

### Static Export
- Project supports static HTML export for offline/local access
- `npm run export` builds to `out/` directory with fixed asset paths
- `assetPrefix` controlled via `STATIC_EXPORT` environment variable

### State Management
- React Context for global state (sidebar, flowchart interaction)
- Local component state for UI concerns
- No external state libraries (Redux, Zustand, etc.)

### Animations
- Framer Motion for all animations
- SVG-based interactive diagrams
- Entrance animations with stagger effects
- Path draw animations for flowchart edges

## Code Conventions

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface/type exports for shared types
- `as const` for configuration objects

### Components
- Functional components with named exports
- Props interfaces defined at top of file
- Use `'use client'` only when necessary (event handlers, hooks)

### Styling
- Tailwind utility classes (no custom CSS except globals)
- Responsive design with Tailwind breakpoints
- Color values from constants, not hardcoded

## Performance Guidelines

- Use `priority` prop for above-fold images
- SVG viewBox for responsive scaling
- Minimize client-side JavaScript
- Leverage Next.js Image optimization (disabled for static export)

## Build Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build (.next/)
npm run export   # Static export (out/)
npm run lint     # ESLint
```