# Bug Report: Edge Icon and Loop Overlap

## Bug Name
`edge-icon-loop-overlap`

## Summary
Two related edge rendering issues:
1. Edge labels lack icons - only text is displayed
2. Loop-type edges can overlap with action nodes

## Description

### Issue 1: No Edge Icons

**Current Behavior:**
- Edge labels are rendered as SVG `<text>` elements only
- No icon is displayed to the left of the label text
- Icons exist for nodes (via `<Icon>` component) but not for edges

**Code Location:** `src/components/flowchart/FlowchartEdge.tsx:190-205`
```tsx
{label && (
  <text x={getLabelPosition().x} y={getLabelPosition().y} textAnchor="middle" ...>
    {label}
  </text>
)}
```

**Expected Behavior:**
- Edge labels should display an icon to the left of the text (similar to node icons)
- Icon should follow the same highlight state as the label text

### Issue 2: Loop Edge Overlap

**Current Behavior:**
- Loop edges use a fixed 60px arc offset above the nodes
- This fixed offset can cause the curved path to overlap with nearby action nodes
- No collision detection or dynamic positioning

**Code Location:** `src/components/flowchart/FlowchartEdge.tsx:76-84`
```tsx
if (type === 'loop') {
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 60; // Fixed 60px offset
  return `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`;
}
```

**Expected Behavior:**
- Loop edges should have larger arc height to avoid overlapping action nodes
- The "Resubmit" loop edge from "Changes Required" to "Developer" arcs over intermediate nodes

## Root Cause Analysis

### Issue 1 Root Cause
The `FlowchartEdge` interface in `flowchartData.ts:36-47` has no `icon` property:
```tsx
export interface FlowchartEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  type: 'forward' | 'loop';
  // Missing: icon?: LucideIcon;
}
```

### Issue 2 Root Cause
The loop arc height is hardcoded to 60px, which is insufficient when nodes are positioned close together vertically. The "Changes Required" node is at y=440 and "Developer" is at y=200, with intermediate nodes in between.

## Proposed Solution

### Task 1: Add Icon Support to Edges

1. **Update `FlowchartEdge` interface** in `flowchartData.ts`:
   - Add optional `icon?: LucideIcon` property

2. **Update edge data** in `flowchartData.ts`:
   - Add appropriate icons to each edge (e.g., `ArrowRight` for forward, `RotateCcw` for loop)

3. **Update `FlowchartEdgeProps`** in `FlowchartEdge.tsx`:
   - Receive icon component from edge data

4. **Render icon in label section** in `FlowchartEdge.tsx`:
   - Use SVG `<g>` transform to position icon left of text
   - Apply same color transitions as text (gray-500 default, yellow-600 highlighted)
   - Pattern from `FlowchartNode.tsx:185-192`:
     ```tsx
     <g transform={`translate(${x}, ${y})`}>
       <Icon className={`w-4 h-4 transition-colors ...`} />
     </g>
     ```

### Task 2: Fix Loop Edge Overlap

1. **Increase arc height** in `FlowchartEdge.tsx`:
   - Change fixed offset from 60px to 80px or 100px
   - Alternatively, calculate dynamic arc based on distance between nodes

2. **Update label positioning**:
   - Adjust `getLabelPosition()` for loop type to match new arc height

## Affected Files

| File | Changes |
|------|---------|
| `src/components/flowchart/flowchartData.ts` | Add `icon` property to `FlowchartEdge` interface; add icons to edge data |
| `src/components/flowchart/FlowchartEdge.tsx` | Render icon next to label; increase loop arc height |

## Verification Steps

1. Run `npm run dev` to start development server
2. Navigate to the CI/CD workflow page
3. Verify edge labels show icons to the left of text
4. Verify icons change color when edge is highlighted
5. Verify the "Resubmit" loop edge arcs above action nodes without overlap
6. Test keyboard navigation still works correctly

## Priority
Medium - Visual enhancement that improves diagram readability