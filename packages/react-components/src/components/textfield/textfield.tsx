import clsx from 'clsx';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, Ref, useCallback, useId, useMemo, useState,
} from 'react';

import {
  ClampText,
  Icon, IconButton, IconProps, Stack, Text,
} from '@/components';

import { BaseField, BaseFieldProps } from '../base-field';
import styles from './textfield.module.css';

export type TextfieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set the icon to show on the left or right side of the input.
   */
  icon?: IconProps['source'];
  /**
   * Set in which side of the field the icon should be displayed.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Define the accessible label of the input. While this is not
   * mandatory, an input should always have a label. If not using this property
   * you can bind a custom label to the input by using an id.
   */
  label: string;
  /**
   * Set the input type. The value can be anything that
   * is supported by the HTML input element.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types
   */
  type?: string;
  /**
   * Set the field into a readonly state. When readonly, the field value
   * cannot be edited but it can still be selected and copied.
   */
  readOnly?: boolean;
  /**
   * Set the field into a disabled state. When disabled, the field value cannot be
   * edited, selected or copied, but it can still be focused and navigated by AT.
   */
  disabled?: boolean;
  /**
   * The callback function that is called when the input value changes.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Make the textfield full width, filling the available space.
   */
  fullWidth?: boolean;
}

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(({
  children,
  className,
  disabled = false,
  icon,
  label,
  readOnly,
  invalid,
  id,
  iconPosition = 'right',
  type = 'text',
  style,
  onChange,
  fullWidth,
  ...otherProps
}, forwardedRef) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const uid = useId();
  const isPassword = type === 'password';
  const isNotDate = !['date', 'datetime-local'].includes(type);
  const fieldID = useMemo(() => id ?? `${uid}-field`, [id, uid]);

  const handlePasswordVisibility = useCallback(
    () => {
      setPasswordVisible(visibility => !visibility);
    },
    [],
  );

  const commonProps = {
    readOnly,
    invalid,
    disabled,
    onChange,
  };

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Textfield, className)}
      data-textfield-has-icon={isPassword || (Boolean(icon) && isNotDate)}
      data-textfield-icon-position={iconPosition}
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
          className={styles.InputField}
          id={fieldID}
          ref={forwardedRef as Ref<HTMLInputElement>}
          type={isPasswordVisible ? 'text' : type}
          {...commonProps}
          {...otherProps}
        />
        {isPassword && (
          <IconButton
            className={styles.IconButton}
            onClick={handlePasswordVisibility}
            kind="flat"
            aria-label="Reveal password"
            icon={isPasswordVisible ? 'hide' : 'view'}
          />
        )}

        { icon && (!isPassword && isNotDate) && (
          <Icon
            className={styles.Icon}
            source={icon}
            dimension={18}
          />
        )}

        <Text as="label" responsive={false} dimmed={5} className={styles.Label} size={14} htmlFor={fieldID}>
          <ClampText rows={1}>{label}</ClampText>
        </Text>
      </div>
    </Stack>
  );
});

Textfield.displayName = 'Textfield';
