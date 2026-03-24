# Tasks: Why & What Architecture Diagram

## Overview

Add an architecture diagram to the WhyWhatContent component with expand/collapse functionality.

## Prerequisites

- [x] Requirements approved
- [x] Design approved

## Implementation Tasks

### Task 1: Add State and Expand/Collapse Button for Diagram Section
**File:** `src/components/cicd-workflow/WhyWhatContent.tsx`
**Requirement:** AC-1

- [x] Add `isDiagramExpanded` state with `useState(true)`
- [x] Add button wrapper around h3 title "It'll look like..."
- [x] Add Plus/Minus icon toggle inside button
- [x] Add AnimatePresence wrapper around SVG for expand/collapse animation

**Atomic criteria:**
- Single file modification
- Clear visual checkpoint (expand/collapse button visible)

---

### Task 2: Add Cloud Region and Component Nodes
**File:** `src/components/cicd-workflow/WhyWhatContent.tsx`
**Requirement:** AC-2, AC-4

- [x] Add cloud region boundary rect
- [x] Add Developer node with User icon from lucide-react (horizontally aligned with GitLab)
- [x] Add GitLab node with `/gitlab.png` icon
- [x] Add Jenkins node with `/jenkins-color.png` icon
- [x] Add Dify node with `/dify.svg` icon
- [x] Add Kubernetes node with `/kubernetes.png` icon
- [x] Add Aliyun icon (`/aliyun.jpg`) in bottom area of cloud region

**Atomic criteria:**
- Single file modification
- Clear visual checkpoint (all nodes visible with icons)

---

### Task 3: Add Straight Connection Lines with Animation
**File:** `src/components/cicd-workflow/WhyWhatContent.tsx`
**Requirement:** AC-3, AC-5

- [x] Add SVG defs for arrow markers
- [x] Add horizontal line: Developer → GitLab
- [x] Add vertical line: Jenkins → GitLab (pull)
- [x] Add diagonal line: Jenkins → Dify (deploy)
- [x] Add horizontal line: Jenkins → Kubernetes (deploy)
- [x] Apply `flowchart-edge-flowing` animation class to all lines

**Atomic criteria:**
- Single file modification
- Clear visual checkpoint (animated lines visible)

---

### Task 4: Add Dashed Box Grouping
**File:** `src/components/cicd-workflow/WhyWhatContent.tsx`
**Requirement:** AC-6

- [x] Add dashed rect around GitLab and Jenkins (left column)
- [x] Add dashed rect around Dify and Kubernetes (right column)
- [x] Render dashed boxes after connection lines (on top layer)

**Atomic criteria:**
- Single file modification
- Clear visual checkpoint (dashed boxes visible grouping nodes)

---

## Task Summary

| Task | File | Status |
|------|------|--------|
| 1. State & Expand/Collapse | WhyWhatContent.tsx | ✅ Completed |
| 2. Cloud Region & Nodes | WhyWhatContent.tsx | ✅ Completed |
| 3. Connection Lines | WhyWhatContent.tsx | ✅ Completed |
| 4. Dashed Box Grouping | WhyWhatContent.tsx | ✅ Completed |

## Verification Checklist

- [x] `npm run dev` starts without errors
- [x] Architecture diagram visible on "Why & What" tab
- [x] Expand/collapse button works for diagram section
- [x] All 5 nodes (Developer, GitLab, Jenkins, Dify, Kubernetes) visible with icons
- [x] Cloud region boundary visible
- [x] Aliyun icon visible in cloud region
- [x] 4 connection lines visible with arrows (all straight)
- [x] Lines have flowing animation effect
- [x] Dashed boxes group GitLab+Jenkins and Dify+Kubernetes
- [x] Diagram scales responsively on window resize