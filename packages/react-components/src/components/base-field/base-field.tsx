import clsx from 'clsx';
import { forwardRef } from 'react';

import { PolymorphicPropsRef } from '@/components';

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
type PolymorphicBaseField<T extends React.ElementType = 'input'> = PolymorphicPropsRef<T, BaseFieldProps>;

/**
 * @internal
 */
type BaseFieldComponent = <T extends React.ElementType = 'input'>(
  props: PolymorphicBaseField<T>
) => JSX.Element | React.ReactNode | null

export const BaseField: BaseFieldComponent = forwardRef(
  <T extends React.ElementType = 'input'>(
    {
      as,
      invalid,
      className,
      ...otherProps
    }: PolymorphicBaseField<T>,
    forwardedRef: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'input';

    return (
      <Component
        ref={forwardedRef}
        aria-invalid={invalid}
        className={clsx(styles.BaseField, className)}
        {...otherProps}
      />
    );
  },
);
