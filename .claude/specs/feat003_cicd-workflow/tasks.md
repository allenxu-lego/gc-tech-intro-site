# CI/CD Workflow Page - Implementation Tasks

## Steering Document Compliance

- Follows Next.js App Router patterns from AGENTS.md
- Uses brand configuration from `constants.ts` (CLAUDE.md)
- Uses lucide-react icons as specified in tech stack
- Follows existing component patterns from `NavItem.tsx` and `SidebarProvider.tsx`

## Atomic Task Requirements

- Each task touches 1-3 files maximum
- Completable in 15-30 minutes
- Single purpose with one testable outcome
- Specific file paths provided
- Agent-friendly with clear input/output

## Task Format

```
- [ ] Task number. Task description
  - File: path/to/file
  - _Leverage: path/to/existing/file_
  - _Requirements: AC-X_
```

---

## Tasks

- [x] 1. Add navigation entry for CI/CD Workflow page
  - File: `src/lib/constants.ts`, `src/components/Sidebar.tsx`
  - Add "CI/CD Workflow" entry to `NAVIGATION_ITEMS` array with GitBranch icon
  - Import GitBranch icon and add to iconMap in Sidebar
  - _Leverage: `src/lib/constants.ts`, `src/components/Sidebar.tsx`_
  - _Requirements: AC-1_

- [x] 2. Create page route component
  - File: `src/app/cicd-workflow/page.tsx`
  - Create page component with centered layout and "CI/CD Workflow" heading
  - _Leverage: `src/app/page.tsx` (existing page structure pattern)_
  - _Requirements: AC-2_

- [x] 3. Create FlowchartContext provider
  - File: `src/components/flowchart/FlowchartContext.tsx`
  - Create React context with activeNode, isAnimating, error state
  - Export FlowchartProvider and useFlowchart hook
  - Implement startAnimation and triggerNextStep functions
  - _Leverage: `src/components/SidebarProvider.tsx` (context pattern)_
  - _Requirements: AC-5, AC-7_

- [x] 4. Define flowchart data structures
  - File: `src/components/flowchart/Flowchart.tsx`
  - Create FlowchartNode and FlowchartEdge interfaces
  - Define nodes array with 8 pipeline nodes (positions, icons, labels)
  - Define edges array with 8 connections
  - _Requirements: AC-3, AC-4_

- [x] 5. Create FlowchartNode component
  - File: `src/components/flowchart/FlowchartNode.tsx`
  - Render SVG group with rect, icon, and label
  - Add default, hover, and active state styling
  - Add keyboard accessibility (tabIndex, onKeyDown)
  - Add aria-label for screen readers
  - _Leverage: `src/components/NavItem.tsx` (active/hover styling pattern)_
  - _Requirements: AC-4, AC-6_

- [x] 6. Create FlowchartEdge component
  - File: `src/components/flowchart/FlowchartEdge.tsx`
  - Render SVG path with arrow marker between nodes
  - Add dashed line for default, solid for highlight state
  - Render edge label text where specified
  - _Requirements: AC-3, AC-5_

- [x] 7. Assemble main Flowchart component
  - File: `src/components/flowchart/Flowchart.tsx`
  - Add SVG container with viewBox="0 0 800 500"
  - Wrap with FlowchartProvider
  - Map nodes to FlowchartNode components
  - Map edges to FlowchartEdge components
  - Add responsive className
  - _Leverage: `src/lib/constants.ts` (BRAND.colors.primary)_
  - _Requirements: AC-2, AC-3, AC-4, AC-6_

- [x] 8. Integrate Flowchart into page
  - File: `src/app/cicd-workflow/page.tsx`
  - Import and render Flowchart component
  - Add padding and max-width constraints
  - _Requirements: AC-2_

- [x] 9. Implement click animation logic
  - File: `src/components/flowchart/Flowchart.tsx`, `src/components/flowchart/FlowchartContext.tsx`
  - Define node sequence mapping for animation flow
  - Add handleNodeClick to trigger animation
  - Set isAnimating flag, clear after 800ms
  - Ignore clicks during animation
  - _Requirements: AC-5, AC-7_

- [x] 10. Add animation CSS styles
  - File: `src/app/globals.css`
  - Add @keyframes pulse for node glow effect
  - Add @keyframes flow for edge animation
  - Add reduced-motion media query
  - Add transition classes for state changes
  - _Leverage: `src/app/globals.css` (existing style patterns)_
  - _Requirements: AC-5_

- [x] 11. Create error boundary component
  - File: `src/components/flowchart/FlowchartErrorBoundary.tsx`
  - Create class component with getDerivedStateFromError
  - Implement componentDidCatch for error logging
  - Render error message with retry button
  - Wrap Flowchart with error boundary in page
  - _Requirements: AC-8_

---

## Task Dependencies

```
Tasks 1, 2, 3, 4, 5, 6 (Parallel Group A)
        ↓
Task 7 (requires 3, 4, 5, 6)
        ↓
Task 8 (requires 7)
        ↓
Tasks 9, 10, 11 (Parallel Group B, require 7)
        ↓
Done
```

## Implementation Order

| Step | Tasks | Notes |
|------|-------|-------|
| 1 | 1, 2, 3, 4, 5, 6 | All can run in parallel |
| 2 | 7 | Assemble all components |
| 3 | 8 | Integrate to page |
| 4 | 9, 10, 11 | Add interactions and error handling |

---

## Verification Checklist

- [ ] Navigation to `/cicd-workflow` works from sidebar
- [ ] Flowchart displays 8 nodes with correct icons
- [ ] Flowchart displays 8 connecting edges with labels
- [ ] Clicking nodes triggers animation to next step
- [ ] Animation locks during playback (rapid clicks ignored)
- [ ] Responsive scaling on different screen sizes
- [ ] Keyboard navigation works (Tab + Enter)
- [ ] No console errors