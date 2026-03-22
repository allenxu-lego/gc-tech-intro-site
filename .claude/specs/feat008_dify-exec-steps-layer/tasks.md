# Tasks Document

## Overview

This document breaks down the implementation of the Dify Execution Steps Layer into atomic, executable tasks. Each task is designed to be completed in 15-30 minutes by an experienced developer.

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
- [ ] `DIFY_EXECUTION_STEPS` array exported with 4 items in correct order
- [ ] Each item has `id`, `label`, and `icon` properties
- [ ] TypeScript compiles without errors

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
4. Add these to `FlowchartContextValue` interface and provider value

**Acceptance Criteria:**
- [ ] `difyExecStepsVisible` state with setter exported
- [ ] `difyExecStepsCurrentIndex` state with setter exported
- [ ] `resetDifyExecStepsAnimation` callback exported
- [ ] TypeScript compiles without errors

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
- [ ] Clicking nodes before `jenkins-for-dify` hides the Dify layer
- [ ] Clicking `jenkins-for-dify` or successors keeps layer visible
- [ ] Existing `jenkins-for-svc` layer logic unchanged

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
- [ ] Component renders when `difyExecStepsVisible` is true
- [ ] Position is above `e-aliyun-jenkins-dify` edge
- [ ] Uses ice-blue color theme
- [ ] Has spinning gear, progress dots, and auto-scroll

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
- [ ] `DifyExecStepsLayer` rendered in Flowchart SVG
- [ ] Component exported from index.ts
- [ ] No TypeScript errors

---

## Task 6: Trigger Dify Layer on jenkins-for-dify Click

**Requirement References:** REQ-5.1, REQ-5.3

**Files to Modify:**
- `src/components/flowchart/FlowchartNode.tsx`

**Description:**
Add click handler logic to show the Dify execution steps layer when `jenkins-for-dify` node is clicked.

**Implementation Details:**
1. In `FlowchartNode.tsx`, check if node id is `jenkins-for-dify`
2. If so, set `difyExecStepsVisible` to true and reset `difyExecStepsCurrentIndex` to 0
3. Follow same pattern as existing `jenkins-for-svc` trigger

**Acceptance Criteria:**
- [ ] Clicking `jenkins-for-dify` shows the Dify layer
- [ ] Re-clicking resets animation to first item
- [ ] Existing `jenkins-for-svc` trigger unchanged

---

## Task Summary

| Task | File | Complexity |
|------|------|------------|
| 1 | flowchartData.ts | Low |
| 2 | FlowchartContext.tsx | Low |
| 3 | FlowchartContext.tsx | Low |
| 4 | DifyExecStepsLayer.tsx (new) | Medium |
| 5 | Flowchart.tsx, index.ts | Low |
| 6 | FlowchartNode.tsx | Low |

**Total Estimated Files Touched:** 5 files