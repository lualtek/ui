'use client';

import clsx from 'clsx';
import type { ChangeEvent, FC, ReactNode } from 'react';
import { useCallback, useId, useState } from 'react';

import type { IconProps } from '@/components';
import { Icon, Stack, Text } from '@/components';

import styles from './select.module.css';

export type SelectProps = React.ComponentPropsWithRef<'select'> & {
  /**
   * Change the default icon displayed on the side of the select.
   *
   * @defaultValue "increase"
   */
  icon?: IconProps['source'];
  /**
   * Set the accessible label for the select.
   */
  label: ReactNode;
  /**
   * Set how many options can be selected at once.
   *
   * @defaultValue "single"
   */
  kind?: 'single' | 'multiple';
  /**
   * Set disabled state. The select is not interactive and grayed out.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Callback function to be called when a new value is selected.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Force the select to take the full width of its container.
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * Set the select to an invalid state. This will show a hint message.
   */
  invalid?: boolean;
  /**
   * Set the hint message to show when the field is invalid.
   */
  hint?: ReactNode;
};

export const Select: FC<SelectProps> = ({
  children,
  className,
  disabled = false,
  icon = 'increase',
  label,
  kind = 'single',
  onChange,
  fullWidth = false,
  invalid,
  hint = 'Invalid input',
  ref: forwardedRef,
  ...otherProps
}) => {
  const uid = useId();
  const [isUserInvalid, setIsUserInvalid] = useState<boolean>(invalid ?? false);

  const handleInvalid = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setIsUserInvalid(!event.currentTarget.validity.valid);
  }, []);

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Select, className)}
      data-select-is-multiple={kind === 'multiple'}
      data-select-invalid={invalid}
      data-select-has-label={Boolean(label)}
      data-select-is-full-width={fullWidth}
      aria-disabled={disabled}
      hAlign="start"
      vAlign="start"
      tabIndex={disabled ? 0 : undefined}
    >
      <div className={styles.FieldContainer}>
        <select
          disabled={disabled}
          className={styles.InputField}
          id={`${uid}-select`}
          multiple={kind === 'multiple'}
          onChange={onChange}
          ref={forwardedRef}
          onInvalid={handleInvalid}
          {...otherProps}
        >
          {children}
          {label && (
            <option hidden disabled>
              {label}
            </option>
          )}
        </select>

        {kind === 'single' && <Icon className={styles.Icon} source={icon} dimension={18} />}

        <Text as="label" dimmed={5} size={14} responsive={false} htmlFor={`${uid}-select`} className={styles.Label}>
          {label}
        </Text>
      </div>
      {(invalid ?? isUserInvalid) && (
        <Stack className={styles.Hint} hPadding={16}>
          <Text as="div" size={14} weight="bold" textColor="var(--invalid-foreground)">
            {hint}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
