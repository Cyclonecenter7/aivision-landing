import type { CSSProperties, ReactNode } from 'react';

/**
 * Tooltip — hover/focus label bubble. Chamfered bubble with filter:drop-shadow
 * elevation (no border on the chamfer). Appears on pointer-enter / keyboard
 * focus of the wrapped child after a short delay; pops via .anim-pop.
 */
export interface TooltipProps {
  /** Bubble content. */
  label: ReactNode;
  /** Side to place the bubble. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** The trigger element(s). */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
