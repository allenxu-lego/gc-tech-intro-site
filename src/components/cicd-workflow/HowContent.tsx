import { Flowchart } from '@/components/flowchart/Flowchart';
import { FlowchartErrorBoundary } from '@/components/flowchart/FlowchartErrorBoundary';

export function HowContent() {
  return (
    <FlowchartErrorBoundary>
      <Flowchart className="w-full" />
    </FlowchartErrorBoundary>
  );
}