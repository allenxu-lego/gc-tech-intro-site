# CI/CD Workflow Page - Design Specification

## Overview

The CI/CD Workflow page follows the existing project architecture pattern with a page component that renders within the shared layout. The flowchart is implemented as a self-contained React component using SVG for vector graphics and CSS transitions for animations.

---

## Architecture

### File Structure

```
src/
├── app/
│   └── cicd-workflow/
│       └── page.tsx              # Route page component
├── components/
│   ├── flowchart/
│   │   ├── Flowchart.tsx         # Main flowchart container
│   │   ├── FlowchartNode.tsx     # Individual node component
│   │   ├── FlowchartEdge.tsx     # Connection line component
│   │   └── FlowchartContext.tsx  # State management for interactions
│   ├── Header.tsx                # (existing)
│   ├── Sidebar.tsx               # (existing - modified)
│   └── MainContent.tsx           # (existing)
└── lib/
    └── constants.ts              # (existing - modified)
```

### Component Hierarchy

```mermaid
graph TB
    subgraph Page [cicd-workflow/page.tsx]
        PageComponent[Page Component]
    end

    subgraph FlowchartModule [flowchart/]
        FlowchartContext[FlowchartContext Provider]
        Flowchart[Flowchart Container]
        FlowchartNode[FlowchartNode x8]
        FlowchartEdge[FlowchartEdge x8]
    end

    PageComponent --> FlowchartContext
    FlowchartContext --> Flowchart
    Flowchart --> FlowchartNode
    Flowchart --> FlowchartEdge
```

---

## Steering Document Alignment

### Technical Standards (AGENTS.md)

- **Next.js Patterns**: Follows App Router conventions with `page.tsx` in route directory
- **Breaking Changes Awareness**: Uses Next.js 16+ patterns, avoiding deprecated APIs

### Project Instructions (CLAUDE.md)

