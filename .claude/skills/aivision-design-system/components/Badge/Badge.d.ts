import type { CSSProperties, ReactNode } from 'react';

/**
 * Badge — tiny status pill / count. Micro-chamfer (4px) so the cut still reads
 * at small size. Tinted background + matching text (never a border on the
 * chamfer). Use for counts, statuses, category labels.
 */
export interface BadgeProps {
  children?: ReactNode;
  /** Colour role. */
  variant?: 'brand' | 'emerald' | 'crimson' | 'sun' | 'slate' | 'neutral';
  /** Solid fill instead of tint (for high-emphasis counts). */
  solid?: boolean;
  /** Leading status dot. */
  dot?: boolean;
  className?: string;
  style?: CSSProperties;
}

export declare function Badge(props: BadgeProps): JSX.Element;
