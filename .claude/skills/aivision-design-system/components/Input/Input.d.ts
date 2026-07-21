import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

/**
 * Chamfered text field. Focus & error are drawn by a ChamferBorder SVG overlay
 * that traces the field's own cut (recolours its stroke) — never an
 * outline/box-shadow/border on a chamfered control.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Mono uppercase label above the field. */
  label?: ReactNode;
  /** Error state → crimson stroke. */
  error?: boolean;
  /** Disabled state → dimmed. */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;
