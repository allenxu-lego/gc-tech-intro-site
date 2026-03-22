import { Flowchart } from '@/components/flowchart/Flowchart';
import { FlowchartErrorBoundary } from '@/components/flowchart/FlowchartErrorBoundary';

export default function CICDWorkflowPage() {
  return (
    <div className="flex flex-col items-center p-0 pt-6">
      <FlowchartErrorBoundary>
        <Flowchart className="w-full max-w-4xl" />
      </FlowchartErrorBoundary>
    </div>
  );
}