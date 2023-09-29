'use client';

import clsx from 'clsx';
import {
  ChangeEvent, forwardRef, TextareaHTMLAttributes, useId, useMemo,
} from 'react';

import {
  ClampText, Stack, Text,
} from '@/components';

import { BaseField, BaseFieldProps } from '../base-field';
import styles from './textarea.module.css';

export type TextareaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
   * The callback function that is called when the textarea value changes.
   */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Make the textfield full width, filling the available space.
   */
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  children,
  className,
  disabled = false,
  label,
  readOnly,
  invalid,
  id,
  style,
  onChange,
  fullWidth,
  ...otherProps
}, forwardedRef) => {
  const uid = useId();
  const fieldID = useMemo(() => id ?? `${uid}-textarea`, [id, uid]);

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
          as="textarea"
          id={fieldID}
          readOnly={readOnly}
          invalid={invalid}
          disabled={disabled}
          onChange={onChange}
          {...otherProps}
        />

        <Text as="label" responsive={false} dimmed={5} className={styles.Label} size={14} htmlFor={fieldID}>
          <ClampText rows={1}>{label}</ClampText>
        </Text>
      </div>
    </Stack>
  );
});

Textarea.displayName = 'Textarea';
