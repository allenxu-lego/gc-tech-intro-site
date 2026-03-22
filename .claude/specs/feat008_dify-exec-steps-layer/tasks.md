# Tasks Document

## Overview

This document breaks down the implementation of the Dify Execution Steps Layer and StepDescription enhancements into atomic, executable tasks. Each task is designed to be completed in 15-30 minutes by an experienced developer.

---

## Task 1: Add Dify Execution Steps Data

**Requirement References:** REQ-2 (Execution Steps Content)

**Files to Modify:**

- `src/components/flowchart/flowchartData.ts`

**Description:**
Add the `DIFY_EXECUTION_STEPS` constant array with 4 items (Pull DSL, Login Dify, Deploy Workflow, Verify) and corresponding icon imports from lucide-react.

**Implementation Details:**

1. Add icon imports: `Download`, `LogIn`, `CheckCircle` from lucide-react (Rocket already imported)
2. Add `DifyExecutionStepItem` interface (or reuse `ExecutionStepItem`)
3. Export `DIFY_EXECUTION_STEPS` array with 4 items

**Acceptance Criteria:**

- [x] `DIFY_EXECUTION_STEPS` array exported with 4 items in correct order
- [x] Each item has `id`, `label`, and `icon` properties
- [x] TypeScript compiles without errors

---

## Task 2: Add Dify Layer State to FlowchartContext

**Requirement References:** REQ-5 (Layer Visibility Control), REQ-7 (Auto-Scroll Animation)

**Files to Modify:**

- `src/components/flowchart/FlowchartContext.tsx`

**Description:**
Add state variables and handlers for the Dify execution steps layer visibility and current index.

**Implementation Details:**

1. Add `difyExecStepsVisible` state and setter
2. Add `difyExecStepsCurrentIndex` state and setter
3. Add `resetDifyExecStepsAnimation` callback
4. Add `addToCompletedNodes` callback for Production node completion
5. Add these to `FlowchartContextValue` interface and provider value

**Acceptance Criteria:**

- [x] `difyExecStepsVisible` state with setter exported
- [x] `difyExecStepsCurrentIndex` state with setter exported
- [x] `resetDifyExecStepsAnimation` callback exported
- [x] `addToCompletedNodes` callback exported
- [x] TypeScript compiles without errors

---

## Task 3: Update startAnimation to Handle Dify Layer Visibility

**Requirement References:** REQ-5.4 (Hide on predecessor click), REQ-5.5 (Keep visible on successor click)

**Files to Modify:**

- `src/components/flowchart/FlowchartContext.tsx`

**Description:**
Modify the `startAnimation` function to hide the Dify execution steps layer when clicking predecessor nodes.

**Implementation Details:**

1. In `startAnimation`, check if clicked node is before `jenkins-for-dify` in sequence
2. If so, hide Dify layer and reset index to 0
3. Keep existing logic for `jenkins-for-svc` layer intact

**Acceptance Criteria:**

- [x] Clicking nodes before `jenkins-for-dify` hides the Dify layer
- [x] Clicking `jenkins-for-dify` or successors keeps layer visible
- [x] Existing `jenkins-for-svc` layer logic unchanged

---

## Task 4: Create DifyExecStepsLayer Component

**Requirement References:** REQ-1, REQ-3, REQ-4, REQ-6, REQ-7, REQ-8

**Files to Create:**

- `src/components/flowchart/DifyExecStepsLayer.tsx`

**Description:**
Create the `DifyExecStepsLayer` component following the pattern of `ExecutionStepsLayer.tsx`.

**Implementation Details:**

1. Copy structure from `ExecutionStepsLayer.tsx`
2. Use `difyExecStepsVisible`, `difyExecStepsCurrentIndex`, `setDifyExecStepsCurrentIndex` from context
3. Use `DIFY_EXECUTION_STEPS` data
4. Position at y=300 (above edge at y=320)
5. Position at x=375 (centered between x=550 and x=300)

**Acceptance Criteria:**

- [x] Component renders when `difyExecStepsVisible` is true
- [x] Position is above `e-aliyun-jenkins-dify` edge
- [x] Uses ice-blue color theme
- [x] Has spinning gear, progress dots, and auto-scroll

---

## Task 5: Integrate DifyExecStepsLayer into Flowchart

**Requirement References:** REQ-5.1 (Show on jenkins-for-dify click)

**Files to Modify:**

- `src/components/flowchart/Flowchart.tsx`
- `src/components/flowchart/index.ts`

**Description:**
Add the `DifyExecStepsLayer` component to the Flowchart SVG and export it from the index.

**Implementation Details:**

1. Import `DifyExecStepsLayer` in `Flowchart.tsx`
2. Render `<DifyExecStepsLayer />` after `ExecutionStepsLayer` in the SVG
3. Export `DifyExecStepsLayer` from `index.ts`

**Acceptance Criteria:**

- [x] `DifyExecStepsLayer` rendered in Flowchart SVG
- [x] Component exported from index.ts
- [x] No TypeScript errors

---

## Task 6: Trigger Dify Layer on jenkins-for-dify Click

**Requirement References:** REQ-5.1, REQ-5.3

**Files to Modify:**

- `src/components/flowchart/Flowchart.tsx`

**Description:**
Add click handler logic to show the Dify execution steps layer when `jenkins-for-dify` node is clicked.

