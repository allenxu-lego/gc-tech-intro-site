# Implementation Plan

## Task Overview
Extend the flowchart system to support custom image icons for nodes, enabling brand logos like Jenkins to be displayed alongside Lucide icons.

## Steering Document Compliance
- Types defined in `flowchartData.ts` following existing type co-location pattern
- Component extended in `FlowchartNode.tsx` maintaining existing component structure
- Image asset placed in `public/` for Next.js static serving

## Atomic Task Requirements
**Each task must meet these criteria for optimal agent execution:**
- **File Scope**: Touches 1-3 related files maximum
- **Time Boxing**: Completable in 15-30 minutes
- **Single Purpose**: One testable outcome per task
- **Specific Files**: Must specify exact files to create/modify
- **Agent-Friendly**: Clear input/output with minimal context switching

## Tasks

- [x] 1. Extend FlowchartNode interface to support image icons
  - File: `src/components/flowchart/flowchartData.ts`
  - Change `icon: LucideIcon` to `icon: LucideIcon | string`
  - Update JSDoc comment to document string as image path
  - Purpose: Enable type-safe support for both icon types
  - _Leverage: existing FlowchartNode interface_
  - _Requirements: 1.1_

- [x] 2. Add image icon detection in FlowchartNode component
  - File: `src/components/flowchart/FlowchartNode.tsx`
  - Add `isImageIcon` flag: `const isImageIcon = typeof icon === 'string'`
  - Update icon destructuring to preserve original variable name
  - Purpose: Determine rendering approach at runtime
  - _Leverage: existing FlowchartNode component logic_
  - _Requirements: 1.1_

- [x] 3. Implement conditional icon rendering in FlowchartNode
  - File: `src/components/flowchart/FlowchartNode.tsx`
  - Add conditional rendering in SVG icon group
  - Use `<image>` element for image paths with 20x20 dimensions
  - Use Lucide component for icon objects with color styling
  - Purpose: Render both icon types correctly in SVG
  - _Leverage: existing icon positioning via getIconPosition()_
  - _Requirements: 1.1, 3.1, 3.2_

- [x] 4. Add Jenkins node to flowchart data
  - File: `src/components/flowchart/flowchartData.ts`
  - Add node with id: 'jenkins', label: 'Jenkins CI', icon: '/jenkins.png'
  - Position at (550, 350) below Merge Request node
  - Purpose: Create the Jenkins CI node in the pipeline
  - _Leverage: existing flowchartNodes array structure_
  - _Requirements: 2.1, 2.2_

- [x] 5. Add edge connection to Jenkins node
  - File: `src/components/flowchart/flowchartData.ts`
  - Add edge from 'merge-request' to 'jenkins' with label 'Trigger CI'
  - Type: 'forward' (no icon needed)
  - Purpose: Connect Jenkins to the workflow sequence
  - _Leverage: existing flowchartEdges array structure_
  - _Requirements: 2.3_

- [x] 6. Verify implementation
  - Run `npm run build` to verify TypeScript compilation
  - Start dev server and navigate to `/cicd-workflow`
  - Verify Jenkins node renders with image icon
  - Purpose: Ensure feature works correctly
  - _Requirements: All_

## Implementation Status

**Status:** COMPLETED

All tasks have been implemented and verified:
- TypeScript build passes
- Dev server runs without errors
- Jenkins node displays correctly in flowchart at http://localhost:3001/cicd-workflow