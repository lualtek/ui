import * as CheckboxPrimitve from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ElementRef, forwardRef } from 'react';

import { Icon } from '@/components';

import styles from './checkbox.module.css';

export type CheckboxProps = CheckboxPrimitve.CheckboxProps & {
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

  return (
    <CheckboxPrimitve.Root
      className={clsx(styles.Checkbox, className)}
      checked={checked}
      data-checkbox-dimension={dimension}
      ref={forwardedRef}
      {...otherProps}
    >
      <CheckboxPrimitve.CheckboxIndicator>
        {isIndeterminate && <Icon className={styles.Icon} dimension={12} source="minus" />}
        {!isIndeterminate && <Icon className={styles.Icon} dimension={12} source="check" />}
      </CheckboxPrimitve.CheckboxIndicator>
    </CheckboxPrimitve.Root>
  );
});
