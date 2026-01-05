/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import clsx from 'clsx';

import {
  Button, ButtonProps, PolyRefComponent,
} from '@/components';

import styles from './icon-button.module.css';

export type IconButtonProps = Pick<
  ButtonProps,
  'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy' | 'sentiment' | 'type' | 'iconOpticalSize'
>

type IconButtonComponent = PolyRefComponent<typeof Button, IconButtonProps>;

export const IconButton: IconButtonComponent = (
  {
    as = 'button' as React.ElementType,
    className,
    icon,
    dimension,
    iconOpticalSize,
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
    iconOpticalSize={iconOpticalSize ?? {
      big: 24,
    }}
    {...otherProps}
  />
);
