# Requirements: Flowchart Title and Step Description

## Overview

Add visual elements to the flowchart component to improve user experience:
1. Title at the top of the SVG canvas
2. StepDescription panel at the bottom showing current step details

## User Stories

### US-1: Pipeline Title Display
**As a** user viewing the CI/CD pipeline page,
**I want** to see a clear title above the flowchart,
**So that** I understand what the diagram represents.

**Acceptance Criteria:**
- WHEN the page loads, THEN a title "CI/CD Pipeline Flow" is displayed above the flowchart
- IF animations are enabled, THEN the title fades in with a slide-up animation

### US-2: Step Description Panel
**As a** user interacting with the flowchart,
**I want** to see a description of the current step below the diagram,
**So that** I understand what each step in the pipeline does.

**Acceptance Criteria:**
- WHEN no node is selected, THEN the description shows "Click to walk through the automated code review pipeline."
- WHEN a node is clicked, THEN the description updates to show that step's title and explanation
- WHEN the active node changes, THEN the description animates smoothly with a fade transition
- IF a step is active (not the default), THEN a numbered badge shows the step number

### US-3: Step Icon and Color
**As a** user viewing the step description,
**I want** each step to have a distinct icon and color,
**So that** I can visually distinguish between different pipeline stages.

**Acceptance Criteria:**
- WHEN viewing any step, THEN an icon representing that step is displayed
- WHEN viewing any step, THEN the icon and badge use an accent color appropriate to that step
- WHEN viewing the default state, THEN the icon and text use a neutral gray color

### US-4: SVG Sizing
**As a** user viewing the flowchart,
**I want** the SVG to maintain a consistent size regardless of surrounding elements,
**So that** the diagram is always readable.

**Acceptance Criteria:**
- WHEN the page renders, THEN the SVG has a fixed height of 350px
- WHEN the page renders, THEN the SVG viewBox is "0 150 1200 500"

## Out of Scope

- Subtitle text below the title
- Customizable title text
- Internationalization/localization
- Accessibility beyond basic ARIA labels

## Technical Constraints

- Must use framer-motion for animations (consistent with reference implementation)
- Must integrate with existing FlowchartContext for state management
- Must not break existing flowchart functionality