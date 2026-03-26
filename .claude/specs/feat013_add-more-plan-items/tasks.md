# Implementation Plan

## Task Overview

Extend the Timeline component to support optional title icons, add two new milestones, and implement snake layout with semicircular turns for all screen sizes.

## Implementation Summary

All tasks have been completed successfully.

## Tasks

- [x] 1. Extend TimelineNodeData interface with optional title_icon property
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Added `title_icon?: string` to the interface
  - _Requirements: 1.1_

- [x] 2. Update TIMELINE_NODES array with 6 nodes
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Added `Cog`, `CircleArrowLeft` to lucide-react imports
  - Added `title_icon: '/codeup.png'` to Tech Decision node
  - Added "Adopt Jenkins" node with `Cog` icon and `title_icon: '/jenkins-color.png'`
  - Added "Continuous Optimization" node with `CircleArrowLeft` icon
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3_

- [x] 3. Add Image import from Next.js
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Added `import Image from 'next/image'`
  - _Requirements: 1.1, Performance_

- [x] 4. Implement title icon rendering with foreignObject
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Added conditional rendering for title_icon using SVG foreignObject
  - Set image dimensions to 16x16px
  - Added onError handler for graceful degradation
  - _Requirements: 1.1, 1.2, 1.3, 1.4, Reliability_

- [x] 5. Implement snake layout with semicircular turns
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Changed `nodesPerRow` to 3 for all screen sizes
  - Updated `generateConnectionPath` to use SVG arc (`A`) with sweep=1 for outward curve
  - Updated `calculatePositions` to always use snake layout
  - Updated SVG viewBox calculations for dynamic node count
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 6. Update keyboard navigation for snake layout
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Changed ArrowDown/ArrowUp navigation from 4 to 3 (nodesPerRow)
  - _Requirements: Usability_

## Final Configuration

```typescript
const NODE_SIZE = {
  diameter: 40,
  iconSize: 20,
  horizontalSpacing: 120,
  verticalSpacing: 100,
  paddingX: 60,
  paddingY: 40,
};
```

## Layout Result

- **Row 1**: Start → Tech Decision → Implementation (3 nodes)
- **Row 2**: Enable One Coach ← Adopt Jenkins ← Continuous Optimization (3 nodes, reversed)
- **Turn**: Semicircular arc curving outward between rows