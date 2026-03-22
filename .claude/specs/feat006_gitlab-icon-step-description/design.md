# Design: GitLab Icon in Code Submission Step

## Overview
Add a GitLab icon image to the StepDescription component for the "Code Submission" step, enhancing visual identification of the GitLab platform involvement.

## Architecture

### Current State Analysis
- StepDescription component displays step information based on `activeNode`
- Each step has: `title`, `description`, `icon` (lucide-react), `accent` color
- The `developer` step currently uses `User` icon from lucide-react
- Image icons are used in flowchartData.ts (e.g., `icon: '/jenkins.png'`)

### Design Approach

#### Option 1: Inline Image in Description Text (Recommended)
Insert the GitLab icon image inline within the description text using `<img>` tag.

```
"The developer pushes feature branch code to the [GitLab] repository."
```

Where [GitLab] is replaced with an `<img>` tag displaying the GitLab icon.

#### Option 2: Additional Icon Field
Add an optional `imageIcon` field to the StepInfo interface.

**Selected**: Option 1 - simpler, more direct implementation.

## Component Changes

### StepDescription.tsx

#### Modified StepInfo Interface
```typescript
interface StepInfo {
  title: string;
  description: string | React.ReactNode;  // Changed to allow React node
  icon: React.ComponentType<...>;
  accent: string;
}
```

#### Updated Developer Step
```typescript
developer: {
  title: 'Code Submission',
  description: (
    <>
      The developer pushes feature branch code to the{' '}
      <img src="/gitlab.png" alt="GitLab" className="inline-block w-5 h-5 mx-1 align-middle" />
      {' '}repository.
    </>
  ),
  icon: User,
  accent: '#3b82f6',
},
```

## File Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `src/components/flowchart/StepDescription.tsx` | Modify | Update `developer` step description to include GitLab icon |

## Technical Details

### Image Styling
- Size: `w-5 h-5` (20x20px) to match adjacent text
- Alignment: `align-middle` for vertical centering
- Margin: `mx-1` for horizontal spacing
- Display: `inline-block` for proper inline rendering

### Accessibility
- `alt="GitLab"` provided for screen readers
- Icon enhances understanding rather than being critical content

## Testing Considerations
- Verify icon renders correctly in the description
- Check responsive behavior
- Confirm accessibility with screen reader