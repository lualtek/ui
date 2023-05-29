'use client';

import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useId, useRef,
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
   */
  labelPosition?: 'start' | 'end';
}

type Properties = Record<NonNullable<CheckboxProps['dimension']>, {
  text: {
    size: TextProps['size'];
    lh?: TextProps['lineHeight'];
  };
}>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  disabled,
  dimension = 'regular',
  labelPosition = 'end',
  onChange,
  indeterminate,
  label,
  ...otherProps
}, forwardedRef) => {
  const ref = useRef<any>(forwardedRef);
  const uid = useId();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const properties: Properties = {
    small: {
      text: {
        size: 16,
        lh: 'extra-small',
      },
    },
    regular: {
      text: {
        size: 18,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <Stack
        direction={labelPosition === 'end' ? 'row' : 'row-reverse'}
        vAlign="start"
        columnGap={8}
        fill={false}
        inline
      >
        <m.span
          className={styles.InputWrapper}
          whileTap={{ scale: 1.15 }}
          tabIndex={-1}
          transition={{ duration: 0.3, ease: 'backOut' }}
        >
          <input
            type="checkbox"
            disabled={disabled}
            aria-disabled={disabled}
            data-control-dimension={dimension}
            onChange={onChange}
            className={clsx(styles.CheckboxInput, className)}
            ref={ref}
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
    </LazyMotion>
  );
});

Checkbox.displayName = 'Checkbox';
