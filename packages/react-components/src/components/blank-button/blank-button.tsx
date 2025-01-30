import clsx from 'clsx';
import { forwardRef, ForwardRefExoticComponent } from 'react';

import styles from './blank-button.module.css';

export type BlankButtonProps = React.ComponentPropsWithRef<'button'>

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
)) as ForwardRefExoticComponent<BlankButtonProps>;

