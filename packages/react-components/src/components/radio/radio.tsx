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
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: '-50%',
      y: '-50%',
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <RadioPrimitive.Item
        asChild
        className={clsx(styles.Radio, className)}
        data-radio-dimension={dimension}
        ref={forwardedRef}
        {...otherProps}
      >
        <m.button whileTap={{ scale: 1.15 }} transition={{ duration: 0.3, ease: 'backOut' }}>
          <RadioPrimitive.Indicator asChild>
            <m.span
              className={styles.Icon}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animation}
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30,
              }}
            >
              <Icon dimension={12} source="shape-oval" />
            </m.span>
          </RadioPrimitive.Indicator>
        </m.button>
      </RadioPrimitive.Item>
    </LazyMotion>
  );
});

export const RadioGroup = RadioPrimitive.Root;
