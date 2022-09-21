import clsx from 'clsx';
import { forwardRef } from 'react';

import { Icon, IconProps, Stack } from '@/components';

import * as styles from './chip.module.css';

export type ChipProps = PropsClassChildren<{
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue';
  /**
   * Make the chip dismissable. When `true` adds a close button on the side.
   */
  interactive?: boolean;
  /**
   * Callback function to be called when the dismiss button is pressed.
   */
  onDismissClick?: () => void;
}>

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  interactive,
  onDismissClick,
  ...otherProps
}, forwardedRef) => {
  const sizes: Record<string, {
    icon: IconProps['dimension'];
  }> = {
    small: {
      icon: 12,
    },
    regular: {
      icon: 12,
    },
    big: {
      icon: 16,
    },
  };

  return (
    <Stack
      as="span"
      direction="row"
      columnGap={8}
      inline
      fill={false}
      data-chip-color={color}
      data-chip-dimension={dimension}
      className={clsx(styles.Chip, className)}
      vAlign="center"
      ref={forwardedRef}
      {...otherProps}
    >
      <b>{children}</b>
      {interactive && (
        <button onClick={interactive && onDismissClick} className={styles.Action} type="button">
          <Icon
            source="remove"
            dimension={sizes[dimension].icon}
          />
        </button>
      )}
    </Stack>
  );
});

Chip.displayName = 'Chip';
