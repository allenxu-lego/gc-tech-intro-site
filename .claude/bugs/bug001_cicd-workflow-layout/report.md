# Bug Report: CI/CD Workflow Page Layout

**Created:** 2026-03-20
**Status:** Open
**Severity:** Medium

## Summary

The CI/CD Workflow page has layout issues where the page title "CI/CD Workflow" is positioned too far from the SVG flowchart, and the SVG is not fully visible within the page area.

## Description

### Current Behavior
- Page uses `flex flex-col items-center justify-center` which centers everything vertically and horizontally
- Title has `mb-8` (32px margin) creating unnecessary gap
- SVG is centered in the viewport rather than positioned properly
- SVG may not be fully visible due to viewport constraints

### Expected Behavior
- Title should be closer to the SVG flowchart (reduce margin)
- SVG should be aligned to the top-right of the page content area
- SVG should be fully visible within the page boundaries

## Location

**File:** `src/app/cicd-workflow/page.tsx`

## Current Code

```tsx
<div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
  <h1 className="text-2xl font-semibold text-gray-800 mb-8">
    CI/CD Workflow
  </h1>
  <FlowchartErrorBoundary>
    <Flowchart className="w-full max-w-4xl" />
  </FlowchartErrorBoundary>
</div>
```

## Root Cause Analysis

1. `justify-center` vertically centers content, pushing SVG away from top
2. `items-center` horizontally centers SVG instead of right-aligning
3. `mb-8` creates excessive space between title and SVG
4. `min-h-[calc(100vh-64px)]` forces full viewport height even when content doesn't need it

## Proposed Solution

1. Remove `justify-center` to allow content to flow from top
2. Change alignment to position SVG to the right
3. Reduce title margin from `mb-8` to `mb-4`
4. Adjust container to use natural content height

## Acceptance Criteria

- [ ] SVG is aligned to the top-right of the page content area
- [ ] Title "CI/CD Workflow" has reduced spacing from SVG
- [ ] SVG is fully visible within the page boundaries
- [ ] Layout remains responsive and functional

## Related Files

- `src/app/cicd-workflow/page.tsx` - Main page component
- `src/components/flowchart/Flowchart.tsx` - SVG flowchart component
- `src/components/MainContent.tsx` - Parent layout component