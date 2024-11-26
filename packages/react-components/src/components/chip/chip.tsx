'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import {
  delay,
  domMax, LazyMotion, m,
} from 'motion/react';
import {
  forwardRef, Ref, useMemo,
  useState,
} from 'react';

import {
  Icon, IconProps, Stack, StackProps,
} from '@/components';
import { PropsClassChildren } from '@/components/types';

import styles from './chip.module.css';

type ForwardedElementType<T extends boolean> = T extends true ? HTMLButtonElement : HTMLSpanElement;

export type ChipProps = PropsClassChildren<{
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
   * Set the content of the chip to be collapsed and save space. Icon is not collpased
   * Effective only when `icon` is `defined`.
   */
  collapsed?: boolean;
}>

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

const expandVariants = {
  hidden: {
    opacity: 0,
    width: 0,
    x: -4,
    transition: {
      duration: 0,
      opacity: {
        ease: 'linear',
        duration: 0,
      },
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    width: 'auto',
    transition: {
      duration: 0.1,
    },
  },
};

export const Chip = forwardRef<ForwardedElementType<NonNullable<ChipProps['interactive']>>, ChipProps>(({
  style,
  children,
  className,
  dimension = 'regular',
  color = 'primary',
  icon,
  interactive,
  dismissable,
  collapsed,
  onDismissClick,
  ...otherProps
}, forwardedRef) => {
  const [isHovered, setIsHovered] = useState(false);
  const commonProps: StackProps & Record<string, unknown> = useMemo(() => ({
    direction: 'row',
    columnGap: (() => {
      if (collapsed && icon) {
        return isHovered ? 8 : undefined;
      }

      return 8;
    })(),
    inline: true,
    fill: false,
    'data-chip-dimension': dimension,
    className: clsx(styles.Chip, className),
    vAlign: 'center',
  }), [className, dimension, collapsed, icon, isHovered]);

  const dynamicStyle = useMemo(() => ({
    '--background': `var(--highlight-${color}-background)`,
    '--foreground': `var(--highlight-${color}-foreground)`,
  }), [color]);

  const renderContent = useMemo(() => (
    <>
      {(icon && !dismissable) && (
        <Icon
          source={icon}
          dimension={sizes[dimension].icon}
          className={styles.Icon}
        />
      )}

      {icon && collapsed ? (
        <m.b
          variants={expandVariants}
          initial="hidden"
          animate={isHovered ? 'visible' : undefined}
          className={styles.Label}
        >
          {children}
        </m.b>
      ) : (
        <b className={styles.Label}>
          {children}
        </b>
      )}

      {(!interactive && dismissable) && (
        <button onClick={onDismissClick} className={styles.Action} type="button">
          <Icon
            source="remove"
            dimension={sizes[dimension].icon}
          />
        </button>
      )}
    </>
  ), [children, dimension, dismissable, icon, collapsed, isHovered, interactive, onDismissClick]);

  return (
    <LazyMotion features={domMax}>
      {interactive ? (
        <Stack
          as={m.button}
          ref={forwardedRef as Ref<HTMLButtonElement>}
          style={{ ...dynamicStyle, ...style }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          {...commonProps}
          {...otherProps}
        >
          {renderContent}
        </Stack>
      ) : (
        <Stack
          as={m.span}
          ref={forwardedRef as Ref<HTMLSpanElement>}
          style={{ ...dynamicStyle, ...style }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          tabIndex={collapsed ? 0 : undefined}
          {...commonProps}
          {...otherProps}
        >
          {renderContent}
        </Stack>
      )}
    </LazyMotion>
  );
});

Chip.displayName = 'Chip';