**Implementation Details:**

1. In `handleNodeClick`, check if node id is `jenkins-for-dify`
2. If so, set `difyExecStepsVisible` to true and reset `difyExecStepsCurrentIndex` to 0
3. Follow same pattern as existing `jenkins-for-svc` trigger

**Acceptance Criteria:**

- [x] Clicking `jenkins-for-dify` shows the Dify layer
- [x] Re-clicking resets animation to first item
- [x] Existing `jenkins-for-svc` trigger unchanged

---

## Task 7: Add Complete Step Descriptions

**Requirement References:** REQ-9 (StepDescription Complete Content)

**Files to Modify:**

- `src/components/flowchart/StepDescription.tsx`

**Description:**
Add detailed descriptions for all 11 workflow steps with inline icons and tool logos.

**Implementation Details:**

1. Add step descriptions for nodes: `developer`, `gitlab`, `merge-request`, `code-review`, `merge-complete`, `deploy-decision`, `jenkins-for-svc`, `aliyun-cloud`, `jenkins-for-dify`, `dify`, `production`
2. Include inline Lucide icons for step sequences
3. Include tool logos (Jenkins, GitLab, Dify, Aliyun) as inline images
4. Add appropriate accent colors for each step

**Acceptance Criteria:**

- [x] All 11 steps have title and description
- [x] Step sequences use inline Lucide icons
- [x] Tool logos appear inline where referenced
- [x] TypeScript compiles without errors

---

## Task 8: Create InfoPopup Component

**Requirement References:** REQ-10 (InfoPopup Component)

**Files to Modify:**

- `src/components/flowchart/StepDescription.tsx`

**Description:**
Create an inline InfoPopup component for displaying additional step details.

**Implementation Details:**

1. Create `InfoPopup` component with `isOpen` state
2. Add Info icon that toggles popup visibility
3. Add X button to close popup
4. Add fade animation (0.15s duration)
5. Use `e.preventDefault()` and `e.stopPropagation()` to prevent event bubbling

**Acceptance Criteria:**

- [x] Clicking Info icon shows popup
- [x] Clicking Info icon again hides popup
- [x] X button closes popup
- [x] Animation completes in 0.15s
- [x] No event bubbling issues

---

## Task 9: Add InfoPopup to Step Descriptions

**Requirement References:** REQ-10 (InfoPopup Component)

**Files to Modify:**

- `src/components/flowchart/StepDescription.tsx`

**Description:**
Add InfoPopup components to relevant step descriptions (e.g., Code Scan in jenkins-for-svc).

**Implementation Details:**

1. Add InfoPopup after "Code Scan" step in `jenkins-for-svc` description
2. Add InfoPopup after "Build Image" step
3. Add InfoPopup after "Push Image" step
4. Include relevant details in each popup content

**Acceptance Criteria:**

- [x] InfoPopup appears next to relevant steps
- [x] Popup content is relevant to the step
- [x] Multiple InfoPopups can be open independently

---

## Task 10: Make Default Icon Clickable

**Requirement References:** REQ-11 (Default State Clickable Icon)

**Files to Modify:**

- `src/components/flowchart/StepDescription.tsx`
- `src/components/flowchart/Flowchart.tsx`

**Description:**
Make the Play icon on default StepDescription clickable to start the workflow.

**Implementation Details:**

1. Add `onStartWorkflow` prop to `StepDescriptionProps`
2. Wrap icon in button when `isDefault` is true
3. Add hover scale effect on the button
4. Pass `handleNodeClick('developer')` as callback from Flowchart

**Acceptance Criteria:**

- [x] Play icon is clickable on default state
- [x] Clicking triggers Developer node click
- [x] Hover shows scale effect
- [x] Non-default icons are not clickable

---

## Task 11: Handle Production Node Completion

**Requirement References:** REQ-12 (Production Node Completion)

**Files to Modify:**

- `src/components/flowchart/Flowchart.tsx`

**Description:**
Add special handling for clicking the active Production node to mark it completed and return to default state.

**Implementation Details:**

1. In `handleNodeClick`, check if `nodeId === 'production' && activeNode === 'production'`
2. If true, call `addToCompletedNodes('production')` and `setActiveNode(null)`
3. Return early to prevent normal animation flow

**Acceptance Criteria:**

- [x] Clicking active Production marks it completed
- [x] `activeNode` is set to null
- [x] StepDescription returns to default state

---

## Task Summary

| Task | File | Complexity | Status |
|------|------|------------|--------|
| 1 | flowchartData.ts | Low | ✅ Complete |
| 2 | FlowchartContext.tsx | Low | ✅ Complete |
| 3 | FlowchartContext.tsx | Low | ✅ Complete |
| 4 | DifyExecStepsLayer.tsx (new) | Medium | ✅ Complete |
| 5 | Flowchart.tsx, index.ts | Low | ✅ Complete |
| 6 | Flowchart.tsx | Low | ✅ Complete |
| 7 | StepDescription.tsx | Medium | ✅ Complete |
| 8 | StepDescription.tsx | Medium | ✅ Complete |
| 9 | StepDescription.tsx | Low | ✅ Complete |
| 10 | StepDescription.tsx, Flowchart.tsx | Low | ✅ Complete |
| 11 | Flowchart.tsx | Low | ✅ Complete |

**Total Files Touched:** 5 files