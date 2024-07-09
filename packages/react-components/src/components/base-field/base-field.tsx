import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import { Polymorphic } from '@/components';

import styles from './base-field.module.css';

/**
 * @internal
 */
export type BaseFieldProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * @internal
 */
type PolymorphicBaseField = Polymorphic.ForwardRefComponent<'input', BaseFieldProps>;

export const BaseField = forwardRef(({
  as: Wrapper = 'input',
  className,
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolymorphicBaseField;

BaseField.displayName = 'BaseField';
