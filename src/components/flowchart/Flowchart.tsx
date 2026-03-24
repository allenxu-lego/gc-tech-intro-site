'use client';

import { motion } from 'framer-motion';
import { FlowchartProvider, useFlowchart } from './FlowchartContext';
import { FlowchartNode } from './FlowchartNode';
import { FlowchartEdge, FlowchartArrowMarkers } from './FlowchartEdge';
import { ExecutionStepsLayer } from './ExecutionStepsLayer';
import { DifyExecStepsLayer } from './DifyExecStepsLayer';
import { flowchartNodes, flowchartEdges, getNodeById, getEdgesFromNode } from './flowchartData';
import StepDescription from './StepDescription';
import type { NodeId } from './FlowchartContext';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Props for the Flowchart component.
 */
export interface FlowchartProps {
  /** Optional className for additional styling */
  className?: string;
}

// ============================================================================
// Node Dimensions (for edge positioning)
// ============================================================================

/**
 * Node dimensions based on the design specification.
 * Used to calculate edge connection points.
 */
const NODE_DIMENSIONS = {
  actor: { width: 120, height: 70 },
  action: { width: 120, height: 70 },
  decision: { width: 150, height: 100 },
  endpoint: { width: 120, height: 70 },
} as const;

// ============================================================================
// Inner Component (uses context)
// ============================================================================

/**
 * Inner component that renders the flowchart content.
 * Must be used within a FlowchartProvider.
 */
