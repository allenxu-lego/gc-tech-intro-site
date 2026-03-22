'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';

/**
 * Node sequence for the CI/CD pipeline flowchart.
 * This defines the order in which nodes progress during animation.
 */
export const NODE_SEQUENCE = [
  'developer',
  'gitlab',
  'merge-request',
  'code-review',
  'merge-complete',
  'deploy-decision',
  'jenkins-for-svc',
  'aliyun-cloud',
  'jenkins-for-dify',
  'dify',
  'production',
] as const;

/**
 * All valid node IDs in the flowchart.
 */
export type NodeId = (typeof NODE_SEQUENCE)[number];

/**
 * Animation durations in milliseconds.
 * Based on the animation timeline specification.
 */
export const ANIMATION_DURATIONS = {
  /** Node click feedback - immediate state update */
  NODE_CLICK_FEEDBACK: 100,
  /** Edge highlight stroke-dashoffset transition */
  EDGE_HIGHLIGHT: 300,
  /** Next node pulse @keyframes pulse animation */
  NEXT_NODE_PULSE: 500,
  /** Total animation lock duration */
  ANIMATION_LOCK: 800,
  /** Execution steps layer fade-in animation */
  EXEC_STEPS_LAYER_FADE: 300,
  /** Execution steps item display duration before auto-scroll */
  EXEC_STEPS_ITEM_DISPLAY: 1000,
  /** Execution steps item fade transition duration */
  EXEC_STEPS_ITEM_TRANSITION: 300,
} as const;

/**
 * Get the index of a node in the sequence.
 * Returns -1 if the node is not in the main sequence.
 */
const getNodeIndex = (nodeId: string): number => {
  return NODE_SEQUENCE.indexOf(nodeId as (typeof NODE_SEQUENCE)[number]);
};

interface FlowchartContextValue {
  /** Currently active/highlighted node */
  activeNode: NodeId | null;
  /** Set the active node directly */
  setActiveNode: (id: NodeId | null) => void;
  /** Set of node IDs that have been completed/visited */
  completedNodes: Set<string>;
  /** Reset completed nodes (start fresh) */
  resetCompletedNodes: () => void;
  /** Add a node to the completed set */
  addToCompletedNodes: (nodeId: string) => void;
  /** Whether an animation is currently in progress */
  isAnimating: boolean;
  /** Start an animation for a specific node */
  startAnimation: (nodeId: NodeId) => void;
  /** Advance to the next node in sequence */
  triggerNextStep: () => void;
  /** Get the next node in sequence for a given node */
  getNextNode: (currentNodeId: NodeId) => NodeId | null;
  /** Whether the execution steps layer is visible */
  execStepsVisible: boolean;
  /** Current index in the execution steps auto-scroll */
  execStepsCurrentIndex: number;
  /** Set the execution steps layer visibility */
  setExecStepsVisible: (visible: boolean) => void;
  /** Reset the execution steps animation to the first item */
  resetExecStepsAnimation: () => void;
  /** Set the current index in the execution steps */
  setExecStepsCurrentIndex: (index: number) => void;
  /** Whether the Dify execution steps layer is visible */
  difyExecStepsVisible: boolean;
  /** Current index in the Dify execution steps auto-scroll */
  difyExecStepsCurrentIndex: number;
  /** Set the Dify execution steps layer visibility */
  setDifyExecStepsVisible: (visible: boolean) => void;
  /** Reset the Dify execution steps animation to the first item */
  resetDifyExecStepsAnimation: () => void;
  /** Set the current index in the Dify execution steps */
  setDifyExecStepsCurrentIndex: (index: number) => void;
}

const FlowchartContext = createContext<FlowchartContextValue | undefined>(undefined);

