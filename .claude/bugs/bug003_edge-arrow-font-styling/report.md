# Bug Report: Edge Arrow and Font Styling

## Summary
Two styling inconsistencies in the CI/CD Flowchart component:
1. Edge arrow appears too thick when highlighted (selected)
2. Inconsistent font sizes across flowchart elements

## Bug Details

### Issue 1: Edge Arrow Thickness

**Current Behavior:**
When an edge is highlighted (selected), the arrow marker becomes noticeably larger/thicker.

**Expected Behavior:**
The arrow size should remain consistent regardless of selection state.

**Root Cause:**
In [FlowchartEdge.tsx:152](src/components/flowchart/FlowchartEdge.tsx#L152), the stroke width changes from `1.5` to `2.5` when highlighted. The arrow markers use `markerUnits="strokeWidth"` (lines 229, 245), causing the arrow to scale proportionally with the stroke width.

```tsx
// Line 152
strokeWidth={isHighlighted ? 2.5 : 1.5}

// Lines 229, 245
markerUnits="strokeWidth"
```

**Proposed Fix:**
Change `markerUnits` from `"strokeWidth"` to `"userSpaceOnUse"` to keep arrow size fixed regardless of stroke width.

---

### Issue 2: Font Size Inconsistency

**Current Behavior:**
- Edge labels: `text-xs` (12px) - in [FlowchartEdge.tsx:196](src/components/flowchart/FlowchartEdge.tsx#L196)
- Node labels: `text-sm` (14px) - in [FlowchartNode.tsx:199](src/components/flowchart/FlowchartNode.tsx#L199)

**Expected Behavior:**
All font sizes should be 12px as specified by the user.

**Root Cause:**
Inconsistent Tailwind CSS classes applied to different text elements.

**Proposed Fix:**
Change node label from `text-sm` to `text-xs` (or explicit `text-[12px]`).

---

## Files Affected

| File | Change Required |
|------|-----------------|
| `src/components/flowchart/FlowchartEdge.tsx` | Change `markerUnits` to `"userSpaceOnUse"` |
| `src/components/flowchart/FlowchartNode.tsx` | Change `text-sm` to `text-xs` |

## Impact

- **Severity**: Low (visual polish only)
- **Scope**: CI/CD Workflow page only
- **User Impact**: Visual consistency improvement

## Acceptance Criteria

- [ ] Arrow marker size remains constant when edge is highlighted
- [ ] All flowchart text elements use 12px font size
- [ ] No regression in edge/node highlighting behavior

## Environment

- Component: CI/CD Flowchart
- Page: `/cicd-workflow`