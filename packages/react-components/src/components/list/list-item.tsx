import clsx from 'clsx';
import { forwardRef } from 'react';

import {
  Icon, IconProps, Stack,
} from '@/components';
import { PropsClassChildren } from '@/components/types';

import { ListProps } from './list';
import styles from './list.module.css';

export type ListItemProps = PropsClassChildren<Pick<ListProps, 'dimension' | 'hideMarker'> & {
  /**
   * Set the marker style. You can use any icon from the iconography as marker
   * by passing its name.
   */
  marker?: IconProps['source'];
  /**
   * Set the color of the marker.
   */
  markerColor?: string;
}>

const sizes = {
  small: {
    icon: {
      size: 16,
      weight: 'solid',
    },
  },
  regular: {
    icon: {
      size: 16,
      weight: 'duotone',
    },
  },
  big: {
    icon: {
      size: 24,
      weight: 'duotone',
    },
  },
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
  className,
  hideMarker,
  marker = 'circle',
  markerColor,
  children,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => (
  <Stack
    className={clsx(styles.ListItem, className)}
    as="li"
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
        dimension={marker === 'circle' ? 12 : sizes[dimension].icon.size as IconProps['dimension']}
      />
    )}
    {children}
  </Stack>
));

ListItem.displayName = 'List.Li';
