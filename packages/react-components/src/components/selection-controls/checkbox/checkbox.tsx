'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useCallback, useEffect, useId, useRef,
  useState,
} from 'react';

import { Stack, Text, TextProps } from '@/components';

import styles from '../selection-controls.module.css';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Set the indeterminate state. This state is used to indicate that the checkbox is partially checked.
   * Is used when a subset of the options are selected but not all of them.
   */
  indeterminate?: boolean;
  /**
   * Set the size of the toggle.
   *
   * @defaultValue "regular"
   */
  dimension?: 'regular' | 'small';
  /**
   * Callback function to be called when is toggled.
   * A parameter `ChangeEvent<HTMLInputElement>` is passed with the event details
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Assign a label to the input. If passed an ID is automatically generated and used internally
   */
  label?: ReactNode;
  /**
   * Set the position of the label relative to the checkbox.
   *
   * @defaultValue "end"
   */
  labelPosition?: 'start' | 'end';
  /**
   * Force the invalid state of the field.
   */
  invalid?: boolean;
  /**
   * Set the hint message to show when the field is invalid.
   *
   * @defaultValue 'Required input'
   * This prop is not visible when the field is not invalid, is disabled, or readnly
   */
  hint?: ReactNode;
}

type Properties = Record<NonNullable<CheckboxProps['dimension']>, {
  text: {
    size: TextProps['size'];
    labelSize?: TextProps['size'];
    lh?: TextProps['lineHeight'];
    padding?: TokensTypes['space'];
  };
}>

const properties: Properties = {
  small: {
    text: {
      size: 16,
      labelSize: 12,
      lh: 'extra-small',
      padding: 24,
    },
  },
  regular: {
    text: {
      size: 18,
      labelSize: 14,
      padding: 32,
    },
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  disabled,
  dimension = 'regular',
  labelPosition = 'end',
  onChange,
  indeterminate,
  label,
  onInput,
  invalid,
  hint = 'Required input',
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);
  const [isUserInvalid, setIsUserInvalid] = useState<boolean>(invalid ?? false);
  const uid = useId();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleInvalid = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      onInput?.(event);
      setIsUserInvalid(!event.currentTarget.validity.valid);
    },
    [onInput],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <Stack className={styles.SelectionControl}>
        <Stack
          direction={labelPosition === 'end' ? 'row' : 'row-reverse'}
          vAlign="start"
          columnGap={8}
          fill={false}
          inline
        >
          <m.span
            className={styles.InputWrapper}
            whileTap={!disabled ? { scale: 1.15 } : undefined}
            tabIndex={-1}
            transition={{ duration: 0.3, ease: 'backOut' }}
            data-selection-control-invalid={invalid ?? isUserInvalid}
          >
            <input
              type="checkbox"
              disabled={disabled}
              aria-disabled={disabled}
              data-control-dimension={dimension}
              onChange={onChange}
              className={clsx(styles.CheckboxInput, className)}
              ref={ref}
              onInvalid={handleInvalid}
              onInput={handleInvalid}
              id={label ? uid : undefined}
              {...otherProps}
            />
          </m.span>
          {label && (
            <Text
              as="label"
              lineHeight={properties[dimension].text.lh}
              htmlFor={uid}
              size={properties[dimension].text.size}
            >
              {label}
            </Text>
          )}
        </Stack>
        {(invalid ?? isUserInvalid) && (
          <Stack
            hPadding={properties[dimension].text.padding}
          >
            <Text
              as="div"
              size={properties[dimension].text.labelSize}
              weight="bold"
              textColor="var(--invalid-foreground)"
            >
              &nbsp;
              {hint}
            </Text>
          </Stack>
        )}
      </Stack>
    </LazyMotion>
  );
});

Checkbox.displayName = 'Checkbox';
