'use client';

import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Rocket, LucideIcon, SendHorizonal, Pickaxe, Milestone, JoystickIcon, Handshake, HandFist, HandGrab, Cog, SendHorizontal, SendIcon, SendToBack, SendToBackIcon, CircleArrowLeft } from 'lucide-react';

// Types
interface TimelineNodeData {
  id: string;
  title: string;
  date: string;
  icon: LucideIcon;
  title_icon?: string;
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
  { id: 'tech-decision', title: 'Tech Decision', date: 'Mar 2026', icon: Milestone, title_icon: '/codeup.png' },
  { id: 'implementation', title: 'Implementation', date: 'Apr 2026', icon: Pickaxe },
  { id: 'enable-coach', title: 'Enable One Coach', date: 'Jun 2026', icon: Rocket },
  { id: 'adopt-jenkins', title: 'Adopt Jenkins', date: 'FY27', icon: Cog, title_icon: '/jenkins-color.png' },
  { id: 'optimization', title: 'Continuous Optimization', date: 'Future', icon: CircleArrowLeft },
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
  diameter: 40,
  iconSize: 20,
  horizontalSpacing: 120,
  verticalSpacing: 100,
  paddingX: 60,
  paddingY: 40,
} as const;

// Calculate node positions for snake layout (3 nodes per row)
function calculatePositions(nodeCount: number): NodePosition[] {
  const nodesPerRow = 3;

  const positions: NodePosition[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const row = Math.floor(i / nodesPerRow);
    const col = i % nodesPerRow;

    // Snake layout: reverse odd rows
    const isReversedRow = row % 2 === 1;
    const actualCol = isReversedRow ? nodesPerRow - 1 - col : col;

    const x = NODE_SIZE.paddingX + actualCol * NODE_SIZE.horizontalSpacing;
    const y = NODE_SIZE.paddingY + row * NODE_SIZE.verticalSpacing;

    positions.push({ x, y, row, col });
  }

  return positions;
}

// Generate path for connection lines with semicircular turns
function generateConnectionPath(positions: NodePosition[]): string {
  if (positions.length < 2) return '';

  const parts: string[] = [];

  for (let i = 0; i < positions.length - 1; i++) {
    const current = positions[i];
    const next = positions[i + 1];

    if (current.row !== next.row) {
      // Draw semicircular arc for row transition (curves outward)
      const radius = NODE_SIZE.verticalSpacing / 2;
      // Arc curves outward to the right (sweep=1 for clockwise)
      parts.push(`M ${current.x} ${current.y} A ${radius} ${radius} 0 0 1 ${next.x} ${next.y}`);
    } else {
      // Straight horizontal line
      parts.push(`M ${current.x} ${current.y} L ${next.x} ${next.y}`);
    }
  }

  return parts.join(' ');
}

// Generate partial path for progress animation
function generatePartialPath(positions: NodePosition[], targetIndex: number): string {
  if (targetIndex < 1 || positions.length < 2) return '';

  const parts: string[] = [];

  for (let i = 0; i < targetIndex; i++) {
    const current = positions[i];
    const next = positions[i + 1];

    if (current.row !== next.row) {
      const radius = NODE_SIZE.verticalSpacing / 2;
      parts.push(`M ${current.x} ${current.y} A ${radius} ${radius} 0 0 1 ${next.x} ${next.y}`);
    } else {
      parts.push(`M ${current.x} ${current.y} L ${next.x} ${next.y}`);
    }
  }

  return parts.join(' ');
}

export function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Mount detection for SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const positions = calculatePositions(TIMELINE_NODES.length);

  // Calculate SVG viewBox dimensions dynamically (always snake layout, 3 nodes per row)
  const nodeCount = TIMELINE_NODES.length;
  const rowCount = Math.ceil(nodeCount / 3);

  const svgWidth = NODE_SIZE.paddingX * 2 + 2 * NODE_SIZE.horizontalSpacing;
  const svgHeight = NODE_SIZE.paddingY * 2 + (rowCount - 1) * NODE_SIZE.verticalSpacing + 30;

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
          e.preventDefault();
          const nextRow = index + 3;
          if (nextRow < TIMELINE_NODES.length) {
            setFocusedIndex(nextRow);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevRow = index - 3;
          if (prevRow >= 0) {
            setFocusedIndex(prevRow);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setSelectedIndex(index);
          break;
      }
    },
    []
  );

  const connectionPath = generateConnectionPath(positions);
  const partialPath = selectedIndex !== null && selectedIndex > 0
    ? generatePartialPath(positions, selectedIndex)
    : '';

  return (
    <div className="w-full pb-8">
      {!isMounted ? (
        <div className="w-full h-[160px]" />
      ) : (
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-w-2xl mx-auto"
          style={{ minHeight: '240px' }}
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
                y={NODE_SIZE.diameter / 2 + 15}
                textAnchor="middle"
                fill={COLORS.titleText}
                fontSize="8"
                fontWeight="600"
                className="select-none pointer-events-none"
              >
                {node.title}
              </text>

              {/* Title Icon - brand icon positioned at top-right of title */}
              {node.title_icon && (
                <foreignObject
                  x={28}
                  y={NODE_SIZE.diameter / 2 - 5}
                  width={20}
                  height={20}
                >
                  <Image
                    src={node.title_icon}
                    alt={`${node.title} brand icon`}
                    width={16}
                    height={16}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </foreignObject>
              )}

              {/* Date label */}
              <text
                y={NODE_SIZE.diameter / 2 + 25}
                textAnchor="middle"
                fill={COLORS.dateText}
                fontSize="6"
                className="select-none pointer-events-none"
              >
                {node.date}
              </text>
            </g>
          );
        })}
      </svg>
      )}
    </div>
  );
}
