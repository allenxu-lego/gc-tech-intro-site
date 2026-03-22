'use client';

import type { FlowchartEdge as FlowchartEdgeType } from './flowchartData';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Props for the FlowchartEdge component.
 */
export interface FlowchartEdgeProps {
  /** The edge data containing id, from, to, label, and type */
  edge: FlowchartEdgeType;
  /** Whether this edge is currently highlighted/active */
  isHighlighted: boolean;
  /** Whether this edge has been traversed (completed) */
  isCompleted?: boolean;
  /** Starting X coordinate for the edge path */
  startX: number;
  /** Starting Y coordinate for the edge path */
  startY: number;
  /** Ending X coordinate for the edge path */
  endX: number;
  /** Ending Y coordinate for the edge path */
  endY: number;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * SVG marker ID for the arrow head.
 */
const ARROW_MARKER_ID = 'flowchart-arrow-marker';

/**
 * Arrow marker dimensions.
 */
const ARROW_SIZE = 10;

/**
 * Edge colors based on state.
 */
const EDGE_COLORS = {
  idle: '#e2e8f0',      // gray-200
  active: '#38bdf8',    // sky-400 (冰蓝色)
  completed: '#38bdf8', // green-500
} as const;

// ============================================================================
// Component Implementation
// ============================================================================

/**
 * Renders a connecting line between two nodes in the CI/CD flowchart.
 *
 * Features:
 * - SVG path connecting start and end coordinates
 * - Arrow marker at the end point
 * - Optional label text positioned along the edge
 * - Gradient color fill for visual depth
 * - Path draw animation on highlight
 * - Flowing dash animation for completed edges
 * - Different styling for 'forward' vs 'loop' edge types
 *
 * @param props - The component props
 * @returns The rendered FlowchartEdge component
 */
export function FlowchartEdge({
  edge,
  isHighlighted,
  isCompleted,
  startX,
  startY,
  endX,
  endY,
}: FlowchartEdgeProps) {
  const { id, label, type, icon: Icon } = edge;

  /**
   * Calculates the path for the edge.
   * For forward edges: uses a straight line or gentle curve.
   * For loop edges: creates a curved path going around.
   */
  const getPath = (): string => {
    if (type === 'loop') {
      // Create a curved path that arcs above/below for loop-back edges
      const midX = (startX + endX) / 2;
      const midY = Math.min(startY, endY) - 90; // Arc upward

      // Use a quadratic bezier curve for the loop
      return `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`;
    }

    // For forward edges, check if we need a curved path
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);

    if (dy > dx && dy > 20) {
      // Vertical-ish path: create a gentle curve
      const midY = (startY + endY) / 2;
      return `M ${startX},${startY} L ${startX},${midY} L ${endX},${midY} L ${endX},${endY}`;
    }

    // Horizontal or diagonal path: use straight line
    return `M ${startX},${startY} L ${endX},${endY}`;
  };

  const path = getPath();

  /**
   * Estimates the path length for animations.
   * For simple paths, calculate directly; for curves, use approximation.
   */
  const getPathLength = (): number => {
    if (type === 'loop') {
      // Approximate bezier curve length
      const dx = endX - startX;
      const dy = endY - startY;
      return Math.sqrt(dx * dx + dy * dy) * 1.3;
    }
    return Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  };

  const pathLength = getPathLength();

  /**
   * Determines the stroke color based on edge state.
   */
  const getStrokeColor = () => {
    if (isCompleted) return EDGE_COLORS.completed;
    if (isHighlighted) return EDGE_COLORS.active;
    return EDGE_COLORS.idle;
  };

  /**
   * Calculates the position for the edge label.
   * Positions the label at the midpoint of the edge.
   */
  const getLabelPosition = (): { x: number; y: number } => {
    if (type === 'loop') {
      // For loop edges, position label above the arc
      const midX = (startX + endX) / 2;
      const midY = Math.min(startY, endY) - 90;
      return { x: midX, y: midY - 15 };
    }

    // For straight edges, position at midpoint
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Offset label slightly above the line
    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical-ish line: offset to the side
      return { x: midX + 15, y: midY };
    }

