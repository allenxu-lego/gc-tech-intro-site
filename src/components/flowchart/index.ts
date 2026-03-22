/**
 * Flowchart components for CI/CD Pipeline visualization.
 *
 * This module exports all components needed to display and interact with
 * the CI/CD pipeline flowchart.
 */

// Main component
export { Flowchart } from './Flowchart';
export type { FlowchartProps } from './Flowchart';

// Error Boundary
export { FlowchartErrorBoundary } from './FlowchartErrorBoundary';

// Context and hooks
export {
  FlowchartProvider,
  useFlowchart,
  NODE_SEQUENCE,
  type NodeId,
  ANIMATION_DURATIONS,
} from './FlowchartContext';

// Sub-components (for advanced usage)
export { FlowchartNode } from './FlowchartNode';
export type { FlowchartNodeProps } from './FlowchartNode';

export { FlowchartEdge, FlowchartArrowMarkers } from './FlowchartEdge';
export type { FlowchartEdgeProps } from './FlowchartEdge';

export { ExecutionStepsLayer } from './ExecutionStepsLayer';

export { DifyExecStepsLayer } from './DifyExecStepsLayer';

export { default as StepDescription } from './StepDescription';

// Data and types
export {
  flowchartNodes,
  flowchartEdges,
  getNodeById,
  getEdgesFromNode,
  getEdgesToNode,
  EXECUTION_STEPS,
  DIFY_EXECUTION_STEPS,
  type FlowchartNode as FlowchartNodeType,
  type FlowchartEdge as FlowchartEdgeType,
  type ExecutionStepItem,
} from './flowchartData';