/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { FC, useMemo } from 'react';

import {
  Icon, IconProps, Stack,
} from '@/components';

import styles from './icon-chip.module.css';

export type IconChipProps = React.ComponentPropsWithRef<'span'> & {
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

export const IconChip: FC<IconChipProps> = ({
  style,
  className,
  dimension = 'regular',
  color = 'primary',
  icon,
  ref: forwardedRef,
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
      ref={forwardedRef}
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
