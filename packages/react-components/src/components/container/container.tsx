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
import { forwardRef } from 'react';

import { PolyRefComponent } from '@/components';

import styles from './container.module.css';

export type ContainerProps = {
  /**
   * Set the horizontal max-width of the container.
   * @defaultValue "full"
   */
  dimension?: 'full' | 'small' | 'medium' | 'large' | 'extra-large';
  /**
   * Set or remove the container's predefined horizontal padding.
   * @defaultValue true
   */
  padding?: boolean;
}

type ContainerComponent = PolyRefComponent<'div', ContainerProps>;

export const Container: ContainerComponent = (
  {
    as: Component = 'div',
    children,
    className,
    dimension = 'full',
    padding = true,
    ref: forwardedRef,
    ...otherProps
  },
) => (
  <Component
    ref={forwardedRef}
    className={clsx(styles.Container, className)}
    data-container-dimension={dimension}
    data-container-padding={padding}
    {...otherProps}
  >
    {children}
  </Component>
);
