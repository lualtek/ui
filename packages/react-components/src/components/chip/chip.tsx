import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { forwardRef, Ref, useMemo } from 'react';

import {
  ClampText, Icon, IconProps, Stack, StackProps,
} from '@/components';
import { FCChildrenClass } from '@/components/types';

import styles from './chip.module.css';

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
  dismissable?: boolean;
  /**
   * Turn the chip into a button to add interactions like popovers or custom actions.
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

type Sizes = Record<NonNullable<ChipProps['dimension']>, {
  icon: IconProps['dimension'];
}>

const sizes: Sizes = {
  small: {
    icon: 12,
  },
  regular: {
    icon: 14,
  },
  big: {
    icon: 18,
  },
};

export const Chip: FCChildrenClass<ChipProps> = forwardRef(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  icon,
  interactive,
  dismissable,
  onDismissClick,
  ...otherProps
}, forwardedRef: Ref<HTMLButtonElement>) => {
  const commonProps: StackProps & Record<string, unknown> = useMemo(() => ({
    direction: 'row',
    columnGap: 8,
    inline: true,
    fill: false,
    'data-chip-color': color,
    'data-chip-dimension': dimension,
    className: clsx(styles.Chip, className),
    vAlign: 'center',
  }), [className, color, dimension]);

  const Content = useMemo(() => (
    <>
      {(icon && !dismissable) && (
        <Icon
          source={icon}
          dimension={sizes[dimension].icon}
        />
      )}

      <ClampText as="b" rows={1}>{children}</ClampText>
      {(!interactive && dismissable) && (
        <button onClick={onDismissClick} className={styles.Action} type="button">
          <Icon
            source="remove"
            dimension={sizes[dimension].icon}
          />
        </button>
      )}
    </>
  ), [children, dimension, dismissable, icon, interactive, onDismissClick]);

  return interactive ? (
    <Stack
      as="button"
      ref={forwardedRef}
      {...commonProps}
      {...otherProps}
    >
      {Content}
    </Stack>
  ) : (
    <Stack
      as="span"
      ref={forwardedRef}
      {...commonProps}
      {...otherProps}
    >
      {Content}
    </Stack>
  );
});

Chip.displayName = 'Chip';
