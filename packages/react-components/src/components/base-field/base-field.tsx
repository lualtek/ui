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

export const BaseField = forwardRef((
  {
    as: Component = 'input',
    invalid,
    className,
    ...otherProps
  },
  forwardedRef,
) => (
  <Component
    ref={forwardedRef}
    aria-invalid={invalid}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolyRefComponent<'input', BaseFieldProps>;
