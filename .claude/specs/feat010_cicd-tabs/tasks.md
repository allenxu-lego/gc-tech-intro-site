# Implementation Plan

## Task Overview

Add multi-tab navigation to the CI/CD Workflow page. Create reusable tab components and three content sections (Why & What, How with existing Flowchart, Our Plan).

## Steering Document Compliance

- Follows `tech.md`: Uses React functional components, TypeScript, Tailwind CSS
- Follows `structure.md`: Components in `src/components/tabs/` and `src/components/cicd-workflow/`
- Reuses existing `Flowchart` component and `BRAND.colors.primary` constant

## Atomic Task Requirements

Each task meets these criteria:
- **File Scope**: 1-3 related files maximum
- **Time Boxing**: 15-30 minutes per task
- **Single Purpose**: One testable outcome
- **Agent-Friendly**: Clear input/output with minimal context switching

## Tasks

- [x] 1. Create TabNavigation component in src/components/tabs/TabNavigation.tsx
  - File: `src/components/tabs/TabNavigation.tsx`
  - Create functional component with TabItem interface and TabNavigationProps
  - Render horizontal tab buttons with active/inactive styling
  - Use yellow brand color for active tab border (from `src/lib/constants.ts`)
  - Add hover and transition effects
  - Purpose: Reusable tab navigation UI component
  - _Leverage: `src/lib/constants.ts` for brand colors_
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Create TabContent component in src/components/tabs/TabContent.tsx
  - File: `src/components/tabs/TabContent.tsx`
  - Create content wrapper (simplified - no animation to avoid layout jitter)
  - Purpose: Tab content container
  - _Requirements: 2.2_

- [x] 3. Create WhyWhyContent component in src/components/cicd-workflow/WhyWhyContent.tsx
  - File: `src/components/cicd-workflow/WhyWhyContent.tsx`
  - Create placeholder content component with heading and descriptive text
  - Use consistent styling with existing page (text-2xl font-bold, text-slate-800)
  - Add centered placeholder text explaining CI/CD purpose
  - Purpose: Content for "Why & What" tab
  - _Leverage: Styling patterns from `src/components/flowchart/StepDescription.tsx`_
  - _Requirements: 3.1_

- [x] 4. Create HowContent component in src/components/cicd-workflow/HowContent.tsx
  - File: `src/components/cicd-workflow/HowContent.tsx`
  - Create wrapper component that renders FlowchartErrorBoundary and Flowchart
  - Simplified wrapper (no extra layout wrapper)
  - No props needed - self-contained wrapper
  - Purpose: Wrapper for existing Flowchart in "How" tab
  - _Leverage: `src/components/flowchart/Flowchart.tsx`, `src/components/flowchart/FlowchartErrorBoundary.tsx`_
  - _Requirements: 3.2, 3.4_

- [x] 5. Create OurPlanContent component in src/components/cicd-workflow/OurPlanContent.tsx
  - File: `src/components/cicd-workflow/OurPlanContent.tsx`
  - Create placeholder content component with heading and roadmap placeholder text
  - Use consistent styling with WhyWhyContent
  - Add centered placeholder text for implementation roadmap
  - Purpose: Content for "Our Plan" tab
  - _Leverage: Styling patterns from `src/components/cicd-workflow/WhyWhyContent.tsx`_
  - _Requirements: 3.3_

- [x] 6. Update cicd-workflow page with tab structure in src/app/cicd-workflow/page.tsx
  - File: `src/app/cicd-workflow/page.tsx`
  - Add useState for activeTab with 'how' as default
  - Define TABS constant array with tab configurations
  - Integrate TabNavigation component at top
  - Use absolute positioning with visibility control for tab content (prevents layout jitter)
  - Use dynamic height calculation with useRef and useEffect
  - Purpose: Main page integration with tab system
  - _Leverage: `src/components/tabs/TabNavigation.tsx`, content components_
  - _Requirements: 1.2, 2.1, 2.3, 2.4_

- [x] 7. Add responsive styling for mobile tab navigation
  - Files: `src/components/tabs/TabNavigation.tsx` (modify), `src/app/globals.css` (modify)
  - Add overflow-x-auto for horizontal scrolling on mobile
  - Add scrollbar-hide utility in globals.css for cleaner mobile appearance
  - Purpose: Mobile-friendly tab navigation
  - _Requirements: 4.2, 4.3_

- [x] 8. Add accessibility attributes to tab components
  - Files: `src/components/tabs/TabNavigation.tsx` (modify)
  - Add role="tablist" to tab container
  - Add role="tab" and aria-selected to each tab button
  - Add keyboard navigation support (Arrow keys, Home, End keys)
  - Purpose: WCAG accessibility compliance
  - _Requirements: Accessibility section_

## Implementation Notes

### Layout Strategy (Final Solution)
To prevent tab switching jitter:
1. All tab panels use `absolute inset-0` positioning (stacked at same position)
2. Visibility controlled via `style={{ visibility: activeTab === 'xxx' ? 'visible' : 'hidden' }}`
3. Container height dynamically calculated via `useRef` and `useEffect`
4. This ensures no layout reflow when switching tabs

### Files Modified in Implementation
- `src/app/cicd-workflow/page.tsx` - Main page with tab integration
- `src/components/tabs/TabNavigation.tsx` - Reusable tab navigation
- `src/components/tabs/TabContent.tsx` - Tab content wrapper (simplified)
- `src/components/cicd-workflow/WhyWhyContent.tsx` - "Why & What" placeholder
- `src/components/cicd-workflow/HowContent.tsx` - Flowchart wrapper
- `src/components/cicd-workflow/OurPlanContent.tsx` - "Our Plan" placeholder
- `src/app/globals.css` - Added `scrollbar-hide` utility
- `src/components/flowchart/Flowchart.tsx` - Removed `transition-all` and redundant `max-w-4xl`