function FlowchartContent({ className }: FlowchartProps) {
  const {
    activeNode,
    completedNodes,
    isAnimating,
    startAnimation,
    execStepsVisible,
    setExecStepsVisible,
    resetExecStepsAnimation,
    difyExecStepsVisible,
    setDifyExecStepsVisible,
    resetDifyExecStepsAnimation,
    setActiveNode,
    addToCompletedNodes,
    triggerNextStep,
    getNextNode,
  } = useFlowchart();

  // Get the next node IDs (targets of edges from active node)
  const getNextNodeIds = (): string[] => {
    if (!activeNode) return [];
    const edges = getEdgesFromNode(activeNode);
    return edges.map((edge) => edge.to);
  };

  const nextNodeIds = getNextNodeIds();

  /**
   * Calculates the starting point for an edge from a source node.
   * Returns the center-right point of the source node for horizontal connections,
   * or center-bottom for vertical connections.
   */
  const getEdgeStartPoint = (nodeId: string, targetNodeId: string) => {
    const node = getNodeById(nodeId);
    if (!node) return { x: 0, y: 0 };

    const targetNode = getNodeById(targetNodeId);
    const nodeType = node.type as keyof typeof NODE_DIMENSIONS;
    const dimensions = NODE_DIMENSIONS[nodeType];

    const centerX = node.position.x + dimensions.width / 2;
    const centerY = node.position.y + dimensions.height / 2;

    // Determine if connection is primarily horizontal or vertical
    if (targetNode) {
      const dx = targetNode.position.x - node.position.x;
      const dy = targetNode.position.y - node.position.y;

      // If target is to the right, exit from right side
      if (dx > 50) {
        return { x: node.position.x + dimensions.width, y: centerY };
      }
      // If target is to the left, exit from left side
      if (dx < -50) {
        return { x: node.position.x, y: centerY };
      }
      // If target is below, exit from bottom
      if (dy > 50) {
        return { x: centerX, y: node.position.y + dimensions.height };
      }
      // If target is above, exit from top
      if (dy < -50) {
        return { x: centerX, y: node.position.y };
      }
    }

    // Default: exit from right side
    return { x: node.position.x + dimensions.width, y: centerY };
  };

  /**
   * Calculates the ending point for an edge to a target node.
   * Returns the center-left point of the target node for horizontal connections,
   * or center-top for vertical connections.
   */
  const getEdgeEndPoint = (nodeId: string, sourceNodeId: string) => {
    const node = getNodeById(nodeId);
    if (!node) return { x: 0, y: 0 };

    const sourceNode = getNodeById(sourceNodeId);
    const nodeType = node.type as keyof typeof NODE_DIMENSIONS;
    const dimensions = NODE_DIMENSIONS[nodeType];

    const centerX = node.position.x + dimensions.width / 2;
    const centerY = node.position.y + dimensions.height / 2;

    // Determine if connection is primarily horizontal or vertical
    if (sourceNode) {
      const dx = node.position.x - sourceNode.position.x;
      const dy = node.position.y - sourceNode.position.y;

      // If coming from the left, enter from left side
      if (dx > 50) {
        return { x: node.position.x, y: centerY };
      }
      // If coming from the right, enter from right side
      if (dx < -50) {
        return { x: node.position.x + dimensions.width, y: centerY };
      }
      // If coming from above, enter from top
      if (dy > 50) {
        return { x: centerX, y: node.position.y };
      }
      // If coming from below, enter from bottom
      if (dy < -50) {
        return { x: centerX, y: node.position.y + dimensions.height };
      }
    }

    // Default: enter from left side
    return { x: node.position.x, y: centerY };
  };

  /**
   * Handles node click events.
   * Starts the animation for the clicked node.
   * Also handles the execution steps layers for jenkins-for-svc and jenkins-for-dify nodes.
   * Special case: clicking active Production node marks it completed and resets to default.
   */
  const handleNodeClick = (nodeId: string) => {
    // Special case: Production node is active and clicked again
    // Mark as completed and reset to default state
    if (nodeId === 'production' && activeNode === 'production') {
      addToCompletedNodes('production');
      setActiveNode(null);
      return;
    }

    // Handle execution steps layer for jenkins-for-svc
    if (nodeId === 'jenkins-for-svc') {
      if (execStepsVisible) {
        // Reset animation if already visible
        resetExecStepsAnimation();
      } else {
        setExecStepsVisible(true);
      }
    }

    // Handle execution steps layer for jenkins-for-dify
    if (nodeId === 'jenkins-for-dify') {
      if (difyExecStepsVisible) {
        // Reset animation if already visible
        resetDifyExecStepsAnimation();
      } else {
        setDifyExecStepsVisible(true);
      }
    }

    startAnimation(nodeId as NodeId);
  };

  /**
   * Gets the label for the active node for screen reader announcements.
   */
  const getActiveNodeLabel = (): string => {
    if (!activeNode) return '';
    const node = getNodeById(activeNode);
    return node ? node.label : '';
  };

  /**
   * Checks if a node should show completed state.
   * Direct successors of active node should show isNext, not completed.
   */
  const isNodeCompleted = (nodeId: string): boolean => {
    // Direct successors of active node should not show completed
    if (nextNodeIds.includes(nodeId)) {
      return false;
    }
    return completedNodes.has(nodeId);
  };

  /**
   * Checks if an edge should show completed state.
   * Edges from/to nodes after the active node should not show completed.
   */
  const isEdgeCompleted = (edgeFrom: string): boolean => {
    // If the edge source is a direct successor, don't show completed
    if (nextNodeIds.includes(edgeFrom)) {
      return false;
    }
    return completedNodes.has(edgeFrom);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <motion.h1
        className="text-2xl font-bold text-slate-800 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        hidden={true}
      >
        Git Flow & CI/CD Automation
      </motion.h1>

      {/* Step Description */}
      <div className="mt-2 w-full mb-8">
        <StepDescription
          activeNode={activeNode}
          onStartWorkflow={() => handleNodeClick('developer')}
          onContinue={() => {
            if (activeNode === 'production') {
              addToCompletedNodes('production');
              setActiveNode(null);
            } else {
              triggerNextStep();
            }
          }}
          hasNextStep={activeNode ? getNextNode(activeNode) !== null : false}
        />
      </div>
      {/* Flowchart Container */}
      <div
        className={`flowchart-canvas relative p-0 ${
          className || ''
        }`}
      >
        {/* Screen reader live region for animation announcements */}
        <div role="status" aria-live="polite" className="sr-only">
          {isAnimating ? `Animating to ${getActiveNodeLabel()}` : ''}
        </div>

        {/* Main SVG container */}
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-[350px]"
          role="img"
          aria-label="CI/CD Pipeline Flowchart showing the workflow from Developer code submission through GitLab merge request and code review"
        >
          {/* Arrow markers definition */}
          <FlowchartArrowMarkers />

          {/* Edges layer - rendered first so nodes appear on top */}
          <g className="flowchart-edges">
            {flowchartEdges.map((edge) => {
              const startPoint = getEdgeStartPoint(edge.from, edge.to);
              const endPoint = getEdgeEndPoint(edge.to, edge.from);
              const isHighlighted = activeNode === edge.from;
              const isCompleted = isEdgeCompleted(edge.from);

              return (
                <FlowchartEdge
                  key={edge.id}
                  edge={edge}
                  isHighlighted={isHighlighted}
                  isCompleted={isCompleted}
                  startX={startPoint.x}
                  startY={startPoint.y}
                  endX={endPoint.x}
                  endY={endPoint.y}
                />
              );
            })}
          </g>

          {/* Execution Steps Layer - above edges, below nodes */}
          <ExecutionStepsLayer />

          {/* Dify Execution Steps Layer - above edges, below nodes */}
          <DifyExecStepsLayer />

          {/* Nodes layer */}
          <g className="flowchart-nodes">
            {flowchartNodes.map((node) => (
              <FlowchartNode
                key={node.id}
                node={node}
                isActive={activeNode === node.id}
                isNext={nextNodeIds.includes(node.id)}
                isCompleted={isNodeCompleted(node.id)}
                isAnimating={isAnimating}
                onClick={handleNodeClick}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component (provides context)
// ============================================================================

/**
 * Main Flowchart component that displays the CI/CD pipeline visualization.
 *
 * Features:
 * - SVG-based flowchart with viewBox for responsive scaling
 * - Dot grid background for visual depth
 * - Interactive nodes with staggered entrance animation
 * - Highlighted edges with path draw animation
 * - Completed state tracking with green accent
 * - Screen reader support with live region announcements
 * - Animation-in-progress indication
 *
 * @param props - The component props
 * @returns The rendered Flowchart component
 */
export function Flowchart(props: FlowchartProps) {
  return (
    <FlowchartProvider>
      <FlowchartContent {...props} />
    </FlowchartProvider>
  );
}