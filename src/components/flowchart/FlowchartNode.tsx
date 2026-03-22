'use client';

import type { FlowchartNode as FlowchartNodeType } from './flowchartData';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Props for the FlowchartNode component.
 */
export interface FlowchartNodeProps {
  /** The node data containing label, icon, type, and position */
  node: FlowchartNodeType;
  /** Whether this node is currently active/highlighted */
  isActive: boolean;
  /** Whether this node is the next step (connected to active node) */
  isNext?: boolean;
  /** Whether this node has been completed (part of visited path) */
  isCompleted?: boolean;
  /** Whether an animation is currently in progress */
  isAnimating: boolean;
  /** Callback when the node is clicked */
  onClick: (id: string) => void;
}

// ============================================================================
// Node Dimensions by Type
// ============================================================================

/**
 * Node dimensions based on the design specification.
 */
const NODE_DIMENSIONS = {
  actor: { width: 120, height: 70 },
  action: { width: 120, height: 70 },
  decision: { width: 150, height: 100 }, // Diamond shape
  endpoint: { width: 120, height: 70 },
} as const;

// ============================================================================
// Node Color System
// ============================================================================

/**
 * Node colors based on state (idle/active/next/completed).
 * References qoder-app1 design patterns.
 */
const NODE_COLORS = {
  idle: {
    fill: '#f1f5f9',      // gray-100
    stroke: '#e2e8f0',    // gray-200
    icon: '#94a3b8',      // gray-400
    text: '#64748b',      // gray-500
  },
  active: {
    fill: 'rgba(234, 179, 8, 0.1)',  // yellow with 10% opacity
    stroke: '#EAB308',    // brand yellow
    icon: '#EAB308',
    text: '#CA8A04',      // yellow-600 (darker for better readability)
  },
  next: {
    fill: 'rgba(56, 189, 248, 0.1)', // sky-400 with 10% opacity (冰蓝色)
    stroke: '#38bdf8',    // sky-400
    icon: '#38bdf8',      // sky-400
    text: '#0284c7',      // sky-600
  },
  completed: {
    fill: 'rgba(34, 197, 94, 0.1)',  // green with 10% opacity
    stroke: '#22c55e',    // green-500
    icon: '#22c55e',
    text: '#16A34A',      // green-600 (darker for better readability)
  },
} as const;

// ============================================================================
// Component Implementation
// ============================================================================

/**
 * Renders an individual pipeline node in the CI/CD flowchart.
 *
 * Features:
 * - Different shapes for actor, action, decision, and endpoint types
 * - Entrance animation with staggered delay
 * - Active state with scale pulse animation
 * - Completed state with green accent
 * - Hover states following NavItem.tsx pattern
 * - Full keyboard navigation support
 * - Screen reader accessibility
 *
 * @param props - The component props
 * @returns The rendered FlowchartNode component
 */
