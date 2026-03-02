'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'motion/react';
import type { ChangeEvent, FC, InputEvent, ReactNode } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import type { TextProps } from '@/components';
import { Stack, Text } from '@/components';

import styles from '../selection-controls.module.css';

export type CheckboxProps = React.ComponentPropsWithRef<'input'> & {
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
};

type Properties = Record<
  NonNullable<CheckboxProps['dimension']>,
  {
    text: {
      labelSize: TextProps['size'];
      hintSize?: TextProps['size'];
      lh?: TextProps['lineHeight'];
      padding?: TokensTypes['space'];
    };
  }
>;

const properties: Properties = {
  small: {
    text: {
      labelSize: 16,
      hintSize: 12,
      lh: 'extra-small',
      padding: 24,
    },
  },
  regular: {
    text: {
      labelSize: 18,
      hintSize: 14,
      padding: 32,
    },
  },
};

export const Checkbox: FC<CheckboxProps> = ({
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
  ref: forwardedRef,
  ...otherProps
}) => {
  const ref = useRef<any>(null);
  const [isUserInvalid, setIsUserInvalid] = useState<boolean>(invalid ?? false);
  const uid = useId();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleInvalid = useCallback(
    (event: InputEvent<HTMLInputElement>) => {
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
              ref={mergeRefs([ref, forwardedRef])}
              onInvalid={handleInvalid}
              onInput={handleInvalid}
              id={label ? uid : undefined}
              {...otherProps}
            />
          </m.span>
          {label && (
            <Text
              as="label"
              className={styles.Label}
              lineHeight={properties[dimension].text.lh}
              htmlFor={uid}
              dimmed={disabled ? 4 : undefined}
              size={properties[dimension].text.labelSize}
            >
              {label}
            </Text>
          )}
        </Stack>
        {(invalid ?? isUserInvalid) && (
          <Stack hPadding={properties[dimension].text.padding}>
            <Text
              as="div"
              size={properties[dimension].text.hintSize}
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
};
