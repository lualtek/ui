'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { Children, cloneElement, forwardRef, isValidElement, useMemo } from 'react';

import type { PolyRefComponent } from '@/components';

import { Li, type ListItemProps } from './list-item';
import styles from './list.module.css';

export type ListProps = {
  children: Array<React.ReactNode> | React.ReactNode;
  /**
   * Set the dimension of the items in the list.
   * This affects also the marker size.
   *
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set to show or hide the marker indicator beside each item in the list.
   *
   * @defaultValue false
   */
  hideMarker?: boolean;
  /**
   * Set the gap between each list item
   */
  gap?: TokensTypes['space'];
};

export const List = forwardRef(
  (
    { as: Component = 'ul', children, dimension = 'regular', className, hideMarker = false, gap, style, ...otherProps },
    forwardedRef,
  ) => {
    const isUnordered = useMemo(() => Component === 'ul', [Component]);

    const dynamicStyle = useMemo(
      () => ({
        '--gap': gap ? tkns.space[gap] : 0,
      }),
      [gap],
    );

    return (
      <Component
        ref={forwardedRef}
        className={clsx(styles.List, className)}
        data-list-size={dimension}
        data-list-ordered={!isUnordered}
        data-list-no-marker={hideMarker}
        style={{ ...dynamicStyle, ...style }}
        {...otherProps}
      >
        {Children.map(
          children,
          (child) =>
            isValidElement<ListItemProps>(child) &&
            cloneElement(child, {
              hideMarker: !isUnordered || hideMarker,
              dimension,
            }),
        )}
      </Component>
    );
  },
) as PolyRefComponent<'ul', ListProps> & {
  // biome-ignore lint/style/useNamingConvention: This is not a "prop" but a sub-component
  Li: typeof Li;
};

List.Li = Li;
