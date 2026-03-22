# Bug Report: Edge Highlight Successor Only

## Summary
When selecting an action node in the CI/CD flowchart, both the incoming (predecessor) and outgoing (successor) edges are highlighted. The expected behavior is to only highlight the outgoing/successor edge.

## Description

### Current Behavior
When a user clicks on a flowchart node (e.g., "Code Submit"), the component highlights all edges connected to that node - both the edge coming into the node (from the previous node) and the edge going out (to the next node).

### Expected Behavior
When a node is selected, only the edge that leads to the **next step** (successor edge) should be highlighted. The edge from the previous node should remain in its default gray state.

## Root Cause

The highlighting logic in [Flowchart.tsx:176](src/components/flowchart/Flowchart.tsx#L176):

```tsx
const isHighlighted = activeNode === edge.from || activeNode === edge.to;
```

This condition highlights an edge if:
1. The active node is the **source** of the edge (`activeNode === edge.from`), OR
2. The active node is the **target** of the edge (`activeNode === edge.to`)

This causes both incoming and outgoing edges to be highlighted when a node is active.

## Impact
- **Severity**: Low (Visual/Cosmetic)
- **User Experience**: Confusing visual feedback that doesn't clearly show the flow direction
- **Affected Component**: Flowchart edge highlighting in CI/CD workflow visualization

## Steps to Reproduce
1. Navigate to `/cicd-workflow` page
2. Click on any action node (e.g., "GitLab" or "Code Submit")
3. Observe that both the edge from the previous node AND the edge to the next node are highlighted in yellow

## Files Involved
- [src/components/flowchart/Flowchart.tsx](src/components/flowchart/Flowchart.tsx) - Contains the edge highlighting logic
- [src/components/flowchart/FlowchartEdge.tsx](src/components/flowchart/FlowchartEdge.tsx) - Edge rendering component

## Suggested Fix
Change the highlighting condition from:
```tsx
const isHighlighted = activeNode === edge.from || activeNode === edge.to;
```

To:
```tsx
const isHighlighted = activeNode === edge.from;
```

This will only highlight edges where the active node is the source, showing the flow direction to the next step.

## Additional Context
- This is part of the CI/CD workflow visualization feature
- The flowchart uses React Context for state management (`FlowchartContext`)
- Animation durations and sequences are defined in `FlowchartContext.tsx`