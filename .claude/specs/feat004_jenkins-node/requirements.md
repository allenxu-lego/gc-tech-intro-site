# Requirements Document

## Introduction

This feature extends the CI/CD flowchart system to support custom image icons for nodes, enabling the use of brand logos and custom graphics alongside the existing Lucide React icon library. The initial implementation adds a Jenkins CI node with the Jenkins logo.

## Alignment with Product Vision

This feature enhances the visual fidelity of the CI/CD workflow visualization by allowing external tool logos (like Jenkins, GitHub Actions, etc.) to be displayed directly in flowchart nodes, improving user recognition and workflow clarity.

## Requirements

### Requirement 1: Custom Image Icon Support

**User Story:** As a developer viewing the CI/CD flowchart, I want to see actual tool logos (like Jenkins) instead of generic icons, so that I can quickly identify which tools are used in each pipeline stage.

#### Acceptance Criteria

1. WHEN a node is configured with an image path (string) as icon THEN the system SHALL render the image inside the node
2. WHEN a node is configured with a Lucide icon component THEN the system SHALL render the Lucide icon (existing behavior)
3. IF the image file does not exist THEN the system SHALL display an empty icon area without breaking the flowchart

### Requirement 2: Jenkins CI Node

**User Story:** As a developer, I want to see a Jenkins CI node in the CI/CD workflow, so that I can understand how Jenkins integrates into our pipeline.

#### Acceptance Criteria

1. WHEN the flowchart loads THEN the system SHALL display a Jenkins node with the Jenkins logo
2. WHEN viewing the flowchart THEN the Jenkins node SHALL be positioned below the Merge Request node
3. WHEN the Merge Request node is active THEN the edge connecting to Jenkins SHALL animate to show the workflow path

### Requirement 3: Node State Behavior

**User Story:** As a developer interacting with the flowchart, I want image icons to maintain their original appearance, so that brand logos remain recognizable.

#### Acceptance Criteria

1. WHEN a node with an image icon becomes active THEN the image SHALL display without color tinting
2. WHEN a node with an image icon becomes completed THEN the image SHALL display without color tinting
3. WHEN a node with an image icon is in idle state THEN the image SHALL display with full opacity

## Non-Functional Requirements

### Performance
- Image icons should load efficiently and not delay flowchart rendering
- SVG `<image>` elements should be used for optimal scaling

### Maintainability
- The icon type system should support both Lucide icons and image paths without complex conditionals
- New image icons can be added by simply specifying the image path in node data

### Usability
- Image icons should be sized consistently with Lucide icons (20x20 pixels)
- Image icons should be centered within nodes following existing positioning logic