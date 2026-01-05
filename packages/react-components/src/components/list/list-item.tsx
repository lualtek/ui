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

import clsx from 'clsx';
import { FC } from 'react';

import {
  Icon, IconProps, Stack,
} from '@/components';

import { ListProps } from './list';
import styles from './list.module.css';

export type ListItemProps = Pick<ListProps, 'dimension' | 'hideMarker'> & React.ComponentPropsWithRef<'li'> & {
  /**
   * Set the marker style. You can use any icon from the iconography as marker
   * by passing its name.
   *
   * @defaultValue "circle"
   */
  marker?: IconProps['source'];
  /**
   * Set the color of the marker.
   */
  markerColor?: string;
}

type SizesType = Record<NonNullable<ListProps['dimension']>, {
  icon: {
    size: IconProps['dimension'];
  };
}>

const sizes: SizesType = {
  small: {
    icon: {
      size: 16,
    },
  },
  regular: {
    icon: {
      size: 16,
    },
  },
  big: {
    icon: {
      size: 24,
    },
  },
};

export const Li: FC<ListItemProps> = ({
  className,
  hideMarker,
  marker = 'circle',
  markerColor,
  children,
  dimension = 'regular',
  ref: forwardedRef,
  ...otherProps
}) => (
  <Stack
    className={clsx(styles.ListItem, className)}
    as="li"
    value="00"
    direction="row"
    hAlign="start"
    vAlign="start"
    fill={false}
    ref={forwardedRef}
    {...otherProps}
  >
    {hideMarker ? null : (
      <Icon
        source={marker}
        className={styles.Marker}
        fill={markerColor}
        data-list-default-marker={marker === 'circle'}
        dimension={marker === 'circle' ? 12 : sizes[dimension].icon.size}
      />
    )}
    {children}
  </Stack>
);

