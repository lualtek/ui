import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { forwardRef, Ref } from 'react';

import {
  ClampText, Icon, IconProps, Stack,
} from '@/components';
import { FCChildrenClass } from '@/types';

import * as styles from './chip.module.css';

export type ChipProps = {
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: TokensTypes['colors'];
  /**
   * Make the chip dismissable. When `true` adds a close button on the side.
   */
  interactive?: boolean;
  /**
   * Callback function to be called when the dismiss button is pressed.
   */
  onDismissClick?: () => void;
  /**
   * Show an icon before the chip content.
   * @important The icon is not rendered if `dismissable` is `true`
   */
  icon?: IconProps['source'];
}

export const Chip: FCChildrenClass<ChipProps> = forwardRef(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  icon,
  interactive,
  onDismissClick,
  ...otherProps
}, forwardedRef: Ref<HTMLSpanElement>) => {
  const sizes: Record<string, {
    icon: IconProps['dimension'];
  }> = {
    small: {
      icon: 12,
    },
    regular: {
      icon: 16,
    },
    big: {
      icon: 18,
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
      {(icon && !interactive) && (
        <Icon
          source={icon}
          dimension={sizes[dimension].icon}
        />
      )}

      <ClampText as="b" rows={1}>{children}</ClampText>
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
