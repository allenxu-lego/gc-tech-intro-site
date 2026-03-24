# Requirements: Our Plan Timeline

## Introduction

Add an interactive timeline/roadmap visualization to the OurPlanContent tab of the CI/CD Workflow page. The timeline displays project milestones from Feb 2026 to Future with a "metro arrival" animation effect when users click on nodes, showing progress from the start to the selected milestone.

## Alignment with Product Vision

This feature enhances the CI/CD Workflow page by providing a clear visual roadmap of planned milestones, helping stakeholders understand the project timeline and progress. It aligns with the minimalist white-background design and yellow brand theme of the site.

## Requirements

### Requirement 1: Timeline Visualization

**User Story:** As a viewer of the CI/CD Workflow page, I want to see a visual timeline of project milestones, so that I can quickly understand the planned roadmap and key dates.

#### Acceptance Criteria

1. WHEN viewing the OurPlanContent tab THEN the system SHALL display a timeline with 5 milestone nodes
2. WHEN the timeline renders THEN each node SHALL show a minimalist circle with an icon, title above, and date below
3. IF the viewport width is less than 640px THEN the system SHALL display the timeline in a snake/zigzag layout
4. WHEN viewing on any screen size THEN the timeline SHALL be responsive and fit within the content area

### Requirement 2: Milestone Content

**User Story:** As a stakeholder, I want each milestone to have a clear title, date, and representative icon, so that I can quickly identify and understand each phase.

#### Acceptance Criteria

1. WHEN viewing the timeline THEN the system SHALL display the following milestones:
   - Node 1: "Start" with "Feb 2026" date, Flag icon
   - Node 2: "Tech Decision" with "Mar 2026" date, Milestone icon
   - Node 3: "Implementation" with "Apr 2026" date, Pickaxe icon
   - Node 4: "Enable One Coach" with "Jun 2026" date, Rocket icon
   - Node 5: "More products" with "Future" date, SendHorizonal icon
2. WHEN viewing any node THEN the title SHALL appear above the date
3. WHEN viewing any node THEN the icon SHALL be centered inside the circular node

### Requirement 3: Interactive Progress Animation

**User Story:** As a user exploring the timeline, I want to click on a milestone and see an animated progress fill from the start to that node, so that I can visualize the journey and progress like a metro/subway arrival display.

#### Acceptance Criteria

1. WHEN clicking on any milestone node THEN the system SHALL animate a progress line from the first node to the clicked node
2. WHEN the animation plays THEN the progress line SHALL fill progressively using a smooth stroke animation
3. WHEN a node is clicked THEN all nodes from start up to and including the clicked node SHALL turn yellow (cumulative progress)
4. IF a different node is clicked THEN the previous state SHALL update and nodes up to the newly clicked node SHALL be highlighted
5. WHEN the animation completes THEN the progress line and highlighted nodes SHALL remain visible showing the cumulative progress

### Requirement 4: Timeline Connection Lines

**User Story:** As a viewer, I want to see connection lines between milestone nodes, so that I understand the sequence and flow of the roadmap.

#### Acceptance Criteria

1. WHEN viewing the timeline THEN the system SHALL display connection lines that connect adjacent nodes in sequence
2. WHEN no node is selected THEN the system SHALL display the connection lines as gray dashed lines
3. WHEN a node is selected THEN the system SHALL display the connection lines from start to the selected node as solid yellow lines
4. WHEN the timeline uses snake layout THEN the system SHALL render the connection lines following the snake pattern path

### Requirement 5: Visual Design Consistency

**User Story:** As a user, I want the timeline to match the site's design language, so that it feels cohesive with the rest of the application.

#### Acceptance Criteria

1. WHEN viewing the timeline THEN the system SHALL render node circles using the yellow brand color (#EAB308) for active/highlighted state
2. WHEN viewing any element THEN the system SHALL apply styling that matches the minimalist white-background design
3. WHEN interacting with nodes THEN the system SHALL provide visual feedback for hover and click states
4. WHEN viewing icons THEN the system SHALL render them using lucide-react icons consistent with the rest of the site

## Non-Functional Requirements

### Performance

- Timeline animation SHALL complete within 1 second for a smooth user experience
- Initial render SHALL complete within 100ms to avoid layout shift

### Security

- N/A - This feature displays static timeline data with no authentication or data modification requirements

### Reliability

- Timeline SHALL gracefully degrade on browsers without CSS animation support (fallback to static display)
- Timeline SHALL remain functional if JavaScript animation fails (static fallback)

### Accessibility

- Timeline nodes SHALL be keyboard navigable using Tab and Arrow keys
- Selected node SHALL have visible focus indicator
- Screen readers SHALL announce milestone title and date when node is focused

### Usability

- Click targets (nodes) SHALL be at least 44x44 pixels for touch accessibility
- Animation speed SHALL be perceivable but not too slow (0.5-1 second duration)
- Color contrast SHALL meet WCAG 2.1 AA standards

## Out of Scope

- Editing or adding milestones (read-only display)
- Draggable timeline or node reordering
- Detailed milestone descriptions or popups
- Integration with external project management tools

## Technical Constraints

- Must use Framer Motion for animations
- Must use lucide-react for icons
- Must follow existing TypeScript strict mode patterns
- Must integrate with existing tab structure in OurPlanContent