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

import styles from './prose.module.css';

export type ProseProps = {
  /**
   * Set the gap between block elements inside the prose.
   *
   * @defaultValue "div"
   */
  gap?: 'small' | 'medium' | 'big';
  /**
   * Set the text wrapping to be balanced. Works only with block elements.
   *
   * @defaultValue false
   */
  balanced?: boolean;
};

type ProseComponent = PolyRefComponent<'div', ProseProps>;

export const Prose: ProseComponent = (
  {
    as: Component = 'div',
    children,
    className,
    gap = 'big',
    balanced = false,
    ref: forwardedRef,
    ...otherProps
  },
) => (
  <Component
    ref={forwardedRef}
    className={clsx(styles.Prose, className)}
    data-prose-gap={gap}
    data-prose-balanced={balanced}
    {...otherProps}
  >
    {children}
  </Component>
);

