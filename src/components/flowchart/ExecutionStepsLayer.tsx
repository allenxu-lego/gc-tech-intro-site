'use client';

import { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { useFlowchart, ANIMATION_DURATIONS } from './FlowchartContext';
import { EXECUTION_STEPS } from './flowchartData';

/**
 * Layer dimensions for the execution steps overlay.
 */
const LAYER = {
  WIDTH: 100,
  HEIGHT: 48,
  PADDING_X: 12,
  PADDING_Y: 8,
  BORDER_RADIUS: 8,
} as const;

/**
 * ExecutionStepsLayer Component
 *
 * Displays an overlay above the e-aliyun-jenkins-svc edge showing CI/CD pipeline steps.
 * Auto-scrolls through items with fade animations when triggered by clicking jenkins-for-svc node.
 * Click to pause/resume. If at last item, click to restart from beginning.
 */
export function ExecutionStepsLayer() {
  const {
    execStepsVisible,
    execStepsCurrentIndex,
    setExecStepsCurrentIndex,
  } = useFlowchart();

  // Local state for pause control
  const [isPaused, setIsPaused] = useState(false);

  // Timer ref for auto-scroll cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Current item for display (used for aria-live)
  const currentItem = EXECUTION_STEPS[execStepsCurrentIndex];
  const Icon = currentItem?.icon;

  // Check if at last item
  const isAtLastItem = execStepsCurrentIndex >= EXECUTION_STEPS.length - 1;

  // Auto-scroll animation effect
  useEffect(() => {
    // Don't run if not visible, paused, or at last item
    if (!execStepsVisible || isPaused || isAtLastItem) {
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set up timer for next item
    timerRef.current = setTimeout(() => {
      setExecStepsCurrentIndex(execStepsCurrentIndex + 1);
    }, ANIMATION_DURATIONS.EXEC_STEPS_ITEM_DISPLAY);

    // Cleanup on unmount or dependency change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [execStepsVisible, isPaused, isAtLastItem, execStepsCurrentIndex, setExecStepsCurrentIndex]);

  // Handle click to pause/resume/restart
  const handleClick = () => {
    if (isAtLastItem) {
      // At last item: restart from beginning
      setExecStepsCurrentIndex(0);
      setIsPaused(false);
    } else {
      // Toggle pause/resume
      setIsPaused(!isPaused);
    }
  };

  // Don't render if not visible
  if (!execStepsVisible) {
    return null;
  }

  // Position calculation: midpoint between jenkins-for-svc (300, 170) and aliyun-cloud (50, 170)
  const position = {
    x: (470) / 2 - LAYER.WIDTH / 2, // = 95
    y: 170 - 20, // 60px above the edge = 110
  };

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      role="button"
      aria-label={`CI/CD Pipeline Steps: ${currentItem?.label || ''}${isPaused ? ' (Paused)' : ''}${isAtLastItem ? ' - Click to restart' : ''}`}
      aria-live="polite"
      aria-atomic="true"
      className="exec-steps-layer-fade-in"
      onClick={handleClick}
      style={{ cursor: 'pointer', outline: 'none' }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Background container - ice blue theme */}
      <rect
        width={LAYER.WIDTH}
        height={LAYER.HEIGHT}
        rx={LAYER.BORDER_RADIUS}
        ry={LAYER.BORDER_RADIUS}
        fill="#f0f9ff"
        stroke="#38bdf8"
        strokeWidth={1.5}
        filter="drop-shadow(0 1px 3px rgba(56, 189, 248, 0.2))"
      />

      {/* Spinning gear icon at top - stops when paused or at last item */}
      <g transform={`translate(${LAYER.WIDTH / 2 - 12}, -12)`}>
        <g>
          <Settings
            size={24}
            strokeWidth={2}
            style={{ color: '#38bdf8' }}
          />
          {!isPaused && !isAtLastItem && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </g>
      </g>

      {/* Current step item - centered */}
      {currentItem && Icon && (
        <g
          key={currentItem.id}
          className="exec-steps-item-fade-in"
          transform={`translate(${LAYER.WIDTH / 2}, ${LAYER.HEIGHT / 2 + 6})`}
        >
          {/* Icon */}
          <g transform="translate(8, 15)">
            <Icon
              size={16}
              strokeWidth={2}
              style={{ color: '#0ea5e9' }}
            />
          </g>

          {/* Label */}
          <text
            x={25}
            y={23}
            dy="0.35em"
            fontSize={13}
            fontWeight={500}
            fill="#0369a1"
            fontFamily="var(--font-sans), Arial, Helvetica, sans-serif"
          >
            {currentItem.label}
          </text>
        </g>
      )}

      {/* Progress indicator dots - ice blue theme */}
      <g transform={`translate(${LAYER.WIDTH / 2 - 30}, ${LAYER.HEIGHT - 8})`}>
        {EXECUTION_STEPS.map((step, index) => (
          <circle
            key={step.id}
            cx={index * 12}
            cy={0}
            r={2}
            fill={index <= execStepsCurrentIndex ? '#38bdf8' : '#bae6fd'}
          />
        ))}
      </g>
    </g>
  );
}