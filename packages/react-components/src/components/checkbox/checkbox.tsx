import * as CheckboxPrimitve from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { ElementRef, forwardRef } from 'react';

import { Icon } from '@/components';

import styles from './checkbox.module.css';

export type CheckboxProps = CheckboxPrimitve.CheckboxProps & {
  /**
   * Set the size of the checkbox.
   */
  dimension?: 'small' | 'regular';
};

export const Checkbox = forwardRef<
ElementRef<typeof CheckboxPrimitve.Root>,
CheckboxProps
>(({
  dimension = 'regular',
  checked,
  className,
  ...otherProps
}, forwardedRef) => {
  const isIndeterminate = checked === 'indeterminate';

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
      <CheckboxPrimitve.Root
        className={clsx(styles.Checkbox, className)}
        checked={checked}
        data-checkbox-dimension={dimension}
        ref={forwardedRef}
        asChild
        {...otherProps}
      >
        <m.button whileTap={{ scale: 1.15 }} transition={{ duration: 0.3, ease: 'backOut' }}>
          <CheckboxPrimitve.CheckboxIndicator asChild>
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
              <Icon dimension={12} source={isIndeterminate ? 'minus' : 'check'} />
            </m.span>
          </CheckboxPrimitve.CheckboxIndicator>
        </m.button>
      </CheckboxPrimitve.Root>
    </LazyMotion>
  );
});
