/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'motion/react';
import {
  FC,
  ReactNode, useCallback,
  useEffect,
  useId, useRef, useState,
} from 'react';

import { Stack, Text, TextProps } from '@/components';

import styles from './switch.module.css';

export type SwitchProps = Exclude<SwitchPrimitive.SwitchProps, 'asChild'>
 & React.ComponentPropsWithRef<typeof SwitchPrimitive.Root> & {
   /**
   * Set the size of the switch.
   *
   * @defaultValue "regular"
   */
   dimension?: 'small' | 'regular' | 'big';
   /**
   * Assign a label to the input.
   */
   label?: ReactNode;
   /**
   * Assign a label to the input when is checked.
   */
   checkedLabel?: ReactNode;
   /**
   * Set the position of the label relative to the switch.
   *
   * @defaultValue "end"
   */
   labelPosition?: 'start' | 'end';
 };

type Properties = Record<NonNullable<SwitchProps['dimension']>, {
  text: {
    size: TextProps['size'];
    lh?: TextProps['lineHeight'];
  };
}>

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
  big: {
    text: {
      size: 22,
    },
  },
};

export const Switch: FC<SwitchProps> = ({
  dimension = 'regular',
  labelPosition = 'end',
  className,
  label,
  checkedLabel,
  checked,
  onCheckedChange,
  defaultChecked,
  ref: forwardedRef,
  ...otherProps
}) => {
  const uid = useId();
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);
  const [shouldShowCheckedLabel, setShowCheckedLabel] = useState(Boolean(checkedLabel));

  const handleCheckedChange = useCallback((checked: boolean) => {
    onCheckedChange?.(checked);
    setIsChecked(checked);
  }, [onCheckedChange]);

  useEffect(() => {
    setShowCheckedLabel(Boolean(checkedLabel));
  }, [checkedLabel]);

  return (
    <LazyMotion features={domMax} strict>
      <Stack
        as={m.div}
        direction={labelPosition === 'end' ? 'row' : 'row-reverse'}
        vAlign="start"
        columnGap={8}
        fill={false}
        inline
        layout
        layoutRoot
      >
        <SwitchPrimitive.Root
          className={clsx(styles.Switch, className)}
          data-switch-dimension={dimension}
          ref={forwardedRef}
          id={uid}
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          defaultChecked={defaultChecked}
          {...otherProps}
        >
          <SwitchPrimitive.Thumb asChild>
            <m.span
              className={styles.Thumb}
              layout
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 50,
              }}
            />
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
        <AnimatePresence initial={false} mode="popLayout">
          {label && (
            <Text
              as="label"
              className={styles.Label}
              lineHeight={properties[dimension].text.lh}
              htmlFor={uid}
              size={properties[dimension].text.size}
              ref={labelRef}
            >
              {(!shouldShowCheckedLabel || (shouldShowCheckedLabel && !isChecked)) && (
                <m.span
                  key="label"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                >
                  {label}
                </m.span>
              )}
              {(shouldShowCheckedLabel && isChecked) && (
                <m.span
                  key="label-checked"
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                >
                  {checkedLabel}
                </m.span>
              )}
            </Text>
          )}
        </AnimatePresence>
      </Stack>
    </LazyMotion>
  );
};
