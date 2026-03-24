# Implementation Tasks: Our Plan Timeline

## Task Overview

Implement an interactive timeline component with metro-style progress animation in the OurPlanContent tab.

## Steering Document Compliance

- Follows project structure: `src/components/cicd-workflow/Timeline.tsx`
- Uses TypeScript strict mode with proper interfaces
- Uses Framer Motion for animations (consistent with existing patterns)
- Uses lucide-react for icons (site-wide standard)

## Atomic Task Requirements

Each task touches 1-3 files, completable in 15-30 minutes, single purpose.

## Tasks

- [x] 1. Create Timeline component with interfaces and data constants
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Define `TimelineNodeData` and `NodePosition` interfaces
  - Define `TIMELINE_NODES` data array with 5 milestones
  - Define animation timing constants
  - _Requirements: 1.1, 2.1_
  - _Leverage: src/components/cicd-workflow/WhyWhatContent.tsx for component structure_

- [x] 2. Implement SVG container and node rendering
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Create SVG container with responsive viewBox
  - Render timeline nodes as circles with icons
  - Add title and date labels below each node
  - _Requirements: 1.2, 2.2, 2.3_

- [x] 3. Add connection lines between nodes
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Calculate node positions based on viewport
  - Render gray dashed connection lines between adjacent nodes
  - Support snake layout path for mobile
  - _Requirements: 4.1, 4.2, 4.4_
  - _Leverage: src/components/cicd-workflow/WhyWhatContent.tsx for SVG path patterns_

- [x] 4. Implement progress animation on node click
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Add `selectedIndex` state
  - Create animated yellow progress line from start to selected node
  - Use Framer Motion with stroke-dashoffset animation
  - Implement cumulative progress: all nodes from start to selected stay yellow
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - _Leverage: src/components/flowchart/FlowchartEdge.tsx for stroke animation pattern_

- [x] 5. Add hover and click states for nodes
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Add hover scale animation using Framer Motion
  - Add click handler to trigger progress animation
  - Style completed nodes (index <= selectedIndex) with yellow highlight
  - _Requirements: 3.3, 5.1, 5.3_

- [x] 6. Add keyboard navigation and accessibility
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Add `role="button"` and `tabIndex` attributes
  - Implement Arrow key navigation between nodes
  - Add Enter/Space key handlers for selection
  - Add ARIA labels and focus ring styling
  - _Requirements: Accessibility (lines 89-93)_

- [x] 7. Implement responsive snake layout
  - File: `src/components/cicd-workflow/Timeline.tsx`
  - Add resize listener for viewport detection
  - Switch to snake layout at < 640px viewport
  - Recalculate node positions and connection paths
  - _Requirements: 1.3, 1.4, Responsive Design_

- [x] 8. Integrate Timeline into OurPlanContent
  - File: `src/components/cicd-workflow/OurPlanContent.tsx`
  - Import Timeline component
  - Replace placeholder content with Timeline
  - _Requirements: 1.1_

## Implementation Notes

### Final Icon Selection
- Start: `Flag` (lucide-react)
- Tech Decision: `Milestone`
- Implementation: `Pickaxe`
- Enable One Coach: `Rocket`
- More products: `SendHorizonal`

### Cumulative Progress Behavior
When a node is clicked, all nodes from index 0 to the selected index turn yellow and remain yellow. This creates a "metro arrival" effect showing cumulative progress rather than highlighting only the selected node.