export function FlowchartProvider({ children }: { children: ReactNode }) {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [execStepsVisible, setExecStepsVisible] = useState(false);
  const [execStepsCurrentIndex, setExecStepsCurrentIndex] = useState(0);
  const [difyExecStepsVisible, setDifyExecStepsVisible] = useState(false);
  const [difyExecStepsCurrentIndex, setDifyExecStepsCurrentIndex] = useState(0);

  /**
   * Ref-based animation lock for immediate click blocking (AC-7).
   * This prevents race conditions with React state batching that could allow
   * multiple rapid clicks to start animations before isAnimating state updates.
   */
  const isAnimatingRef = useRef(false);

  /**
   * Ref to track the current animation timeout for cleanup.
   */
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Cleanup effect to clear animation timeout on unmount.
   * Prevents memory leaks and state updates after unmount.
   */
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Gets the next node in the sequence based on current mode.
   */
  const getNextNode = useCallback((currentNodeId: NodeId): NodeId | null => {
    // Standard sequence progression
    const currentIndex = NODE_SEQUENCE.indexOf(currentNodeId);
    if (currentIndex === -1) {
      return null;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= NODE_SEQUENCE.length) {
      return null;
    }

    return NODE_SEQUENCE[nextIndex];
  }, []);

  /**
   * Starts an animation for a specific node.
   * Clears completed status for all nodes after the clicked node.
   */
  const startAnimation = useCallback((nodeId: NodeId) => {
    // AC-7: Use ref for immediate blocking to prevent race conditions
    if (isAnimatingRef.current) {
      return;
    }

    // Clean up any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Set the ref-based lock immediately
    isAnimatingRef.current = true;

    // Get the index of the clicked node
    const clickedIndex = getNodeIndex(nodeId);

    // Hide ExecutionStepsLayer if clicking a predecessor of jenkins-for-svc
    const jenkinsForSvcIndex = NODE_SEQUENCE.indexOf('jenkins-for-svc');
    if (clickedIndex < jenkinsForSvcIndex) {
      setExecStepsVisible(false);
      setExecStepsCurrentIndex(0);
    }

    // Hide DifyExecStepsLayer if clicking a predecessor of jenkins-for-dify
    const jenkinsForDifyIndex = NODE_SEQUENCE.indexOf('jenkins-for-dify');
    if (clickedIndex < jenkinsForDifyIndex) {
      setDifyExecStepsVisible(false);
      setDifyExecStepsCurrentIndex(0);
    }

    // Clear completed status for all nodes after the clicked node
    setCompletedNodes((prev) => {
      const newSet = new Set<string>();
      prev.forEach((id) => {
        const nodeIndex = getNodeIndex(id);
        // Only keep nodes that are before (or at) the clicked node
        if (nodeIndex !== -1 && nodeIndex < clickedIndex) {
          newSet.add(id);
        }
      });
      return newSet;
    });

    // Set the node as active
    setActiveNode(nodeId);
    setIsAnimating(true);

    // Release animation lock after duration
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
      animationTimeoutRef.current = null;

      // Mark the node as completed when animation finishes
      setCompletedNodes((prev) => new Set(prev).add(nodeId));
    }, ANIMATION_DURATIONS.ANIMATION_LOCK);
  }, []);

  /**
   * Triggers progression to the next step in the sequence.
   */
  const triggerNextStep = useCallback(() => {
    if (isAnimatingRef.current) {
      return;
    }

    if (!activeNode) {
      startAnimation('developer');
      return;
    }

    const nextNode = getNextNode(activeNode);
    if (nextNode) {
      startAnimation(nextNode);
    }
  }, [activeNode, getNextNode, startAnimation]);

  /**
   * Resets the completed nodes set.
   */
  const resetCompletedNodes = useCallback(() => {
    setCompletedNodes(new Set());
    setActiveNode(null);
  }, []);

  /**
   * Adds a node to the completed set.
   */
  const addToCompletedNodes = useCallback((nodeId: string) => {
    setCompletedNodes((prev) => new Set(prev).add(nodeId));
  }, []);

  /**
   * Resets the execution steps animation to the first item.
   */
  const resetExecStepsAnimation = useCallback(() => {
    setExecStepsCurrentIndex(0);
  }, []);

  /**
   * Resets the Dify execution steps animation to the first item.
   */
  const resetDifyExecStepsAnimation = useCallback(() => {
    setDifyExecStepsCurrentIndex(0);
  }, []);

  return (
    <FlowchartContext.Provider
      value={{
        activeNode,
        setActiveNode,
        completedNodes,
        resetCompletedNodes,
        addToCompletedNodes,
        isAnimating,
        startAnimation,
        triggerNextStep,
        getNextNode,
        execStepsVisible,
        execStepsCurrentIndex,
        setExecStepsVisible,
        resetExecStepsAnimation,
        setExecStepsCurrentIndex,
        difyExecStepsVisible,
        difyExecStepsCurrentIndex,
        setDifyExecStepsVisible,
        resetDifyExecStepsAnimation,
        setDifyExecStepsCurrentIndex,
      }}
    >
      {children}
    </FlowchartContext.Provider>
  );
}

/**
 * Hook to access the FlowchartContext.
 * Must be used within a FlowchartProvider.
 */
export function useFlowchart() {
  const context = useContext(FlowchartContext);
  if (context === undefined) {
    throw new Error('useFlowchart must be used within a FlowchartProvider');
  }
  return context;
}