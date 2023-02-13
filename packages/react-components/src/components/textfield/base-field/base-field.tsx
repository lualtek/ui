import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { Polymorphic } from '@/components';

import styles from './base-field.module.css';

/**
 * @internal
 */
export type PrimitiveInputType = HTMLInputElement

/**
 * @internal
 */
export type BaseFieldProps = InputHTMLAttributes<PrimitiveInputType> & TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
    className={clsx(styles.BaseField, className)}
    {...otherProps}
  />
)) as PolymorphicBaseField;

BaseField.displayName = 'BaseField';
