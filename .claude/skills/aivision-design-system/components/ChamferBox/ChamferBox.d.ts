import type { CSSProperties, ReactNode } from 'react';

/**
 * The foundational AIVISION container: a box with the brand chamfer
 * (bottom-right cut). Use instead of a raw `<div>` whenever you need a
 * branded surface. Pair an accent with `rail` (chamfer-safe), never a border.
 *
 * @startingPoint section="Компоненты" subtitle="Скошенный контейнер + рейл" viewport="640x360"
 */
export interface ChamferBoxProps {
  /** Element/tag to render as. Default `'div'`. */
  as?: keyof JSX.IntrinsicElements;
  /** Chamfer cut size in px. Brand default 10 — do NOT scale for emphasis. */
  chamfer?: number;
  /** Optional left accent rail colour (e.g. `var(--brand)`). Chamfer-safe inner rail — use this instead of a border. */
  rail?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare function ChamferBox(props: ChamferBoxProps): JSX.Element;
