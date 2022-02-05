import * as RadioPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { ElementRef, forwardRef } from 'react';

import { Icon } from '@/components';

import styles from './radio.module.css';

export type RadioProps = RadioPrimitive.RadioGroupItemProps & {
  dimension?: 'small' | 'regular';
};

export const Radio = forwardRef<
ElementRef<typeof RadioPrimitive.Item>,
RadioProps
>(({
  dimension = 'regular',
  className,
  ...otherProps
}, forwardedRef) => {
  const animation = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: '-50%',
      y: '-50%',
      transition: {
        ease: 'backOut',
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: '-50%',
      y: '-50%',
      transition: {
        ease: 'backOut',
        duration: 0.2,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <RadioPrimitive.Item
        asChild
        className={clsx(styles.Radio, className)}
        data-radio-dimension={dimension}
        ref={forwardedRef}
        {...otherProps}
      >
        <m.button whileTap={{ scale: 1.15 }} transition={{ duration: 0.3, ease: 'backOut' }}>
          <RadioPrimitive.Indicator asChild>
            <m.span className={styles.Icon} initial="hidden" animate="visible" exit="hidden" variants={animation}>
              <Icon dimension={12} source="shape-oval" />
            </m.span>
          </RadioPrimitive.Indicator>
        </m.button>
      </RadioPrimitive.Item>
    </LazyMotion>
  );
});

export const RadioGroup = RadioPrimitive.Root;
