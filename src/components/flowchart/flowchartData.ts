import CICDWorkflowPage from '@/app/cicd-workflow/page';
import type { LucideIcon } from 'lucide-react';
import {
  User,
  Flag,
  GitBranch,
  Gitlab,
  GitPullRequest,
  Code,
  CircleHelp,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Code2Icon,
  GitMerge,
  GitPullRequestArrow,
  GitCommit,
  GitPullRequestCreate,
  Play,
  CirclePlay,
  Cloud,
  ArrowLeft,
  FlameKindlingIcon,
  CloudCog,
  CloudCheck,
  CloudCheckIcon,
  CloudIcon,
  CircleHelpIcon,
  CheckCircle2Icon,
  CheckCheckIcon,
  TestTube,
  Search,
  Package,
  Upload,
  Rocket,
  FlagIcon,
  Download,
  LogIn,
} from 'lucide-react';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents a single node in the CI/CD flowchart.
 */
export interface FlowchartNode {
  /** Unique identifier for the node */
  id: string;
  /** Display text for the node */
  label: string;
  /** React icon component from lucide-react, or image path string */
  icon: LucideIcon | string;
  /** Visual type of the node */
  type: 'actor' | 'action' | 'decision' | 'endpoint';
  /** SVG coordinates for positioning */
  position: { x: number; y: number };
}

/**
 * Represents a connection between two nodes in the flowchart.
 */
export interface FlowchartEdge {
  /** Unique identifier for the edge */
  id: string;
  /** Source node ID */
  from: string;
  /** Target node ID */
  to: string;
  /** Optional label displayed on the edge */
  label?: string;
  /** Edge style type */
  type: 'forward' | 'loop';
  /** Optional icon displayed next to the label */
  icon?: LucideIcon;
}

/**
 * Represents a single execution step in the CI/CD pipeline.
 */
export interface ExecutionStepItem {
  /** Unique identifier for the step */
  id: string;
  /** Display text for the step */
  label: string;
  /** Lucide icon component for the step */
  icon: LucideIcon;
}

// ============================================================================
// Flowchart Nodes Data
// ============================================================================

/**
 * All nodes in the CI/CD pipeline flowchart.
 * Arranged to display the complete workflow from developer to merge completion.
 */
export const flowchartNodes: FlowchartNode[] = [
  {
    id: 'developer',
    label: 'Developer',
    icon: User,
    type: 'actor',
    position: { x: 50, y: 20 },
  },
  {
    id: 'gitlab',
    label: 'GitLab Repo',
    icon: Gitlab,
    type: 'action',
    position: { x: 300, y: 20 },
  },
  {
    id: 'merge-request',
    label: 'Pull Request',
    icon: GitPullRequest,
    type: 'action',
    position: { x: 550, y: 20 },
  },
  {
    id: 'code-review',
    label: 'Code Review',
    type: 'action',
    icon: Code2Icon,
    position: { x: 800, y: 20 },
  },
  {
    id: 'merge-complete',
    label: 'Merge Complete',
    icon:  CheckCheckIcon,
    type: 'action',
    position: { x: 800, y: 170 },
  },
  {
    id: 'deploy-decision',
    label: 'App/AI Workflow?',
    icon: CircleHelpIcon,
    type: 'decision',
    position: { x: 535, y: 155 },
  },
  {
    id: 'jenkins-for-svc',
    label: 'CI/CD for Service',
    icon: '/jenkins.png',
    type: 'action',
    position: { x: 300, y: 170 },
  },
  {
    id: 'aliyun-cloud',
    label: 'Ali Cloud',
    icon: CloudIcon,
    type: 'action',
    position: { x: 50, y: 170 },
  },
  {
    id: 'jenkins-for-dify',
    label: 'CI/CD for Workflow',
    icon: '/jenkins.png',
    type: 'action',
    position: { x: 550, y: 320 },
  },
  {
    id: 'dify',
    label: 'AI Platform',
    icon: '/dify-bw.svg',
    type: 'action',
    position: { x: 300, y: 320 },
  },
  {
    id: 'production',
    label: 'Live',
    icon: CloudCheckIcon,
    type: 'endpoint',
    position: { x: 50, y: 320 },
  },

];

// ============================================================================
// Flowchart Edges Data
// ============================================================================

