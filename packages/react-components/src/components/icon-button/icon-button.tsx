import clsx from 'clsx';
import { forwardRef } from 'react';

import { Button, type ButtonProps, type PolyRefComponent } from '@/components';

import styles from './icon-button.module.css';

export type IconButtonProps = Pick<
  ButtonProps,
  'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy' | 'sentiment' | 'type'
>;

export const IconButton = forwardRef(
  ({ as, className, icon, dimension, kind, disabled, busy, ...otherProps }, forwardedRef) => (
    <Button
      ref={forwardedRef}
      icon={icon}
      dimension={dimension}
      kind={kind}
      as={as}
      disabled={disabled}
      busy={busy}
      className={clsx(styles.IconButton, className)}
      iconOpticalSize={{
        big: 24,
      }}
      {...otherProps}
    />
  ),
) as PolyRefComponent<typeof Button, IconButtonProps>;