export function FlowchartNode({
  node,
  isActive,
  isNext,
  isCompleted,
  isAnimating,
  onClick,
}: FlowchartNodeProps) {
  const { id, label, icon, type, position } = node;
  const dimensions = NODE_DIMENSIONS[type];
  const isImageIcon = typeof icon === 'string';

  /**
   * Determines the current color scheme based on node state.
   */
  const getColors = () => {
    if (isActive) return NODE_COLORS.active;
    if (isCompleted) return NODE_COLORS.completed;
    if (isNext) return NODE_COLORS.next;
    return NODE_COLORS.idle;
  };

  const colors = getColors();

  /**
   * Handles keyboard navigation for accessibility.
   * AC-5: Interactive Animation via keyboard.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(id);
    }
  };

  /**
   * Determines the shape path based on node type.
   */
  const getShapePath = () => {
    const { width, height } = dimensions;

    switch (type) {
      case 'actor':
        // Rounded rectangle for actors
        const rx = 8;
        return `M ${rx},0 L ${width - rx},0 Q ${width},0 ${width},${rx} L ${width},${height - rx} Q ${width},${height} ${width - rx},${height} L ${rx},${height} Q 0,${height} 0,${height - rx} L 0,${rx} Q 0,0 ${rx},0 Z`;
      case 'decision':
        // Diamond shape for decisions
        const halfW = width / 2;
        const halfH = height / 2;
        return `M ${halfW},0 L ${width},${halfH} L ${halfW},${height} L 0,${halfH} Z`;
      case 'endpoint':
        // Pill shape for endpoints (more rounded corners)
        const pillRx = height / 2;
        return `M ${pillRx},0 L ${width - pillRx},0 Q ${width},0 ${width},${pillRx} L ${width},${height - pillRx} Q ${width},${height} ${width - pillRx},${height} L ${pillRx},${height} Q 0,${height} 0,${height - pillRx} L 0,${pillRx} Q 0,0 ${pillRx},0 Z`;
      case 'action':
      default:
        // Standard rounded rectangle for actions
        const actionRx = 6;
        return `M ${actionRx},0 L ${width - actionRx},0 Q ${width},0 ${width},${actionRx} L ${width},${height - actionRx} Q ${width},${height} ${width - actionRx},${height} L ${actionRx},${height} Q 0,${height} 0,${height - actionRx} L 0,${actionRx} Q 0,0 ${actionRx},0 Z`;
    }
  };

  /**
   * Calculates the center position for the icon.
   */
  const getIconPosition = () => {
    const iconSize = 20;
    const { width, height } = dimensions;

    if (type === 'decision') {
      // For diamond, position icon in center, text will follow below
      return {
        x: width / 2 - iconSize / 2,
        y: height / 2 - iconSize / 2 - 18, // Move up closer to center
      };
    }

    return {
      x: width / 2 - iconSize / 2,
      y: height / 2 - iconSize / 2 - 8, // Offset up a bit for label
    };
  };

  /**
   * Calculates the text position for the label.
   */
  const getTextPosition = () => {
    const { width, height } = dimensions;

    if (type === 'decision') {
      // For diamond, position text closer to icon
      return {
        x: width / 2,
        y: height / 2 + 10, // Just below center
      };
    }

    return {
      x: width / 2,
      y: height - 16, // Position at bottom of node
    };
  };

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onClick={() => onClick(id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Step: ${label}. Press to animate next step.`}
      aria-disabled={isAnimating}
      className={`outline-none ${
        isActive ? 'flowchart-node-active' : ''
      } cursor-pointer`}
      style={{
        // AC-7: Disable pointer events for non-active nodes during animation
        pointerEvents: isAnimating && !isActive ? 'none' : 'all',
      }}
    >
      {/* Node shape */}
      <path
        d={getShapePath()}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={isActive ? 2 : 1.5}
        style={{
          filter: isActive ? 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.3))' : 'none',
          transition: 'filter 300ms ease',
        }}
      />

      {/* Icon */}
      <g transform={`translate(${getIconPosition().x}, ${getIconPosition().y})`}>
        {isImageIcon ? (
          <image
            href={icon as string}
            width={24}
            height={24}
            x={0}
            y={0}
          />
        ) : (
          (() => {
            const IconComponent = icon as React.ComponentType<{
              className?: string;
              style?: React.CSSProperties;
            }>;
            return (
              <IconComponent
                className="w-5 h-5"
                style={{ color: colors.icon }}
              />
            );
          })()
        )}
      </g>

      {/* Label */}
      <text
        x={getTextPosition().x}
        y={getTextPosition().y}
        textAnchor="middle"
        className="font-medium"
        style={{ fill: colors.text, fontSize: 13 }}
      >
        {label}
      </text>

      {/* Completed checkmark badge */}
      {isCompleted && !isActive && (
        <g transform={`translate(${dimensions.width - 16}, -4)`}>
          <circle
            cx="8"
            cy="8"
            r="8"
            fill="#22c55e"
            className="drop-shadow-sm"
          />
          <path
            d="M5 8 L7 10 L11 6"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Focus ring for accessibility */}
      <path
        d={getShapePath()}
        fill="none"
        stroke="transparent"
        strokeWidth={4}
        className="focus:stroke-yellow-500"
        style={{ pointerEvents: 'none' }}
      />
    </g>
  );
}