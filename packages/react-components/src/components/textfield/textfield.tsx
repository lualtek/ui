import clsx from 'clsx';
import {
  ChangeEvent, forwardRef, Ref, useCallback, useMemo, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  ClampText,
  Icon, IconButton, IconProps, Stack, Text,
} from '@/components';

import { BaseField, BaseFieldProps, PrimitiveInputType } from './base-field';
import * as styles from './textfield.module.css';

export type TextfieldProps = BaseFieldProps & {
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
   * Set the input to be a textarea instead of a single line field.
   * This property completely changes the rendered element from an input to a textarea.
   */
  textarea?: boolean;
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
  onChange?: (event: ChangeEvent<PrimitiveInputType>) => void;
  /**
   * Make the textfield full width, filling the available space.
   */
  fullWidth?: boolean;
}

export const Textfield = forwardRef<PrimitiveInputType, TextfieldProps>(({
  children,
  className,
  disabled = false,
  icon,
  label,
  textarea,
  readOnly,
  invalid,
  id,
  iconPosition = 'right',
  type,
  style,
  onChange,
  fullWidth,
  ...otherProps
}, forwardedRef) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const seedID = useUIDSeed();
  const isPassword = type === 'password';
  const fieldID = useMemo(() => id ?? seedID('field'), [id, seedID]);

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
      data-textfield-has-icon={isPassword || Boolean(icon)}
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
        {textarea
          ? (
            <BaseField
              ref={forwardedRef as Ref<HTMLTextAreaElement>}
              as="textarea"
              id={fieldID}
              {...commonProps}
              {...otherProps}
            />
          )
          : (
            <BaseField
              className={styles.InputField}
              id={fieldID}
              ref={forwardedRef as Ref<HTMLInputElement>}
              type={isPasswordVisible ? 'text' : type}
              {...commonProps}
              {...otherProps}
            />
          )
          }
        {isPassword && (
          <IconButton
            className={styles.IconButton}
            dimension="regular"
            onClick={handlePasswordVisibility}
            kind="flat"
            aria-label="Reveal password"
            icon={isPasswordVisible ? 'hide' : 'view'}
          />
        )}

        { !textarea && icon && !isPassword && (
          <Icon
            className={styles.Icon}
            source={icon}
            dimension={16}
          />
        )}

        <Text as="label" dimmed={5} className={styles.Label} size={14} htmlFor={fieldID}>
          <ClampText rows={1}>{label}</ClampText>
        </Text>
      </div>
    </Stack>
  );
});

Textfield.displayName = 'Textfield';
