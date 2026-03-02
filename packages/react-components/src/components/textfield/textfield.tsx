'use client';

import clsx from 'clsx';
import {
  ChangeEvent,
  FC,
  InputEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

import { Icon, IconButton, IconProps, Stack, Text } from '@/components';

import { BaseField, BaseFieldProps } from '../base-field';
import styles from './textfield.module.css';

export type TextfieldProps = BaseFieldProps &
  React.ComponentPropsWithRef<'input'> & {
    /**
     * Set the icon to show on the left or right side of the input.
     */
    icon?: IconProps['source'];
    /**
     * Set in which side of the field the icon should be displayed.
     *
     * @defaultValue 'end'
     */
    iconPosition?: 'start' | 'end';
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
     * @see [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
     * @defaultValue 'text'
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
     *
     * @defaultValue false
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
    /**
     * Show the action button on the right side of the input.
     *
     * This prop prevent icon to be displayed.
     */
    showClearButton?: boolean;
    /**
     * Set the hint message to show when the field is resting or invalid.
     */
    hint?: {
      resting?: ReactNode;
      invalid?: ReactNode;
    };
    /**
     * Event handler for the clear button.
     *
     * @returns void
     */
    onClear?: () => void;
  };

export const Textfield: FC<TextfieldProps> = ({
  className,
  disabled = false,
  icon,
  label,
  invalid,
  id,
  iconPosition = 'end',
  type = 'text',
  style,
  onChange,
  fullWidth,
  onClear,
  value,
  defaultValue,
  onInput,
  showClearButton = false,
  hint,
  ref: forwardedRef,
  ...otherProps
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(invalid ?? false);
  const [isUserInvalid, setIsUserInvalid] = useState<boolean>(invalid ?? false);
  const uid = useId();
  const isPassword = type === 'password';
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldHaveIcon = !['date', 'datetime-local', 'time', 'month', 'week'].includes(type);
  const fieldID = useMemo(() => id ?? `${uid}-field`, [id, uid]);
  const [isEmpty, setIsEmpty] = useState<boolean>(!(value ?? defaultValue));

  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisible((visibility) => !visibility);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsEmpty(!event.currentTarget.value);
      onChange?.(event);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsEmpty(true);
    }

    onClear?.();
  }, [onClear]);

  useEffect(() => {
    const input = inputRef.current;
    input?.setCustomValidity(invalid === true ? 'Invalid input' : '');
    setIsUserInvalid(invalid ?? false);
  }, [invalid]);

  const handleInvalid = useCallback(
    (event: InputEvent<HTMLInputElement>) => {
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
      className={clsx(styles.Textfield, className)}
      data-textfield-has-icon={isPassword || (Boolean(icon) && shouldHaveIcon)}
      data-textfield-icon-position={showClearButton ? 'end' : iconPosition}
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
          ref={mergeRefs([inputRef, forwardedRef])}
          type={isPasswordVisible ? 'text' : type}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          invalid={invalid}
          disabled={disabled}
          // Prevent the default popup message of the browser when the field is invalid.
          onInvalid={handleInvalid}
          onInput={handleInvalid}
          {...otherProps}
        />
        {isPassword ? (
          <IconButton
            className={styles.ActionButton}
            onClick={handlePasswordVisibility}
            kind="flat"
            aria-label="Reveal password"
            icon={isPasswordVisible ? 'hide' : 'view'}
          />
        ) : (
          showClearButton &&
          !isEmpty && (
            <IconButton
              className={styles.ActionButton}
              onClick={handleClear}
              kind="flat"
              aria-label="Clear field"
              icon="c-remove"
            />
          )
        )}

        {icon && !isPassword && shouldHaveIcon && !showClearButton && (
          <Stack className={styles.Icon} hPadding={8} vPadding={8}>
            <Icon source={icon} dimension={22} />
          </Stack>
        )}

        {label !== '' && (
          <Text
            as="label"
            responsive={false}
            dimmed={5}
            className={styles.Label}
            size={14}
            htmlFor={fieldID}
          >
            {label}
          </Text>
        )}
      </div>
      {(hint?.resting ?? hint?.invalid) && (
        <Stack className={styles.Hint} hPadding={16}>
          <Text
            size={14}
            weight={invalid || isUserInvalid ? 'bold' : undefined}
            dimmed={invalid || isUserInvalid ? undefined : 5}
            textColor={invalid || isUserInvalid ? 'var(--invalid-foreground)' : undefined}
          >
            {invalid || isUserInvalid ? hint.invalid : hint.resting}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
