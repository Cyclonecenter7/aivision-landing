import type { CSSProperties, ReactNode } from 'react';

/**
 * Modal — centred dialog. Plain-fade scrim + chamfered panel that pops via
 * .anim-pop; elevation is filter:drop-shadow (never a border on the chamfer).
 * Closes on Esc / scrim click / the close button. Renders nothing when closed.
 */
export interface ModalProps {
  /** Visibility. */
  open: boolean;
  /** Fired on Esc, scrim click, or close button. */
  onClose: () => void;
  /** Dialog title (Onest). */
  title?: ReactNode;
  /** Body content. */
  children?: ReactNode;
  /** Footer node — typically the action Buttons. */
  footer?: ReactNode;
  /** Panel width in px (default 440). */
  width?: number;
  className?: string;
  style?: CSSProperties;
}

export declare function Modal(props: ModalProps): JSX.Element | null;
