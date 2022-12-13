import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import { ElementRef, forwardRef } from 'react';

import styles from './switch.module.css';

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  /**
   * Set the size of the switch.
   */
  dimension?: 'small' | 'regular' | 'big';
};

export const Switch = forwardRef<
ElementRef<typeof SwitchPrimitive.Root>,
SwitchProps
>(({
  dimension = 'regular',
  className,
  ...otherProps
}, forwardedRef) => (
  <LazyMotion features={domMax} strict>
    <SwitchPrimitive.Root
      className={clsx(styles.Switch, className)}
      data-switch-dimension={dimension}
      ref={forwardedRef}
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
  </LazyMotion>
));
