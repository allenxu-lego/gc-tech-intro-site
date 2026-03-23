# Implementation Plan

## Task Overview
Add Continue button to StepDescription component for navigating through workflow steps.

## Steering Document Compliance
- Follows structure.md component organization in `src/components/flowchart/`
- Uses tech.md patterns: Lucide React icons, Tailwind CSS, React Context
- Maintains existing component architecture with props-based communication

## Atomic Task Requirements
**Each task must meet these criteria for optimal agent execution:**
- **File Scope**: Touches 1-3 related files maximum
- **Time Boxing**: Completable in 15-30 minutes
- **Single Purpose**: One testable outcome per task
- **Specific Files**: Must specify exact files to create/modify
- **Agent-Friendly**: Clear input/output with minimal context switching

## Tasks

- [x] 1. Extend StepDescription props interface
  - File: src/components/flowchart/StepDescription.tsx
  - Add `onContinue?: () => void` prop
  - Add `hasNextStep?: boolean` prop
  - Purpose: Define interface for Continue button functionality
  - _Requirements: 1.1, 2.1_

- [x] 2. Add Continue button to StepDescription JSX
  - File: src/components/flowchart/StepDescription.tsx
  - Import ArrowRightCircleIcon from lucide-react
  - Add button element after step title for non-default steps
  - Apply hover transform effect and tooltip
  - Use step.accent for icon color
  - Purpose: Render Continue button with proper styling
  - _Leverage: Existing button styling patterns in StepDescription.tsx_
  - _Requirements: 1.1, 1.3, 3.1, 3.2_

- [x] 3. Update Flowchart to pass new props
  - File: src/components/flowchart/Flowchart.tsx
  - Destructure triggerNextStep and getNextNode from useFlowchart()
  - Create onContinue callback with production step special handling
  - Pass onContinue and hasNextStep props to StepDescription
  - Purpose: Connect Continue button to navigation logic
  - _Leverage: FlowchartContext.tsx (triggerNextStep, getNextNode)_
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 4. Build and verify implementation
  - Run `npm run build` to verify no TypeScript errors
  - Run `npm run lint` to check code quality
  - Purpose: Ensure implementation is production-ready
  - _Requirements: All_