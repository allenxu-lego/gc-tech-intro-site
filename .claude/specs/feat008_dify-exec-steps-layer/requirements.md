# Requirements Document

## Introduction

Add an interactive execution steps layer above the `e-aliyun-jenkins-dify` edge in the flowchart. This layer displays AI workflow deployment steps (Pull DSL, Login Dify, Deploy Workflow, Verify) with icons. The layer behavior and visual styling will be consistent with the existing `ExecutionStepsLayer` component for the `e-aliyun-jenkins-svc` edge, featuring a spinning gear icon, auto-scroll animation, and click-to-pause/resume functionality. Initially hidden, it is revealed when the user clicks the `jenkins-for-dify` action node.

Additionally, enhance the StepDescription component with:
- Complete descriptions for all 11 steps in the workflow
- InfoPopup component for showing detailed information on hover/click
- Clickable icon on default state to start the workflow

## Alignment with Product Vision

This feature extends the flowchart's interactivity by providing users with a clear visualization of the Jenkins-to-Dify AI workflow deployment pipeline. It demonstrates the technical capabilities of the enterprise portal for both service deployment and AI workflow deployment scenarios, maintaining consistency with the existing ice-blue visual theme.

## Requirements

### Requirement 1: Execution Steps Layer Display

**User Story:** As a user viewing the CI/CD flowchart, I want to see the AI workflow deployment steps displayed in an overlay, so that I understand what actions Jenkins performs when deploying to Dify.

#### Acceptance Criteria

1. WHEN the flowchart renders THEN the execution steps layer SHALL be positioned above the `e-aliyun-jenkins-dify` edge label area
2. WHEN the flowchart initially loads THEN the execution steps layer SHALL be hidden from view
3. WHEN the execution steps layer is visible THEN it SHALL display items in format `{Icon} {Item_Name}` centered within the container

### Requirement 2: Execution Steps Content

**User Story:** As a user, I want to see specific AI workflow deployment steps with recognizable icons, so that I can quickly identify each stage of the deployment process.

#### Acceptance Criteria

1. WHEN the execution steps layer is visible THEN it SHALL contain exactly 4 items in order:
   - Pull DSL
   - Login Dify
   - Deploy Workflow
   - Verify
2. WHEN each item renders THEN it SHALL display an appropriate icon followed by the item name
3. WHEN the layer renders THEN it SHALL have sufficient height to display at least one item without requiring scrolling

### Requirement 3: Ice-Blue Visual Theme (Consistent with Existing Layer)

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

**User Story:** As a user, I want the execution steps layer to appear when I click the Jenkins-for-Dify node, so that I can explore the AI workflow deployment details on demand.

#### Acceptance Criteria

1. WHEN the user clicks the `jenkins-for-dify` action node THEN the execution steps layer SHALL become visible
2. WHEN the execution steps layer becomes visible THEN it SHALL remain visible (no auto-hide)
3. IF the layer is already visible AND the user clicks `jenkins-for-dify` again THEN the auto-scroll animation SHALL restart from the first item
4. WHEN a predecessor node (before `jenkins-for-dify` in sequence) is clicked THEN the execution steps layer SHALL be hidden and reset
5. WHEN a successor node (after `jenkins-for-dify` in sequence) is clicked THEN the execution steps layer SHALL remain visible

### Requirement 6: Click to Pause/Resume

**User Story:** As a user, I want to control the auto-scroll animation by clicking the layer, so that I can pause to read an item or resume the animation.

#### Acceptance Criteria

1. WHEN the user clicks the execution steps layer during auto-scroll THEN the scroll SHALL pause at the current item
2. WHEN the scroll is paused AND the user clicks the layer again THEN the scroll SHALL resume
3. WHEN the last item is displayed AND the user clicks the layer THEN the animation SHALL restart from the first item
4. WHEN the layer is clicked THEN no black outline/focus ring SHALL appear

### Requirement 7: Auto-Scroll Animation

**User Story:** As a user, I want the deployment steps to automatically scroll through one by one, so that I can follow the sequence of the AI workflow deployment process.

#### Acceptance Criteria

1. WHEN the execution steps layer becomes visible THEN the auto-scroll animation SHALL start from the first item
2. WHEN the auto-scroll is running THEN each item SHALL be displayed for the configured duration before transitioning to the next item
3. WHEN the last item (Verify) is reached THEN the scroll SHALL stop and the last item SHALL remain visible
4. WHEN the auto-scroll transitions between items THEN the transition SHALL have a fade effect

### Requirement 8: Fade Animation Effects

**User Story:** As a user, I want smooth fade effects when the layer appears and when items change, so that the experience feels polished and professional.

#### Acceptance Criteria

1. WHEN the execution steps layer becomes visible THEN it SHALL fade in with a smooth transition effect
2. WHEN items transition during auto-scroll THEN the incoming item SHALL fade in

### Requirement 9: StepDescription Complete Content

**User Story:** As a user, I want to see detailed descriptions for all workflow steps, so that I understand each stage of the DevOps process.

#### Acceptance Criteria

1. WHEN any of the 11 nodes is active THEN the StepDescription SHALL display relevant title and description
2. WHEN the description contains step details THEN it SHALL use inline Lucide icons to represent each step
3. WHEN the description references external tools (Jenkins, Dify, GitLab, Aliyun) THEN it SHALL display their logos inline

### Requirement 10: InfoPopup Component

**User Story:** As a user, I want to see additional details about specific steps in a floating popup, so that I can learn more without cluttering the main view.

#### Acceptance Criteria

1. WHEN an Info icon is clicked THEN a floating info box SHALL appear with additional details
2. WHEN the info box is open AND the Info icon is clicked again THEN the box SHALL close
3. WHEN the info box is open AND the X button is clicked THEN the box SHALL close
4. WHEN the info box appears/disappears THEN it SHALL have a smooth fade animation (0.15s duration)

### Requirement 11: Default State Clickable Icon

**User Story:** As a user, I want to start the workflow by clicking the icon on the default StepDescription, so that I can easily begin the interactive walkthrough.

#### Acceptance Criteria

1. WHEN the default StepDescription is displayed THEN the Play icon SHALL be clickable
2. WHEN the Play icon is clicked THEN the workflow SHALL start by triggering the Developer node click
3. WHEN hovering over the clickable icon THEN it SHALL show a scale-up effect

### Requirement 12: Production Node Completion

**User Story:** As a user, I want to complete the workflow by clicking the active Production node, so that I can return to the default state after finishing.

#### Acceptance Criteria

1. WHEN the Production node is active AND is clicked THEN it SHALL be marked as completed
2. WHEN the Production node is completed THEN the StepDescription SHALL return to default state
3. WHEN the Production node is completed THEN `activeNode` SHALL be set to null

## Non-Functional Requirements

### Performance
- The layer fade-in animation SHALL complete within 300ms
- The auto-scroll timer SHALL be precise with no perceptible drift
- The InfoPopup animation SHALL complete within 150ms

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

### Maintainability
- The execution steps data (items and icons) SHALL be configurable in a data file
- The animation timing values SHALL reuse existing constants for consistency