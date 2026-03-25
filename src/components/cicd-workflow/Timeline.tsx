'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Rocket, LucideIcon, SendHorizonal, Pickaxe, Milestone } from 'lucide-react';

// Types
interface TimelineNodeData {
  id: string;
  title: string;
  date: string;
  icon: LucideIcon;
}

interface NodePosition {
  x: number;
  y: number;
  row: number;
  col: number;
}

// Data
const TIMELINE_NODES: TimelineNodeData[] = [
  { id: 'start', title: 'Start', date: 'Feb 2026', icon: Flag },
  { id: 'tech-decision', title: 'Tech Decision', date: 'Mar 2026', icon: Milestone },
  { id: 'implementation', title: 'Implementation', date: 'Apr 2026', icon: Pickaxe },
  { id: 'enable-coach', title: 'Enable One Coach', date: 'Jun 2026', icon: Rocket },
  { id: 'future', title: 'More products', date: 'Future', icon: SendHorizonal },
];

// Animation constants
const ANIMATIONS = {
  PROGRESS_DURATION: 0.8,
  NODE_HOVER_SCALE: 1.1,
  NODE_TAP_SCALE: 0.95,
} as const;

// Colors
const COLORS = {
  nodeDefault: '#f8fafc',
  nodeSelected: '#EAB308',
  nodeBorder: '#cbd5e1',
  nodeBorderSelected: '#EAB308',
  connectionLine: '#cbd5e1',
  progressLine: '#EAB308',
  titleText: '#334155',
  dateText: '#64748b',
  iconDefault: '#64748b',
  iconSelected: '#EAB308',
} as const;

// Node sizing
const NODE_SIZE = {
  diameter: 48,
  iconSize: 20,
  horizontalSpacing: 120,
  verticalSpacing: 100,
  paddingX: 60,
  paddingY: 60,
} as const;

// Calculate node positions based on viewport width
function calculatePositions(
  nodeCount: number,
  viewportWidth: number
): NodePosition[] {
  const isMobile = viewportWidth < 640;
  const nodesPerRow = isMobile ? 3 : nodeCount;

  const positions: NodePosition[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const row = Math.floor(i / nodesPerRow);
    const col = i % nodesPerRow;

    // In snake layout, reverse odd rows
    const isReversedRow = isMobile && row % 2 === 1;
    const actualCol = isReversedRow ? nodesPerRow - 1 - col : col;

    const x = NODE_SIZE.paddingX + actualCol * NODE_SIZE.horizontalSpacing;
    const y = NODE_SIZE.paddingY + row * NODE_SIZE.verticalSpacing;

    positions.push({ x, y, row, col });
  }

  return positions;
}

// Generate path for connection lines
function generateConnectionPath(
  positions: NodePosition[],
  isSnakeLayout: boolean
): string {
  if (positions.length < 2) return '';

  const parts: string[] = [];

  for (let i = 0; i < positions.length - 1; i++) {
    const current = positions[i];
    const next = positions[i + 1];

    // In snake layout, add vertical connector between rows
    if (isSnakeLayout && current.row !== next.row) {
      // Draw L-shaped path for row transition
      const midY = current.y + NODE_SIZE.verticalSpacing / 2;
      parts.push(`M ${current.x} ${current.y}`);
      parts.push(`L ${current.x} ${midY}`);
      parts.push(`L ${next.x} ${midY}`);
      parts.push(`L ${next.x} ${next.y}`);
    } else {
      // Straight horizontal or diagonal line
      parts.push(`M ${current.x} ${current.y} L ${next.x} ${next.y}`);
    }
  }

  return parts.join(' ');
}

// Generate partial path for progress animation
function generatePartialPath(
  positions: NodePosition[],
  targetIndex: number,
  isSnakeLayout: boolean
): string {
  if (targetIndex < 1 || positions.length < 2) return '';

  const parts: string[] = [];

  for (let i = 0; i < targetIndex; i++) {
    const current = positions[i];
    const next = positions[i + 1];

    if (isSnakeLayout && current.row !== next.row) {
      const midY = current.y + NODE_SIZE.verticalSpacing / 2;
      parts.push(`M ${current.x} ${current.y}`);
      parts.push(`L ${current.x} ${midY}`);
      parts.push(`L ${next.x} ${midY}`);
      parts.push(`L ${next.x} ${next.y}`);
    } else {
      parts.push(`M ${current.x} ${current.y} L ${next.x} ${next.y}`);
    }
  }

  return parts.join(' ');
}

