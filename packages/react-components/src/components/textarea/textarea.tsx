'use client';

import clsx from 'clsx';
import { type ChangeEvent, type ReactNode, forwardRef, useCallback, useId, useMemo, useState } from 'react';

import { ClampText, Stack, Text } from '@/components';

import { BaseField, type BaseFieldProps } from '../base-field';
import styles from './textarea.module.css';

export type TextareaProps = BaseFieldProps &
  React.ComponentPropsWithRef<'textarea'> & {
    /**
     * Define the accessible label of the textarea. While this is not
     * mandatory, an textarea should always have a label. If not using this property
     * you can bind a custom label to the textarea by using an id.
     */
    label: string;
    /**
     * Set the field into a readonly state. When readonly, the field value
     * cannot be edited but it can still be selected and copied.
     */
    readOnly?: boolean;
    /**
     * Set the field into a disabled state. When disabled, the field value cannot be
     * edited, selected or copied, but it can still be focused and navigated by AT.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Make the textfield full width, filling the available space.
     */
    fullWidth?: boolean;
    /**
     * Set the hint message to show when the field is invalid.
     *
     * @defaultValue 'Invalid input'
     * This prop is not visible when the field is not invalid, is disabled, or readnly
     */
    hint?: ReactNode;
    /**
     * The callback function that is called when the textarea value changes.
     */
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      children,
      className,
      disabled = false,
      label,
      readOnly,
      invalid,
      id,
      style,
      onChange,
      onInput,
      fullWidth,
      hint = 'Invalid input',
      ...otherProps
    },
    forwardedRef,
  ) => {
    const uid = useId();
    const fieldID = useMemo(() => id ?? `${uid}-textarea`, [id, uid]);
    const [isUserInvalid, setIsUserInvalid] = useState<boolean>(invalid ?? false);

    const handleInvalid = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        onInput?.(event);
        setIsUserInvalid(!event.currentTarget.validity.valid);
      },
      [onInput],
    );

    return (
      <Stack
        as="fieldset"
        rowGap={4}
        className={clsx(styles.Textarea, className)}
        data-textfield-invalid={invalid}
        data-textfield-fullwidth={fullWidth}
        aria-disabled={disabled}
        hAlign="stretch"
        vAlign="start"
        tabIndex={disabled ? 0 : undefined}
        style={style}
      >
        <div className={styles.FieldContainer}>
          <BaseField
            ref={forwardedRef}
            className={styles.InputField}
            as="textarea"
            id={fieldID}
            readOnly={readOnly}
            invalid={invalid}
            disabled={disabled}
            onChange={onChange}
            // Prevent the default popup message of the browser when the field is invalid.
            onInput={handleInvalid}
            onInvalid={handleInvalid}
            {...otherProps}
          />

          <Text as="label" responsive={false} dimmed={5} className={styles.Label} size={14} htmlFor={fieldID}>
            <ClampText rows={1}>{label}</ClampText>
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
  },
);
