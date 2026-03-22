# Design: Flowchart Title and Step Description

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              Title (motion.h1)               │
├─────────────────────────────────────────────┤
│                                             │
│              SVG Flowchart                   │
│           (h-[350px] fixed height)           │
│                                             │
├─────────────────────────────────────────────┤
│         StepDescription Component            │
│  ┌─────────────────────────────────────────┐│
│  │  [Badge] [Icon] Title                    ││
│  │         Description text                 ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

## Component Design

### 1. StepDescription Component

**File:** `src/components/flowchart/StepDescription.tsx`

**Props:**

```typescript
interface StepDescriptionProps {
  activeNode: NodeId | null;
}
```

**Internal Structure:**

- `steps` - Record mapping node IDs to step info (title, description, icon, accent color)
- `nodeSequence` - Array defining step order for step number calculation
- Uses `AnimatePresence` with `mode="wait"` for exit/enter transitions

**Step Data Structure:**

```typescript
interface StepInfo {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  accent: string;
}
```

### 2. Flowchart Component Updates

**File:** `src/components/flowchart/Flowchart.tsx`

**Changes:**

- Wrap content in flex column container
- Add motion.h1 title with fade-in animation
- SVG with fixed height `h-[350px]` and viewBox `"0 150 1200 500"`
- Add StepDescription below SVG

**Animation Specs:**

- Title: `initial={{ opacity: 0, y: -20 }}`, animate to full opacity, 0.6s duration
- StepDescription: Crossfade between steps, 0.3s duration

## Step Mapping

| Step | Node ID | Title | Description | Icon | Color |
|------|---------|-------|-------------|------|-------|
| 0 | (default) | CI/CD Pipeline Flow | Click to walk through... | Play | #64748b |
| 1 | developer | Code Submission | Developer pushes feature branch... | User | #3b82f6 |
| 2 | gitlab | Repository Storage | Code is stored and versioned... | Gitlab | #f97316 |
| 3 | merge-request | Merge Request | Creating a merge request triggers... | GitPullRequest | #8b5cf6 |
| 4 | code-review | Code Review | Code is reviewed for quality... | Code2 | #22c55e |
| 5 | merge-complete | Merge Complete | Code successfully merged... | CheckCircle | #10b981 |
| 6 | code-submit | Push Code | Code is pushed to GitLab... | GitPullRequest | #6366f1 |
| 7 | decision | Review Decision | Review feedback determines... | CheckCircle | #eab308 |
| - | changes-required | Changes Required | Changes needed... | GitPullRequest | #ef4444 |

## Styling

**Title:**

```css
text-3xl font-bold text-slate-800 tracking-tight mb-2
```

**SVG:**

```css
w-full max-w-4xl h-[350px] mx-auto
```

**StepDescription Container:**

```css
h-24 flex items-center justify-center
```

**Step Number Badge:**

```css
w-6 h-6 rounded-full text-white text-xs font-bold
background: accent color
```

## Dependencies

- `framer-motion` - Animation library

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Add framer-motion dependency |
| `StepDescription.tsx` | Create | New step description component |
| `Flowchart.tsx` | Modify | Add title, fixed SVG height, and StepDescription |
| `index.ts` | Modify | Export StepDescription |