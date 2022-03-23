import clsx from 'clsx';
import {
  forwardRef, ReactNode, useCallback, useMemo,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Icon, IconProps, Polymorphic, Stack, Text, TextProps,
} from '@/components';

import styles from './icon-meter.module.css';

export type IconMeterProps = {
  /**
   * Set the value of the icon meter.
   * This value must be between `0` and `iconCount`.
   *
   * This data is used to calculate the number of filled icons
   * based on predefined thresholds of the fraction.
   *
   * @example
   * fraction < `0.25` = rounded to 0 (empty icon)
   * fraction >= `0.75` = rounded to 1 (filled icon)
   * fraction >= `0.25` and < 0.75 = rounded to 0.5 (half icon)
   */
  value: number;
  /**
   * Set the number of icons to use as maximum.
   */
  iconCount?: number;
  /**
   * Set a custom label instead of the current value.
   */
  label?: ReactNode;
  /**
   * Set the size of the icon meter.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Hide the label beside the icons
   */
  hideLabel?: boolean;
  /**
   * Set the icon to use as indicator
   */
  icon?: IconProps['source'];
  /**
   * Set the color to use as accent
   */
  iconColor?: string;
}

type PolymorphicIconMeter = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Stack>,
Polymorphic.OwnProps<typeof Stack> & IconMeterProps
>;

export const IconMeter = forwardRef(({
  className,
  value = 0,
  iconCount = 5,
  label,
  dimension = 'regular',
  hideLabel = false,
  icon = 'star',
  iconColor = 'var(--highlight-green-foreground)',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();

  const properties = {
    small: {
      labelSize: 14,
    },
    regular: {
      labelSize: 16,
    },
    big: {
      labelSize: 18,
    },
  };

  const clamp = useMemo(() => (num: number, min: number, max: number) => Math.min(Math.max(num, min), max), []);

  const roundValue = useCallback((value: number) => {
    const integer = parseInt(String(value), 10);
    const fraction = value - integer;

    if (fraction >= 0.75) {
      return Math.ceil(value);
    }

    if (fraction < 0.25) {
      return Math.floor(value);
    }

    if (fraction >= 0.25 && fraction < 0.75) {
      return integer + 0.5;
    }

    return 0;
  }, []);

  const iconType = useCallback((maxIcons: number, value: number) => {
    const roundedValue = roundValue(value);
    return new Array(maxIcons).fill(0).map((_, index) => {
      const iconIndex = index + 1;
      let fillType = 'var(--icon-dimmed-color)';

      if (roundedValue >= iconIndex) {
        fillType = iconColor;
      }

      if (roundedValue < iconIndex && roundedValue > iconIndex - 1) {
        fillType = 'url(#HalfIcon)';
      }

      return (
        <Icon
          source={icon}
          className={styles.Icon}
          dimension={12}
          fill={fillType}
          key={iconIndex}
        />
      );
    });
  }, [icon, iconColor, roundValue]);

  return (
    <Stack
      inline
      direction="row"
      vAlign="center"
      columnGap={8}
      className={clsx(styles.IconMeter, className)}
      role="meter"
      fill={false}
      aria-valuenow={clamp(value, 0, iconCount)}
      aria-valuemin={0}
      aria-valuemax={iconCount}
      aria-labelledby={seedID('icon-meter')}
      data-icon-meter-dimension={dimension}
      ref={forwardedRef}
      {...otherProps}
    >
      <svg aria-hidden="true" className={styles.Gradient} width="100" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="HalfIcon">
            <stop offset="0" style={{ stopColor: iconColor }} />
            <stop offset="50%" style={{ stopColor: iconColor }} />
            <stop offset="50.1%" style={{ stopColor: 'var(--icon-dimmed-color)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--icon-dimmed-color)' }} />
          </linearGradient>
        </defs>
      </svg>
      <Stack direction="row" columnGap={dimension === 'small' ? 2 : 4}>
        {iconType(iconCount, value)}
      </Stack>
      <Text
        as="span"
        dimmed={6}
        id={seedID('icon-meter')}
        size={properties[dimension].labelSize as TextProps['size']}
        lineHeight="none"
        weight="bold"
      >
        {!hideLabel && <>{label ?? value.toString()}</>}
      </Text>
    </Stack>
  );
}) as PolymorphicIconMeter;
