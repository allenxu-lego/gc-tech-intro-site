'use client';

import React from 'react';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Props for the FlowchartErrorBoundary component.
 */
interface FlowchartErrorBoundaryProps {
  /** Child components to render when no error exists */
  children: React.ReactNode;
}

/**
 * State for the FlowchartErrorBoundary component.
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error object */
  error: Error | null;
}

// ============================================================================
// Error Boundary Component
// ============================================================================

/**
 * Error boundary component specifically for the Flowchart.
 *
 * Catches rendering errors within the flowchart and displays
 * a user-friendly error message with a retry option.
 *
 * Features:
 * - Displays appropriate error message to users
 * - Logs error details to console for debugging
 * - Provides retry functionality via page reload
 *
 * @example
 * ```tsx
 * <FlowchartErrorBoundary>
 *   <Flowchart />
 * </FlowchartErrorBoundary>
 * ```
 */
export class FlowchartErrorBoundary extends React.Component<
  FlowchartErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: FlowchartErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state when an error is thrown during rendering.
   * Called during the "render" phase, so side-effects are not permitted.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Called after an error has been thrown by a descendant component.
   * Used for logging error information.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Flowchart rendering error:', error);
    console.error('Component stack trace:', errorInfo.componentStack);
  }

  /**
   * Handles the retry action by reloading the page.
   */
  handleRetry = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Unable to Display Workflow
            </h2>
            <p className="text-gray-600 mb-4">
              The workflow diagram encountered an error and could not be rendered.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <p className="text-sm text-red-600 mb-4 font-mono bg-red-50 p-2 rounded">
                {this.state.error.message}
              </p>
            )}
          </div>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}