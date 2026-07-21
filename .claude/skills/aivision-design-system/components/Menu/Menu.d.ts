import type { CSSProperties, ReactNode } from 'react';

export type MenuItem =
  | 'separator'
  | {
      /** Row label. */
      label: ReactNode;
      /** Lucide-style SVG path string for a 24×24 leading icon. */
      icon?: string;
      /** Destructive action → crimson text. */
      danger?: boolean;
      /** Disabled row. */
      disabled?: boolean;
      /** Fired on select. */
      onSelect?: () => void;
    };

/**
 * Menu — context / action dropdown (NOT a value picker — that's Select).
 * Chamfered trigger + chamfered floating list of actions with optional icons,
 * danger rows and separators. Open state = ChamferBorder stroke on the trigger;
 * menu elevation = filter:drop-shadow. Keyboard: ↓/↑/Enter/Esc, click-outside.
 */
export interface MenuProps {
  /** Trigger content (rendered inside the chamfered button). */
  trigger: ReactNode;
  /** Action rows + 'separator' dividers. */
  items: MenuItem[];
  /** Menu alignment relative to the trigger. */
  align?: 'left' | 'right';
  className?: string;
  style?: CSSProperties;
}

export declare function Menu(props: MenuProps): JSX.Element;
