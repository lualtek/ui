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

import styles from './base-field.module.css';

export type BaseFieldProps = {
  /**
   * Force the invalid state of the field.
   */
  invalid?: boolean;
}

export const BaseField: PolyRefComponent<'input', BaseFieldProps> = (
  {
    as: Component = 'input',
    invalid,
    className,
    ref: forwardedRef,
    ...otherProps
  },
) => (
  <Component
    ref={forwardedRef}
    aria-invalid={invalid}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
);
