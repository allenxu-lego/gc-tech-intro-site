# Tasks: Flowchart Title and Step Description

## Overview

Implement title and step description UI for the flowchart component.

---

## Task 1: Install framer-motion dependency

**Requirement:** US-1, US-2
**Files:** `package.json`

- [ ] Run `npm install framer-motion`
- [ ] Verify installation completes successfully

---

## Task 2: Create StepDescription component

**Requirement:** US-2, US-3
**Files:** `src/components/flowchart/StepDescription.tsx` (new)

- [ ] Create component file with TypeScript
- [ ] Define `StepDescriptionProps` interface with `activeNode: NodeId | null`
- [ ] Create `StepInfo` interface for step data structure
- [ ] Define `steps` record mapping all node IDs to step info
- [ ] Define `nodeSequence` array for step number calculation
- [ ] Implement component with AnimatePresence for transitions
- [ ] Add step number badge (only shown when step > 0)
- [ ] Add icon with accent color
- [ ] Add title and description text
- [ ] Apply styling: `h-24 flex items-center justify-center`

---

## Task 3: Update Flowchart component

**Requirement:** US-1, US-2, US-4
**Files:** `src/components/flowchart/Flowchart.tsx`

- [ ] Import `motion` from framer-motion
- [ ] Import `StepDescription` component
- [ ] Wrap return content in flex column container
- [ ] Add motion.h1 title with animation props
- [ ] Set SVG viewBox to `"0 150 1200 500"`
- [ ] Set SVG height to `h-[350px]` (fixed height)
- [ ] Add StepDescription component below SVG
- [ ] Pass `activeNode` prop to StepDescription

---

## Task 4: Update exports

**Requirement:** N/A (housekeeping)
**Files:** `src/components/flowchart/index.ts`

- [ ] Add export for StepDescription component

---

## Task 5: Verify implementation

**Requirement:** All

- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Run `npm run dev` and navigate to `/cicd-workflow`
- [ ] Verify title appears above flowchart
- [ ] Verify SVG maintains correct size (350px height)
- [ ] Click nodes and verify StepDescription updates
- [ ] Verify smooth transitions between steps