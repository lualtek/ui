'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import {
  FC,
  Ref, SyntheticEvent, useMemo,
} from 'react';

import {
  Icon, IconProps, Stack, StackProps, Text,
} from '@/components';

import styles from './chip.module.css';

type ForwardedElementType<T extends boolean> = T extends true ? HTMLButtonElement : HTMLSpanElement;

export type ChipProps = React.ComponentPropsWithRef<'button'> & {
  /**
   * Set the dimension of the component.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   * @defaultValue "primary"
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
   * The icon is not rendered if `dismissable` is `true`
   */
  icon?: IconProps['source'];
  /**
   * Callback function to be called when the chip is clicked.
   * Only applicable if `interactive` is `true`.
   */
  onClick?: (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void;
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

export const Chip: FC<ChipProps> = ({
  style,
  children,
  className,
  dimension = 'regular',
  color = 'primary',
  icon,
  interactive,
  dismissable,
  onDismissClick,
  onClick,
  ref: forwardedRef,
  ...otherProps
}) => {
  const commonProps: StackProps & Record<string, unknown> = useMemo(() => ({
    direction: 'row',
    columnGap: 8,
    inline: true,
    fill: false,
    'data-chip-dimension': dimension,
    className: clsx(styles.Chip, className),
    vAlign: 'center',
  }), [className, dimension]);

  const dynamicStyle = useMemo(() => ({
    '--background': `var(--highlight-${color}-background)`,
    '--foreground': `var(--highlight-${color}-foreground)`,
  }), [color]);

  const Content = useMemo(() => (
    <>
      {(icon && !dismissable) && (
        <Icon
          source={icon}
          dimension={sizes[dimension].icon}
          className={styles.Icon}
        />
      )}

      <Text
        weight="bold"
        lineHeight={dimension === 'small' ? 'extra-small' : undefined}
      >
        {children}
      </Text>
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
      {...commonProps}
      {...otherProps}
      as="button"
      ref={forwardedRef as Ref<HTMLButtonElement>}
      style={{ ...dynamicStyle, ...style }}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick?.(event)}
    >
      {Content}
    </Stack>
  ) : (
    <Stack
      as="span"
      ref={forwardedRef as Ref<HTMLSpanElement>}
      style={{ ...dynamicStyle, ...style }}
      {...commonProps}
      {...otherProps}
    >
      {Content}
    </Stack>
  );
};
