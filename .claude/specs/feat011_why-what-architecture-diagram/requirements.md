# Requirements: Why & What Architecture Diagram

## Overview

Add a new section to the WhyWhatContent component with an h3 title "It'll look like..." followed by an SVG architecture diagram showing the DevOps infrastructure setup.

## User Stories

### US-1: Architecture Visualization
**As a** viewer of the CI/CD Workflow page,
**I want** to see a visual architecture diagram of the DevOps infrastructure,
**So that** I can quickly understand the system layout and data flow.

### US-2: Animated Flow Indication
**As a** user exploring the architecture,
**I want** to see animated connection lines between components,
**So that** I can easily follow the data flow direction.

### US-3: Collapsible Diagram Section
**As a** user viewing the WhyWhatContent tab,
**I want** to expand/collapse the architecture diagram section,
**So that** I can control the amount of information displayed on screen.

## Acceptance Criteria

### AC-1: New Section with H3 Title and Expand/Collapse
- **WHEN** viewing the WhyWhatContent tab
- **THEN** a new h3 title "It'll look like..." is displayed below the 3 existing expandable items
- **AND** the title has an expand/collapse button with +/- icon
- **AND** clicking the button toggles the visibility of the architecture diagram
- **AND** the button styling matches the other expandable items

### AC-2: Architecture Diagram Layout
- **WHEN** viewing the architecture diagram (expanded state)
- **THEN** an Alibaba Cloud region container is shown as the main boundary
- **AND** two dashed vertical boxes are displayed inside the cloud region
- **AND** left dashed box contains: GitLab (top) and Jenkins (bottom)
- **AND** right dashed box contains: Dify (top) and Kubernetes (bottom)
- **AND** a Developer icon is shown outside the cloud region on the left, horizontally aligned with GitLab
- **AND** Aliyun icon is displayed in the bottom area of the cloud region

### AC-3: Connection Lines with Arrows
- **WHEN** viewing the architecture diagram
- **THEN** a straight animated line connects Developer to GitLab (code submission)
- **AND** a straight animated line connects Jenkins to GitLab (pull code, vertical)
- **AND** a straight diagonal animated line connects Jenkins to Dify (deploy)
- **AND** a straight animated line connects Jenkins to Kubernetes (deploy)
- **AND** all lines have arrow markers indicating flow direction

### AC-4: Icon Representation
- **WHEN** viewing the architecture diagram
- **THEN** Developer displays User icon from lucide-react
- **AND** GitLab, Jenkins, Dify, Kubernetes display their corresponding PNG/SVG icons from `/public/` folder
- **AND** Aliyun icon is displayed in the cloud region
- **AND** each component has a text label below the icon

### AC-5: Animated Lines Style
- **WHEN** viewing the architecture diagram
- **THEN** connection lines use the same animated style as the existing Flowchart component
- **AND** lines have the flowing dash animation effect
- **AND** arrow markers are styled consistently with the Flowchart

### AC-6: Dashed Box Grouping
- **WHEN** viewing the architecture diagram
- **THEN** GitLab and Jenkins are grouped in a vertical dashed box
- **AND** Dify and Kubernetes are grouped in a vertical dashed box
- **AND** dashed boxes are rendered after connection lines (on top layer)

### AC-7: Responsive Design
- **WHEN** viewing the diagram on different screen sizes
- **THEN** the SVG scales responsively using viewBox
- **AND** the diagram fits within the `max-w-2xl` container width

## Out of Scope

- Interactive node clicking (unlike the main Flowchart)
- Step-by-step animation progression
- Execution steps layers

## Technical Constraints

- Must use existing icon files from `/public/` folder (except Developer uses lucide-react User icon)
- Must follow existing SVG patterns from Flowchart component
- Must use Framer Motion for expand/collapse animation
- Must maintain TypeScript strict mode compatibility