/**
 * All edges connecting nodes in the CI/CD pipeline flowchart.
 * Includes both forward progression and loop-back paths.
 */
export const flowchartEdges: FlowchartEdge[] = [
  {
    id: 'e1',
    from: 'developer',
    to: 'gitlab',
    label: 'Push Code',
    type: 'forward',
    icon: GitCommit,
  },
  {
    id: 'e-create-mr',
    from: 'gitlab',
    to: 'merge-request',
    label: 'Create',
    type: 'forward',
    icon: GitPullRequestCreate,
  },
  {
    id: 'e-trigger-code-review',
    from: 'merge-request',
    to: 'code-review',
    label: 'Trigger',
    type: 'forward',
    icon: Code2Icon,
  },
  {
    id: 'e-merge-complete',
    from: 'code-review',
    to: 'merge-complete',
    label: 'Merge',
    type: 'forward',
    icon: GitMerge,
  },
  {
    id: 'e-deploy-decision',
    from: 'merge-complete',
    to: 'deploy-decision',
    label: 'Run Pipeline',
    type: 'forward',
    icon: Play,
  },
  {
    id: 'e-jenkins-svc',
    from: 'deploy-decision',
    to: 'jenkins-for-svc',
    label: 'Deploy',
    type: 'forward',
    icon: CirclePlay,
  },
  {
    id: 'e-aliyun-jenkins-svc',
    from: 'jenkins-for-svc',
    to: 'aliyun-cloud',
    type: 'forward',
    icon: ArrowLeft,
  },
  {
    id: 'e-jenkins-dify',
    from: 'deploy-decision',
    to: 'jenkins-for-dify',
    label: 'Deploy',
    type: 'forward',
    icon: CirclePlay,
  },
  {
    id: 'e-aliyun-jenkins-dify',
    from: 'jenkins-for-dify',
    to: 'dify',
    type: 'forward',
    icon: ArrowLeft,
  },
  {
    id: 'e-aliyun-production',
    from: 'aliyun-cloud',
    to: 'production',
    label: 'Go Live',
    icon: FlagIcon,
    type: 'forward',
  },
  {
    id: 'e-dify-production',
    from: 'dify',
    to: 'production',
    label: 'Go Live',
    icon: FlagIcon,
    type: 'forward',
  },
];

// ============================================================================
// Execution Steps Data
// ============================================================================

/**
 * Execution steps displayed in the CI/CD pipeline layer.
 * Represents the sequence of operations performed by Jenkins.
 */
export const EXECUTION_STEPS: ExecutionStepItem[] = [
  { id: 'pull-code', label: 'Pull Code', icon: GitPullRequest },
  { id: 'unit-test', label: 'Unit Test', icon: TestTube },
  { id: 'scan', label: 'Scan', icon: Search },
  { id: 'build-image', label: 'Build Image', icon: Package },
  { id: 'push-image', label: 'Push Image', icon: Upload },
  { id: 'deploy', label: 'Deploy', icon: Rocket },
];

/**
 * Execution steps displayed in the Dify AI workflow deployment layer.
 * Represents the sequence of operations performed when deploying to Dify.
 */
export const DIFY_EXECUTION_STEPS: ExecutionStepItem[] = [
  { id: 'pull-dsl', label: 'Pull DSL', icon: Download },
  { id: 'login-dify', label: 'Login Dify', icon: LogIn },
  { id: 'deploy-workflow', label: 'Deploy', icon: Rocket },
  { id: 'verify', label: 'Verify', icon: CheckCircle },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Gets a node by its ID.
 * @param id - The node identifier
 * @returns The node if found, undefined otherwise
 */
export function getNodeById(id: string): FlowchartNode | undefined {
  return flowchartNodes.find((node) => node.id === id);
}

/**
 * Gets all edges originating from a specific node.
 * @param nodeId - The source node identifier
 * @returns Array of edges from the specified node
 */
export function getEdgesFromNode(nodeId: string): FlowchartEdge[] {
  return flowchartEdges.filter((edge) => edge.from === nodeId);
}

/**
 * Gets all edges leading to a specific node.
 * @param nodeId - The target node identifier
 * @returns Array of edges to the specified node
 */
export function getEdgesToNode(nodeId: string): FlowchartEdge[] {
  return flowchartEdges.filter((edge) => edge.to === nodeId);
}