import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  ElementRef, forwardRef, ReactNode, useId,
} from 'react';

import { Stack, Text, TextProps } from '@/components';

import styles from './switch.module.css';

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  /**
   * Set the size of the switch.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Assign a label to the input. If passed an ID is automatically generated and used internally
   */
  label?: ReactNode;
  /**
   * Set the position of the label relative to the switch.
   */
  labelPosition?: 'start' | 'end';
};

type Properties = Record<NonNullable<SwitchProps['dimension']>, {
  text: {
    size: TextProps['size'];
    lh?: TextProps['lineHeight'];
  };
}>

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(({
  dimension = 'regular',
  labelPosition = 'end',
  className,
  label,
  ...otherProps
}, forwardedRef) => {
  const uid = useId();

  const properties: Properties = {
    small: {
      text: {
        size: 16,
        lh: 'none',
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
          id={label ? uid : undefined}
          {...otherProps}
        >
          <SwitchPrimitive.Thumb asChild>
            <m.span
              className={styles.Thumb}
              layout
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30,
              }}
            />
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
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
