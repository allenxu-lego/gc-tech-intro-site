# Implementation Plan

## Task Overview
Implement the Execution Steps Layer as an interactive SVG overlay that displays CI/CD pipeline steps with auto-scroll animation, spinning gear icon, click-to-pause functionality, and ice-blue theme. Triggered by clicking the `jenkins-for-svc` action node.

## Steering Document Compliance
- Components placed in `src/components/flowchart/` following structure.md
- TypeScript strict mode with proper interfaces
- CSS animations follow existing globals.css patterns
- State management extends FlowchartContext pattern

## Implementation Status: ✅ COMPLETED

All tasks have been implemented and tested.

## Completed Tasks

- [x] 1. Add execution steps data to flowchartData.ts
  - File: `src/components/flowchart/flowchartData.ts`
  - Defined `ExecutionStepItem` interface with `id`, `label`, `icon` fields
  - Added `EXECUTION_STEPS` array with 6 items (Pull Code, Unit Test, Scan, Build Image, Push Image, Deploy)
  - Imported required Lucide icons (GitPullRequest, TestTube, Search, Package, Upload, Rocket)
  - _Requirements: 2.1, 2.2_

- [x] 2. Add animation timing constants to FlowchartContext.tsx
  - File: `src/components/flowchart/FlowchartContext.tsx`
  - Added `EXEC_STEPS_LAYER_FADE: 300`, `EXEC_STEPS_ITEM_DISPLAY: 1000`, `EXEC_STEPS_ITEM_TRANSITION: 300`
  - _Requirements: 7.2_

- [x] 3. Add execution steps state to FlowchartContext.tsx
  - File: `src/components/flowchart/FlowchartContext.tsx`
  - Added `execStepsVisible`, `execStepsCurrentIndex`, `setExecStepsVisible`, `setExecStepsCurrentIndex`, `resetExecStepsAnimation`
  - Added logic to hide layer when predecessor nodes are clicked
  - _Requirements: 5.4, 5.5_

- [x] 4. Add CSS animation keyframes to globals.css
  - File: `src/app/globals.css`
  - Added `.exec-steps-layer-fade-in`, `.exec-steps-item-fade-in`, `.exec-steps-item-fade-out` classes
  - Added `@keyframes exec-steps-gear-spin` for gear rotation
  - _Requirements: 7.1, 8.1_

- [x] 5. Create ExecutionStepsLayer component
  - File: `src/components/flowchart/ExecutionStepsLayer.tsx`
  - Created component with ice-blue theme styling
  - Added spinning gear icon at top using Settings from Lucide
  - Added centered content with icon and label
  - Added progress dots at bottom
  - _Requirements: 1.1, 1.2, 3.1-3.5_

- [x] 6. Implement auto-scroll animation in ExecutionStepsLayer
  - File: `src/components/flowchart/ExecutionStepsLayer.tsx`
  - Added useEffect with timer that increments index
  - Stops at last item (index 5)
  - Cleans up timer on unmount
  - _Requirements: 7.1-7.4_

- [x] 7. Implement click-to-pause/resume functionality
  - File: `src/components/flowchart/ExecutionStepsLayer.tsx`
  - Added `isPaused` local state
  - Added `handleClick` function for pause/resume/restart
  - Gear stops spinning when paused or at last item
  - Removed focus ring on click
  - _Requirements: 6.1-6.4_

- [x] 8. Add accessibility attributes to ExecutionStepsLayer
  - File: `src/components/flowchart/ExecutionStepsLayer.tsx`
  - Added `role="button"`, `aria-label`, `aria-live="polite"`, `aria-atomic="true"`
  - Added `tabIndex={0}` and `onKeyDown` handler
  - _Requirements: Usability non-functional_

- [x] 9. Export ExecutionStepsLayer from index.ts
  - File: `src/components/flowchart/index.ts`
  - Added export for ExecutionStepsLayer component
  - Added export for EXECUTION_STEPS and ExecutionStepItem type
  - _Requirements: Maintainability_

- [x] 10. Integrate ExecutionStepsLayer into Flowchart.tsx
  - File: `src/components/flowchart/Flowchart.tsx`
  - Imported ExecutionStepsLayer component
  - Rendered after edges but before nodes in SVG hierarchy
  - _Requirements: 1.1, 1.2_

- [x] 11. Add jenkins-for-svc click handler
  - Files: `src/components/flowchart/Flowchart.tsx`, `src/components/flowchart/FlowchartContext.tsx`
  - Modified `handleNodeClick` to show/reset layer for jenkins-for-svc
  - Added predecessor node click logic in `startAnimation` to hide layer
  - _Requirements: 5.1-5.5_

## Additional Improvements Made

### Visual Enhancements
- Deepened yellow text color to `#CA8A04` (yellow-600) for better readability
- Deepened green text color to `#16A34A` (green-600) for better readability
- Changed canvas background to pure white (removed dot grid)
- Removed slow color transitions that caused "gray flash" on node state changes

### Edge Label Behavior
- Edge labels now hidden initially and fade in when predecessor node is clicked
- Labels stay visible when edge is completed

## Files Modified

| File | Changes |
|------|---------|
| `src/components/flowchart/flowchartData.ts` | Added ExecutionStepItem interface and EXECUTION_STEPS array |
| `src/components/flowchart/FlowchartContext.tsx` | Added state, timing constants, and visibility control logic |
| `src/components/flowchart/ExecutionStepsLayer.tsx` | New component with all features |
| `src/components/flowchart/Flowchart.tsx` | Integrated layer, added click handler |
| `src/components/flowchart/FlowchartNode.tsx` | Deepened text colors, removed slow transitions |
| `src/components/flowchart/FlowchartEdge.tsx` | Added fade-in behavior for labels |
| `src/components/flowchart/index.ts` | Exported new component and types |
| `src/app/globals.css` | Added animation keyframes, white canvas background |