'use client';

import { TokensTypes } from '@lualtek/tokens';
import clsx from 'clsx';
import { useMemo } from 'react';

import {
  Icon, IconProps, Stack,
} from '@/components';
import { FCClass } from '@/components/types';

import styles from './icon-chip.module.css';

export type IconChipProps = {
  /**
   * Set the dimension of the component.
   *
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   *
   * @defaultValue "primary"
   */
  color?: TokensTypes['colors'];
  /**
   * Set the icon to show
   */
  icon: IconProps['source'];
}

type Sizes = Record<string, {
  icon: IconProps['dimension'];
}>

const sizes: Sizes = {
  small: {
    icon: 12,
  },
  regular: {
    icon: 18,
  },
  big: {
    icon: 24,
  },
};

export const IconChip: FCClass<IconChipProps> = ({
  style,
  className,
  dimension = 'regular',
  color = 'primary',
  icon,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(() => ({
    '--background': `var(--highlight-${color}-background)`,
    '--foreground': `var(--highlight-${color}-foreground)`,
  }), [color]);

  return (
    <Stack
      as="span"
      direction="row"
      inline
      fill={false}
      data-icon-chip-dimension={dimension}
      className={clsx(styles.IconChip, className)}
      vAlign="center"
      hAlign="center"
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <Icon
        source={icon}
        className={styles.Icon}
        dimension={sizes[dimension].icon}
      />
    </Stack>
  );
};

IconChip.displayName = 'IconChip';
