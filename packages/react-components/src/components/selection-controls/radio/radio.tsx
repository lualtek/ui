'use client';

import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'motion/react';
import {
  ChangeEvent, forwardRef, ReactNode, useId,
} from 'react';

import { Stack, Text, TextProps } from '@/components';

import styles from '../selection-controls.module.css';

export type RadioProps = React.ComponentPropsWithRef<'input'> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
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
   * Set the position of the label relative to the radio.
   *
   * @defaultValue "end"
   */
  labelPosition?: 'start' | 'end';
}

type Properties = Record<NonNullable<RadioProps['dimension']>, {
  text: {
    size: TextProps['size'];
    lh?: TextProps['lineHeight'];
  };
}>

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className,
  disabled,
  dimension = 'regular',
  labelPosition = 'end',
  onChange,
  label,
  ...otherProps
}, forwardedRef) => {
  const uid = useId();

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
          whileTap={!disabled ? { scale: 1.15 } : undefined}
          tabIndex={-1}
          transition={{ duration: 0.3, ease: 'backOut' }}
        >
          <input
            type="radio"
            disabled={disabled}
            aria-disabled={disabled}
            data-control-dimension={dimension}
            onChange={onChange}
            className={clsx(styles.RadioInput, className)}
            ref={forwardedRef}
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
            size={properties[dimension].text.size}
          >
            {label}
          </Text>
        )}
        {' '}

      </Stack>
    </LazyMotion>
  );
});
