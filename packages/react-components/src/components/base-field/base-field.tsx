import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components';

import styles from './base-field.module.css';

export type BaseFieldProps = {
  /**
   * Force the invalid state of the field.
   */
  invalid?: boolean;
}

/**
 * @internal
 */
type PolymorphicBaseField = Polymorphic.ForwardRefComponent<'input', BaseFieldProps>;

export const BaseField = forwardRef(({
  as: Wrapper = 'input',
  invalid,
  className,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    data-basefield-invalid={invalid}
    aria-invalid={invalid}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolymorphicBaseField;

BaseField.displayName = 'BaseField';
