import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  Button, ButtonProps, PolyRefComponent,
} from '@/components';

import styles from './icon-button.module.css';

export type IconButtonProps = Pick<
  ButtonProps,
  'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy' | 'sentiment' | 'type'
>

type IconButtonComponent = PolyRefComponent<typeof Button, IconButtonProps>;

export const IconButton: IconButtonComponent = (
  {
    as = 'button' as React.ElementType,
    className,
    icon,
    dimension,
    kind,
    disabled,
    busy,
    ref: forwardedRef,
    ...otherProps
  },
) => (
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
);
