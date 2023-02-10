import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './blank-button.module.css';

type BlankButtonProps = ButtonHTMLAttributes<HTMLButtonElement & {
  onClick?: () => void;
}>

export const BlankButton = forwardRef<HTMLButtonElement, BlankButtonProps>(({
  children,
  className,
  onClick,
  ...otherProps
}, forwardedRef) => (
  <button
    ref={forwardedRef}
    onClick={onClick}
    type="button"
    className={clsx(styles.BlankButton, className)}
    {...otherProps}
  >
    {children}
  </button>
));