    // Horizontal-ish line: offset above
    return { x: midX, y: midY - 8 };
  };

  /**
   * Calculates the stroke dash array based on edge type.
   * Loop edges use a dashed pattern.
   */
  const getStrokeDashArray = (): string | undefined => {
    return type === 'loop' ? '6,4' : undefined;
  };

  const strokeColor = getStrokeColor();

  return (
    <g className="flowchart-edge" data-edge-id={id}>
      {/* Background track (always visible) */}
      <path
        d={path}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={getStrokeDashArray()}
      />

      {/* Animated/colored edge path */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isHighlighted ? 2.5 : isCompleted ? 2 : 1.5}
        strokeDasharray={getStrokeDashArray()}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${ARROW_MARKER_ID}-${isCompleted ? 'completed' : isHighlighted ? 'active' : 'default'})`}
        className={`transition-all duration-300 ${
          isCompleted ? 'flowchart-edge-flowing' : isHighlighted ? 'flowchart-edge-draw' : ''
        }`}
        style={{
          '--path-length': pathLength,
          strokeDasharray: isCompleted ? '6 14' : isHighlighted ? pathLength : getStrokeDashArray(),
        } as React.CSSProperties}
      />

      {/* Label with optional icon - hidden initially, fades in when highlighted/completed */}
      {label && (() => {
        const textWidth = label.length * 6;
        const iconWidth = Icon ? 14 : 0;
        const totalWidth = textWidth + iconWidth;
        const labelStartX = -totalWidth / 2;

        return (
          <g
            transform={`translate(${getLabelPosition().x}, ${getLabelPosition().y - 5})`}
            style={{
              opacity: isHighlighted || isCompleted ? 1 : 0,
              transition: 'opacity 300ms ease-out',
            }}
          >
            {/* Label background */}
            <rect
              x={labelStartX - 4}
              y={-10}
              width={totalWidth + 14}
              height={20}
              rx={10}
              fill="white"
              stroke={isHighlighted || isCompleted ? strokeColor : '#e2e8f0'}
              strokeWidth={1}
              className="drop-shadow-sm"
              style={{ transition: 'stroke 300ms ease' }}
            />

            {Icon && (
              <g transform={`translate(${labelStartX}, -6)`}>
                <Icon
                  size={12}
                  style={{
                    color: isHighlighted ? EDGE_COLORS.active : isCompleted ? EDGE_COLORS.completed : '#64748b',
                    transition: 'color 0.3s ease',
                  }}
                />
              </g>
            )}
            <text
              textAnchor="start"
              x={labelStartX + iconWidth}
              dominantBaseline="middle"
              className="text-xs font-medium"
              style={{
                fill: isHighlighted ? EDGE_COLORS.active : isCompleted ? EDGE_COLORS.completed : '#64748b',
                transition: 'fill 0.3s ease',
              }}
            >
              {label}
            </text>
          </g>
        );
      })()}
    </g>
  );
}

// ============================================================================
// Arrow Marker Definitions
// ============================================================================

/**
 * Renders the SVG defs element containing arrow markers.
 * This should be included once in the SVG container.
 */
export function FlowchartArrowMarkers() {
  return (
    <defs>
      {/* Default arrow marker (gray) */}
      <marker
        id={`${ARROW_MARKER_ID}-default`}
        markerWidth={ARROW_SIZE}
        markerHeight={ARROW_SIZE}
        refX={ARROW_SIZE - 1}
        refY={ARROW_SIZE / 2}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M0,0 L${ARROW_SIZE},${ARROW_SIZE / 2} L0,${ARROW_SIZE} L1,${ARROW_SIZE / 2} Z`}
          fill="#e2e8f0"
        />
      </marker>

      {/* Active/highlighted arrow marker (yellow) */}
      <marker
        id={`${ARROW_MARKER_ID}-active`}
        markerWidth={ARROW_SIZE}
        markerHeight={ARROW_SIZE}
        refX={ARROW_SIZE - 1}
        refY={ARROW_SIZE / 2}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M0,0 L${ARROW_SIZE},${ARROW_SIZE / 2} L0,${ARROW_SIZE} L1,${ARROW_SIZE / 2} Z`}
          fill={EDGE_COLORS.active}
        />
      </marker>

      {/* Completed arrow marker (green) */}
      <marker
        id={`${ARROW_MARKER_ID}-completed`}
        markerWidth={ARROW_SIZE}
        markerHeight={ARROW_SIZE}
        refX={ARROW_SIZE - 1}
        refY={ARROW_SIZE / 2}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M0,0 L${ARROW_SIZE},${ARROW_SIZE / 2} L0,${ARROW_SIZE} L1,${ARROW_SIZE / 2} Z`}
          fill={EDGE_COLORS.completed}
        />
      </marker>
    </defs>
  );
}