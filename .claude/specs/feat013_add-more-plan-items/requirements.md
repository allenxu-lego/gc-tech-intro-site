# Requirements Document

## Introduction

This feature enhances the "Our Plan" Timeline component by adding visual branding icons to timeline node titles, extending the roadmap with two additional milestones, and implementing a snake layout with semicircular turns for better visual presentation.

## Alignment with Product Vision

This feature supports the product vision of providing a clear, visually engaging roadmap for the GC Technology Enterprise Portal. By adding brand-specific icons to timeline nodes and an intuitive snake layout with directional flow, users can quickly identify technology choices and understand the strategic progression of the DevOps initiative.

## Requirements

### Requirement 1: Title Icon Support for Timeline Nodes

**User Story:** As a stakeholder viewing the roadmap, I want to see brand icons on timeline node titles, so that I can quickly identify the technology or platform associated with each milestone.

#### Acceptance Criteria

1. WHEN the Timeline component renders a node with a title_icon property THEN the system SHALL display the specified image icon to the right of the node title
2. IF a node has no title_icon defined THEN the system SHALL render the title without any additional icon
3. WHEN a title icon is displayed THEN it SHALL be sized appropriately (16x16px) to not overwhelm the title text
4. WHEN a title icon is displayed THEN it SHALL maintain proper alignment with the title text

### Requirement 2: Codeup Icon on Tech Decision Node

**User Story:** As a stakeholder, I want to see the Codeup icon on the "Tech Decision" milestone, so that I understand this decision specifically relates to adopting Codeup as our platform.

#### Acceptance Criteria

1. WHEN the Timeline renders the second node (Tech Decision) THEN the system SHALL display the codeup.png icon to the right of the title
2. WHEN the codeup icon is displayed THEN it SHALL be positioned at the top-right corner of the title area

### Requirement 3: Add "Adopt Jenkins" Milestone

**User Story:** As a stakeholder viewing the roadmap, I want to see the "Adopt Jenkins" milestone, so that I understand the plan includes Jenkins adoption for CI/CD.

#### Acceptance Criteria

1. WHEN the Timeline renders THEN the system SHALL include a milestone with title "Adopt Jenkins" and date "FY27"
2. WHEN the node renders THEN it SHALL display the jenkins-color.png icon to the right of the title
3. WHEN the node renders THEN it SHALL use the Cog Lucide icon for the circular node icon

### Requirement 4: Add "Continuous Optimization" Milestone

**User Story:** As a stakeholder viewing the roadmap, I want to see the "Continuous Optimization" milestone, so that I understand our commitment to ongoing improvement beyond initial implementation.

#### Acceptance Criteria

1. WHEN the Timeline renders THEN the system SHALL include a milestone with title "Continuous Optimization" and date "Future"
2. WHEN the node renders THEN it SHALL NOT display any title icon
3. WHEN the node renders THEN it SHALL use the CircleArrowLeft Lucide icon for the circular node icon

### Requirement 5: Snake Layout with Semicircular Turns

**User Story:** As a stakeholder viewing the roadmap, I want the timeline to wrap across multiple rows with smooth turns, so that it fits well on screen and clearly shows progression direction.

#### Acceptance Criteria

1. WHEN the Timeline renders THEN the system SHALL display nodes in a snake layout with 3 nodes per row
2. WHEN a turn occurs between rows THEN the connection line SHALL curve with a semicircular arc pointing outward
3. WHEN the Timeline renders THEN the layout SHALL apply to all screen sizes

## Non-Functional Requirements

### Performance
- Adding title icons SHALL not significantly impact Timeline rendering performance
- Image loading SHALL use Next.js Image component for optimization

### Security
- Title icon images SHALL be loaded from trusted local sources in the public/ directory only
- IF an image path is invalid or missing THEN the system SHALL gracefully fallback to display the title without an icon

### Reliability
- IF a title icon image fails to load THEN the Timeline SHALL gracefully degrade to display the title without an icon
- The Timeline SHALL render correctly even if title_icon properties are malformed or missing
- The timeline layout SHALL remain stable with 6 nodes across all viewport sizes

### Usability
- Title icons SHALL be visually distinct but not distract from the main timeline flow
- The snake layout SHALL clearly indicate progression direction through connection line styling

### Maintainability
- The TimelineNodeData interface SHALL be extended to support optional title_icon property
- New icon imports SHALL follow existing patterns in the codebase