- **Brand Configuration**: Uses `BRAND.colors.primary` (#EAB308) from constants.ts
- **Layout Integration**: Respects `LAYOUT.headerHeight` (64px) for viewport calculations
- **Navigation Pattern**: Follows `NAVIGATION_ITEMS` structure for sidebar integration
- **Icon Usage**: Uses lucide-react as specified in tech stack

### Existing Code Patterns

- **Context Pattern**: Follows `SidebarProvider.tsx` pattern for `FlowchartContext`
- **Component Structure**: Matches `NavItem.tsx` pattern for props interfaces and styling
- **Styling Approach**: Uses Tailwind CSS with project conventions

---

## Code Reuse Analysis

### Existing Components to Leverage

| Component | File | Reuse Pattern |
|---|---|---|
| SidebarProvider | `SidebarProvider.tsx` | Context pattern reference for FlowchartContext |
| NavItem | `NavItem.tsx` | Active state styling pattern, hover transitions |
| Header | `Header.tsx` | Brand color usage reference |
| constants.ts | `lib/constants.ts` | BRAND and LAYOUT constants |

### Integration Points

**Navigation Integration**:

Add to `NAVIGATION_ITEMS` in `constants.ts`:
```tsx
{
  id: 'cicd-workflow',
  label: 'CI/CD Workflow',
  href: '/cicd-workflow',
  icon: 'GitBranch',
}
```

Add icon mapping in `Sidebar.tsx`:
```tsx
import { Home, GitBranch, PanelLeftClose, PanelLeft } from 'lucide-react';

const iconMap = {
  Home,
  GitBranch,
};
```

**Layout Integration**: Page automatically integrates via Next.js App Router.

---

## Data Models

### FlowchartNode

```typescript
interface FlowchartNode {
  id: string;                    // Unique identifier
  label: string;                 // Display text
  icon: LucideIcon;              // React icon component
  type: 'actor' | 'action' | 'decision' | 'endpoint';
  position: { x: number; y: number };  // SVG coordinates
}
```

### FlowchartEdge

```typescript
interface FlowchartEdge {
  id: string;                    // Unique identifier
  from: string;                  // Source node ID
  to: string;                    // Target node ID
  label?: string;                // Optional edge label
  type: 'forward' | 'loop';      // Edge style type
}
```

### Nodes Configuration

| ID | Label | Icon | Type | Position (x, y) |
|---|---|---|---|---|
| developer | Developer | `User` | actor | (50, 200) |
| code-submit | Code Submit | `GitBranch` | action | (200, 200) |
| gitlab | GitLab | `Code2` | action | (350, 200) |
| merge-request | Merge Request | `GitPullRequest` | action | (500, 200) |
| code-review | Code Review | `Code` | action | (500, 320) |
| decision | Review Result | `CircleHelp` | decision | (500, 440) |
| changes-required | Changes Required | `RotateCcw` | action | (350, 440) |
| merge-complete | Merge Complete | `CheckCircle` | endpoint | (650, 440) |

### Edges Configuration

| ID | From | To | Label | Type |
|---|---|---|---|---|
| e1 | developer | code-submit | Submit | forward |
| e2 | code-submit | gitlab | Push | forward |
| e3 | gitlab | merge-request | Create | forward |
| e4 | merge-request | code-review | Trigger | forward |
| e5 | code-review | decision | Review | forward |
| e6 | decision | merge-complete | Approved | forward |
| e7 | decision | changes-required | Changes Required | forward |
| e8 | changes-required | developer | Resubmit | loop |

---

## Components and Interfaces

### 1. Page Component (`src/app/cicd-workflow/page.tsx`)

**Purpose**: Route entry point that renders the flowchart within the main content area.

**Interfaces**: None (Next.js page component)

**Dependencies**:
- `Flowchart` component
- `BRAND` constants for styling

**Reuses**:
- Follows existing page structure pattern from `src/app/page.tsx`

```tsx
export default function CICDWorkflowPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        CI/CD Workflow
      </h1>
      <Flowchart />
    </div>
  );
}
```

---

### 2. Flowchart Component (`src/components/flowchart/Flowchart.tsx`)

**Purpose**: Main container that orchestrates the pipeline visualization.

**Interfaces**:
```tsx
interface FlowchartProps {
  className?: string;
}
```

**Dependencies**:
- `FlowchartNode` component
- `FlowchartEdge` component
- `FlowchartContext` provider
- `nodes` and `edges` data arrays

**Reuses**:
- SVG pattern for scalable graphics
- Context pattern from `SidebarProvider`

**State**:
```tsx
const [activeNode, setActiveNode] = useState<string | null>(null);
const [isAnimating, setIsAnimating] = useState(false);
const [error, setError] = useState<Error | null>(null);
```

---

### 3. FlowchartNode Component (`src/components/flowchart/FlowchartNode.tsx`)

**Purpose**: Renders individual pipeline nodes with icons and labels.

**Interfaces**:
```tsx
interface FlowchartNodeProps {
  node: FlowchartNode;
  isActive: boolean;
  isAnimating: boolean;
  onClick: (id: string) => void;
}
```

**Dependencies**:
- lucide-react icons
- `BRAND.colors.primary` for active styling

**Reuses**:
- Hover/active state pattern from `NavItem.tsx`
- Tailwind transition classes

---

### 4. FlowchartEdge Component (`src/components/flowchart/FlowchartEdge.tsx`)

**Purpose**: Renders connecting lines between nodes with optional labels.

**Interfaces**:
```tsx
interface FlowchartEdgeProps {
  edge: FlowchartEdge;
  isHighlighted: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
```

**Dependencies**: None

**Reuses**:
- SVG path rendering patterns
- CSS transition for highlight animation

---

### 5. FlowchartContext (`src/components/flowchart/FlowchartContext.tsx`)

**Purpose**: Manages interaction state and animation coordination.

**Interfaces**:
```tsx
interface FlowchartContextValue {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  isAnimating: boolean;
  startAnimation: (nodeId: string) => void;
  triggerNextStep: () => void;  // Advances to next node in sequence
}
```

**Dependencies**:
- React Context API
- Node sequence mapping

**Reuses**:
- Context pattern structure from `SidebarProvider.tsx`

---

## Error Handling

### Error Boundary

Wrap the Flowchart component in an Error Boundary to catch SVG rendering failures:

```tsx
// src/components/flowchart/FlowchartErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class FlowchartErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Flowchart rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-red-600 mb-4">
            Unable to display the workflow diagram.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Error Logging

- Console.error for development debugging
- Component stack trace included via `componentDidCatch`

---

## Visual Design

### Color Palette

| Element | Color | Tailwind Class | Usage |
|---|---|---|---|
| Primary Accent | `#EAB308` | `yellow-500` | Active nodes, highlighted edges |
| Background | `#FFFFFF` | `white` | Node backgrounds, page |
| Text Primary | `#171717` | `gray-900` | Labels, headings |
| Text Secondary | `#6B7280` | `gray-500` | Subtitles, edge labels |
| Border Default | `#E5E7EB` | `gray-200` | Node borders |
| Success | `#22C55E` | `green-500` | Merge complete node |
| Warning | `#F59E0B` | `amber-500` | Changes required indicator |

### Typography

| Element | Size | Weight | Color |
|---|---|---|---|
| Page Title | 24px (text-2xl) | semibold | gray-800 |
| Node Labels | 14px (text-sm) | medium | gray-700 |
| Edge Labels | 12px (text-xs) | normal | gray-500 |

### Node Dimensions

| Type | Width | Height |
|---|---|---|
| Actor | 100px | 80px |
| Action | 120px | 70px |
| Decision | 100px (diamond) | 100px |
| Endpoint | 120px | 70px |

---

## Interaction Design

### Step Progression Animation

```
User clicks node → Node becomes active (yellow) →
Edge to next node highlights → Next node pulses →
Animation completes → State ready for next interaction
```

### Animation Timeline

| Phase | Duration | CSS Property |
|---|---|---|
| Node Click Feedback | < 100ms | immediate state update |
| Edge Highlight | 300ms | `stroke-dashoffset` transition |
| Next Node Pulse | 500ms | `@keyframes pulse` animation |
| Animation Lock | Total ~800ms | `isAnimating: true` |

### Animation-in-Progress Indication

When `isAnimating === true`:
- Container receives `opacity: 0.9` and `cursor: wait`
- Active node shows pulsing ring animation
- Other nodes are disabled (`pointer-events: none`)

### CSS Keyframes

```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(234, 179, 8, 0); }
}

@keyframes flow {
  to { stroke-dashoffset: 0; }
}
```

---

## Responsive Design

### SVG ViewBox Strategy

```tsx
<svg viewBox="0 0 800 500" className="w-full max-w-4xl h-auto">
```

### Breakpoint Behavior

| Viewport | Container Width | Node Scale |
|---|---|---|
| Desktop (> 1024px) | max-w-4xl (896px) | 100% |
| Tablet (768-1024px) | full width | 85% |
| Mobile (< 768px) | full width | 70% (vertical flow) |

---

## Pipeline Flow Visualization

```mermaid
flowchart LR
    A[Developer] -->|Submit Code| B[Code Submit]
    B --> C[GitLab]
    C -->|Create| D[Merge Request]
    D -->|Trigger| E[Code Review]
    E --> F{Review Result}
    F -->|Approved| G[Merge Complete]
    F -->|Changes Required| H[Changes Required]
    H -->|Fix & Resubmit| A

    style A fill:#EAB308
    style G fill:#22C55E
    style F fill:#F59E0B
```

---

## Accessibility Implementation

### Keyboard Navigation

```tsx
// Tab order follows node sequence
tabIndex={0}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onClick(node.id);
  }
}}
```

### Screen Reader Support

```tsx
// Each node has aria-label
<button aria-label={`Step: ${node.label}. Press to animate next step.`}>

// Live region for animation announcements
<div role="status" aria-live="polite" className="sr-only">
  {isAnimating ? `Animating to ${nextNodeLabel}` : ''}
</div>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Considerations

1. **SVG Rendering**: Inline SVG for fastest render (no network fetch)
2. **CSS Transitions**: Hardware-accelerated via `transform` and `opacity`
3. **Event Handling**: Clicks ignored during animation (`isAnimating` check)
4. **Bundle Size**: No additional dependencies (lucide-react already installed)
5. **Memoization**: Node/edge components memoized to prevent re-renders

---

## File Size Estimates

| File | Lines | Size |
|---|---|---|
| `page.tsx` | ~25 | 0.6 KB |
| `Flowchart.tsx` | ~100 | 3 KB |
| `FlowchartNode.tsx` | ~70 | 2 KB |
| `FlowchartEdge.tsx` | ~50 | 1.5 KB |
| `FlowchartContext.tsx` | ~40 | 1 KB |
| `FlowchartErrorBoundary.tsx` | ~35 | 1 KB |
| **Total** | ~320 | ~9 KB |

---

## Testing Considerations

### Unit Tests

- Node rendering with correct icons and labels
- Click handler triggers animation state change
- Edge highlighting during animation
- Error boundary catches rendering errors

### Integration Tests

- Full flowchart renders correctly
- Navigation to `/cicd-workflow` works
- Responsive scaling across breakpoints

### Accessibility Tests

- Keyboard navigation works (Tab + Enter)
- Screen reader announces node labels and animation state
- Focus visible on all interactive elements