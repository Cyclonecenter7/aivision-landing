import type { CSSProperties, ReactNode } from 'react';

/**
 * Toast — transient notification. Chamfered surface + left accent rail
 * (chamfer-safe ::before, never a border), type icon, optional close. Slides
 * in via `.anim-toast`. Elevation is `filter: drop-shadow` (clip-safe). This
 * is the presentational unit; apps own the queue/stacking + auto-dismiss.
 */
export interface ToastProps {
  /** Semantic type → rail colour + icon. */
  type?: 'info' | 'success' | 'error' | 'warning';
  /** Bold first line. */
  title: ReactNode;
  /** Optional secondary line. */
  message?: ReactNode;
  /** Show the dismiss button → fires onClose. */
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export declare function Toast(props: ToastProps): JSX.Element;
