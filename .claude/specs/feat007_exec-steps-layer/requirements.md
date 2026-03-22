# Requirements Document

## Introduction

Add an interactive execution steps layer above the `e-aliyun-jenkins-svc` edge in the flowchart. This layer displays CI/CD pipeline steps (Pull Code, Unit Test, Scan, Build Image, Push Image, Deploy) with icons in an ice-blue color scheme. The layer features a spinning gear icon at the top and supports click-to-pause/resume functionality. Initially hidden, it is revealed when the user clicks the `jenkins-for-svc` action node.

## Alignment with Product Vision

This feature enhances the flowchart's interactivity and provides users with a clear visualization of the Jenkins CI/CD pipeline steps. It demonstrates the technical capabilities of the enterprise portal with an engaging ice-blue theme that complements the flowchart design.

## Requirements

### Requirement 1: Execution Steps Layer Display

**User Story:** As a user viewing the CI/CD flowchart, I want to see the pipeline execution steps displayed in an overlay, so that I understand what actions Jenkins performs during deployment.

#### Acceptance Criteria

1. WHEN the flowchart renders THEN the execution steps layer SHALL be positioned above the `e-aliyun-jenkins-svc` edge label area
2. WHEN the flowchart initially loads THEN the execution steps layer SHALL be hidden from view
3. WHEN the execution steps layer is visible THEN it SHALL display items in format `{Icon} {Item_Name}` centered within the container

### Requirement 2: Execution Steps Content

**User Story:** As a user, I want to see specific pipeline steps with recognizable icons, so that I can quickly identify each stage of the deployment process.

#### Acceptance Criteria

1. WHEN the execution steps layer is visible THEN it SHALL contain exactly 6 items in order:
   - Pull Code
   - Unit Test
   - Scan
   - Build Image
   - Push Image
   - Deploy
2. WHEN each item renders THEN it SHALL display an appropriate icon followed by the item name
3. WHEN the layer renders THEN it SHALL have sufficient height to display at least one item without requiring scrolling

### Requirement 3: Ice-Blue Visual Theme

**User Story:** As a user, I want the execution steps layer to have a distinctive ice-blue color scheme, so that it stands out visually and matches the flowchart's active state colors.

#### Acceptance Criteria

1. WHEN the layer is visible THEN the background SHALL be light ice-blue (`#f0f9ff`)
2. WHEN the layer is visible THEN the border SHALL be sky-400 (`#38bdf8`)
3. WHEN the layer is visible THEN the icon SHALL be sky-500 (`#0ea5e9`)
4. WHEN the layer is visible THEN the text SHALL be sky-700 (`#0369a1`)
5. WHEN the layer is visible THEN progress dots SHALL use ice-blue colors (active: `#38bdf8`, inactive: `#bae6fd`)

### Requirement 4: Spinning Gear Animation

**User Story:** As a user, I want to see a spinning gear icon at the top of the layer, so that I can visually identify that a process is in progress.

#### Acceptance Criteria

1. WHEN the layer is visible THEN a gear icon (Settings from Lucide) SHALL be displayed at the top
2. WHEN the auto-scroll is running THEN the gear SHALL spin continuously (1 rotation per second)
3. WHEN the auto-scroll is paused THEN the gear SHALL stop spinning
4. WHEN the last item is reached AND scroll stops THEN the gear SHALL stop spinning

### Requirement 5: Layer Visibility Control

**User Story:** As a user, I want the execution steps layer to appear when I click the Jenkins node, so that I can explore the pipeline details on demand.

#### Acceptance Criteria

1. WHEN the user clicks the `jenkins-for-svc` action node THEN the execution steps layer SHALL become visible
2. WHEN the execution steps layer becomes visible THEN it SHALL remain visible (no auto-hide)
3. IF the layer is already visible AND the user clicks `jenkins-for-svc` again THEN the auto-scroll animation SHALL restart from the first item
4. WHEN a predecessor node (before `jenkins-for-svc` in sequence) is clicked THEN the execution steps layer SHALL be hidden and reset
5. WHEN a successor node (after `jenkins-for-svc` in sequence) is clicked THEN the execution steps layer SHALL remain visible

### Requirement 6: Click to Pause/Resume

**User Story:** As a user, I want to control the auto-scroll animation by clicking the layer, so that I can pause to read an item or resume the animation.

#### Acceptance Criteria

1. WHEN the user clicks the execution steps layer during auto-scroll THEN the scroll SHALL pause at the current item
2. WHEN the scroll is paused AND the user clicks the layer again THEN the scroll SHALL resume
3. WHEN the last item is displayed AND the user clicks the layer THEN the animation SHALL restart from the first item
4. WHEN the layer is clicked THEN no black outline/focus ring SHALL appear

### Requirement 7: Auto-Scroll Animation

**User Story:** As a user, I want the pipeline steps to automatically scroll through one by one, so that I can follow the sequence of the deployment process.

#### Acceptance Criteria

1. WHEN the execution steps layer becomes visible THEN the auto-scroll animation SHALL start from the first item
2. WHEN the auto-scroll is running THEN each item SHALL be displayed for the configured duration before transitioning to the next item
3. WHEN the last item (Deploy) is reached THEN the scroll SHALL stop and the last item SHALL remain visible
4. WHEN the auto-scroll transitions between items THEN the transition SHALL have a fade effect

### Requirement 8: Fade Animation Effects

**User Story:** As a user, I want smooth fade effects when the layer appears and when items change, so that the experience feels polished and professional.

#### Acceptance Criteria

1. WHEN the execution steps layer becomes visible THEN it SHALL fade in with a smooth transition effect
2. WHEN items transition during auto-scroll THEN the incoming item SHALL fade in

## Non-Functional Requirements

### Performance
- The layer fade-in animation SHALL complete within 300ms
- The auto-scroll timer SHALL be precise with no perceptible drift

### Security
- No sensitive data is processed by this feature
- The execution steps layer is a display-only component with no data input or output

### Reliability
- The auto-scroll timer SHALL be properly cleaned up when the component unmounts to prevent memory leaks
- IF the flowchart context changes during animation THEN the animation state SHALL remain consistent

### Usability
- The layer SHALL not obstruct other interactive elements in the flowchart
- The animation timing SHALL be comfortable for users to read each item name
- Icons SHALL be clearly recognizable at the layer's display size
- Node colors SHALL update instantly without visible transition through gray

### Maintainability
- The execution steps data (items and icons) SHALL be configurable in a data file
- The animation timing values SHALL be defined as constants for easy adjustment