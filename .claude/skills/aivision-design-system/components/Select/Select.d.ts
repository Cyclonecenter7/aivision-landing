import type { CSSProperties, ReactNode } from 'react';

export type SelectOption = { value: string; label?: ReactNode } | string;

/**
 * Custom AIVISION dropdown — replaces the off-brand native <select> popup with
 * a chamfered trigger + chamfered floating menu (brand checkmark on the
 * selected row). Open/focus state is a ChamferBorder SVG stroke; the menu's
 * elevation is `filter: drop-shadow()` (clip-safe) — never a border/box-shadow
 * on a chamfered element. Keyboard: ↓/↑/Enter/Esc.
 */
export interface SelectProps {
  /** Mono uppercase label above the trigger. */
  label?: ReactNode;
  /** Options — strings or { value, label } objects. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Shown when nothing is selected. */
  placeholder?: string;
  /** Fired with the chosen option's value. */
  onChange?: (value: string) => void;
  /** Disabled state → dimmed, non-interactive. */
  disabled?: boolean;
  /** Error state → crimson stroke. */
  error?: boolean;
  className?: string;
  style?: CSSProperties;
}

export declare function Select(props: SelectProps): JSX.Element;