export function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [isMounted, setIsMounted] = useState(false);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Responsive viewport detection - only run on client
  useEffect(() => {
    setIsMounted(true);
    setViewportWidth(window.innerWidth);

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSnakeLayout = viewportWidth < 640;
  const positions = calculatePositions(TIMELINE_NODES.length, viewportWidth);

  // Calculate SVG viewBox dimensions
  const svgWidth = isSnakeLayout
    ? NODE_SIZE.paddingX * 2 + 2 * NODE_SIZE.horizontalSpacing
    : NODE_SIZE.paddingX * 2 + 4 * NODE_SIZE.horizontalSpacing;
  const svgHeight = isSnakeLayout
    ? NODE_SIZE.paddingY * 2 + NODE_SIZE.verticalSpacing
    : NODE_SIZE.paddingY * 2;

  // Update path length when selection changes
  useEffect(() => {
    if (progressPathRef.current && selectedIndex !== null && selectedIndex > 0) {
      const length = progressPathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [selectedIndex, positions]);

  const handleNodeClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex((index + 1) % TIMELINE_NODES.length);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex((index - 1 + TIMELINE_NODES.length) % TIMELINE_NODES.length);
          break;
        case 'ArrowDown':
          if (isSnakeLayout) {
            e.preventDefault();
            const nextRow = index + 3;
            if (nextRow < TIMELINE_NODES.length) {
              setFocusedIndex(nextRow);
            }
          }
          break;
        case 'ArrowUp':
          if (isSnakeLayout) {
            e.preventDefault();
            const prevRow = index - 3;
            if (prevRow >= 0) {
              setFocusedIndex(prevRow);
            }
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setSelectedIndex(index);
          break;
      }
    },
    [isSnakeLayout]
  );

  const connectionPath = generateConnectionPath(positions, isSnakeLayout);
  const partialPath = selectedIndex !== null && selectedIndex > 0
    ? generatePartialPath(positions, selectedIndex, isSnakeLayout)
    : '';

  return (
    <div className="w-full py-8">
      {!isMounted ? (
        <div className="w-full h-[160px]" />
      ) : (
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-w-4xl mx-auto"
          style={{ minHeight: isSnakeLayout ? '240px' : '160px' }}
        >
        {/* Connection lines (base layer) */}
        <path
          d={connectionPath}
          stroke={COLORS.connectionLine}
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Progress line (animated layer) */}
        <AnimatePresence>
          {selectedIndex !== null && selectedIndex > 0 && (
            <motion.path
              ref={progressPathRef}
              d={partialPath}
              stroke={COLORS.progressLine}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: ANIMATIONS.PROGRESS_DURATION, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* Timeline nodes */}
        {TIMELINE_NODES.map((node, index) => {
          const position = positions[index];
          // Node is "completed" if it's at or before the selected index
          const isCompleted = selectedIndex !== null && index <= selectedIndex;
          const isFocused = focusedIndex === index;
          const IconComponent = node.icon;

          return (
            <g key={node.id} transform={`translate(${position.x}, ${position.y})`}>
              {/* Clickable area (invisible, larger touch target) */}
              <circle
                r="24"
                fill="transparent"
                className="cursor-pointer"
                onClick={() => handleNodeClick(index)}
                tabIndex={isFocused ? 0 : -1}
                role="button"
                aria-label={`${node.title}, ${node.date}${isCompleted ? ', completed' : ''}`}
                aria-pressed={isCompleted}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedIndex(index)}
              />

              {/* Visible node circle */}
              <motion.circle
                r={NODE_SIZE.diameter / 2}
                fill={isCompleted ? COLORS.nodeSelected : COLORS.nodeDefault}
                stroke={isCompleted ? COLORS.nodeBorderSelected : COLORS.nodeBorder}
                strokeWidth="2"
                whileHover={{ scale: ANIMATIONS.NODE_HOVER_SCALE }}
                whileTap={{ scale: ANIMATIONS.NODE_TAP_SCALE }}
                className="cursor-pointer"
                onClick={() => handleNodeClick(index)}
                style={{
                  filter: isFocused ? 'drop-shadow(0 0 0 2px #EAB308)' : undefined,
                }}
              />

              {/* Focus ring */}
              {isFocused && (
                <circle
                  r={NODE_SIZE.diameter / 2 + 4}
                  fill="none"
                  stroke={COLORS.nodeSelected}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              )}

              {/* Icon */}
              <g transform={`translate(-${NODE_SIZE.iconSize / 2}, -${NODE_SIZE.iconSize / 2})`}>
                <IconComponent
                  size={NODE_SIZE.iconSize}
                  color={isCompleted ? '#ffffff' : COLORS.iconDefault}
                  strokeWidth={2}
                />
              </g>

              {/* Title label */}
              <text
                y={NODE_SIZE.diameter / 2 + 20}
                textAnchor="middle"
                fill={COLORS.titleText}
                fontSize="12"
                fontWeight="600"
                className="select-none pointer-events-none"
              >
                {node.title}
              </text>

              {/* Date label */}
              <text
                y={NODE_SIZE.diameter / 2 + 36}
                textAnchor="middle"
                fill={COLORS.dateText}
                fontSize="10"
                className="select-none pointer-events-none"
              >
                {node.date}
              </text>
            </g>
          );
        })}
      </svg>
      )}

      {/* Instructions */}
      <p className="text-center text-slate-400 text-sm mt-4">
        Click a milestone to see progress from start
      </p>
    </div>
  );
}
