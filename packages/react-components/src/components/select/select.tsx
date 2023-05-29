'use client';

import clsx from 'clsx';
import {
  ChangeEvent, forwardRef, ReactNode, SelectHTMLAttributes, useId,
} from 'react';

import {
  Icon, IconProps, Stack,
  Text,
} from '@/components';
import { PropsClassChildren } from '@/components/types';

import styles from './select.module.css';

export type SelectProps = PropsClassChildren<SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Change the default icon displayed on the side of the select.
   */
  icon?: IconProps['source'];
  /**
   * Set the accessible label for the select.
   */
  label: ReactNode;
  /**
   * Set how many options can be selected at once.
   */
  kind?: 'single' | 'multiple';
  /**
   * Set disabled state. The select is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Callback function to be called when a new value is selected.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  children,
  className,
  disabled = false,
  icon = 'increase',
  label,
  kind = 'single',
  onChange,
  ...otherProps
}, forwardedRef) => {
  const uid = useId();

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Select, className)}
      data-select-is-multiple={kind === 'multiple'}
      data-select-has-label={Boolean(label)}
      aria-disabled={disabled}
      hAlign="start"
      vAlign="start"
      inline
      tabIndex={disabled ? 0 : undefined}
    >
      <div className={styles.FieldContainer}>
        <select
          disabled={disabled}
          className={styles.Field}
          id={`${uid}-select`}
          multiple={kind === 'multiple'}
          onChange={onChange}
          ref={forwardedRef}
          {...otherProps}
        >
          {children}
          {label && <option hidden disabled>{label}</option>}
        </select>

        {kind === 'single' && (
          <Icon
            className={styles.Icon}
            source={icon}
            dimension={18}
          />
        )}

        <Text
          as="label"
          dimmed={5}
          size={14}
          responsive={false}
          htmlFor={`${uid}-select`}
          className={styles.Label}
        >
          {label}
        </Text>
      </div>
    </Stack>
  );
});

Select.displayName = 'Select';
