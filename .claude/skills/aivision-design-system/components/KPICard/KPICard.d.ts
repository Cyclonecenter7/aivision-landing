import type { CSSProperties, ReactNode } from 'react';

/**
 * Dashboard metric tile: chamfered surface + left accent rail (chamfer-safe),
 * value in Onest, delta as a mono status chip. The core CRM unit.
 */
export interface KPICardProps {
  /** Mono uppercase eyebrow, e.g. «Воронка». */
  label: ReactNode;
  /** The metric — short display number, e.g. «218» or «1,54 М ₽». */
  value: ReactNode;
  /** Optional delta text, e.g. «24 новых» (the arrow is added automatically). */
  delta?: ReactNode;
  /** Delta direction → colour + arrow. Default `'up'` (emerald ↑). */
  direction?: 'up' | 'down';
  /** Left rail accent colour. Default `var(--brand)`. */
  accent?: string;
  className?: string;
  style?: CSSProperties;
}

export declare function KPICard(props: KPICardProps): JSX.Element;
