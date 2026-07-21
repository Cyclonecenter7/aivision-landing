import type { CSSProperties } from 'react';

/**
 * Spinner — indeterminate loading ring (chamfer-free; a ring outlines, it does
 * not contain). Linear determinate progress is the sibling `Progress` export —
 * a chamfer-safe filled track.
 */
export interface SpinnerProps {
  /** Diameter in px. */
  size?: number;
  /** Stroke colour. */
  color?: string;
  /** Stroke thickness in px. */
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}
export declare function Spinner(props: SpinnerProps): JSX.Element;

export interface ProgressProps {
  /** Current value. */
  value: number;
  /** Max value (default 100). */
  max?: number;
  /** Fill colour. */
  color?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Progress(props: ProgressProps): JSX.Element;
