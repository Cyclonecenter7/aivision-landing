import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Chamfered AIVISION action button. The cut is the action's focus mark and
 * deepens transiently on press — never use a border (clip-path tears it).
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Visual style. Default `'primary'`. `'ghost'` is a low-contrast fill, not an outline. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Control height. Default `'md'`. */
  size?: 'sm' | 'md' | 'lg';
  /** Tag to render as. Default `'button'`. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
