'use client';

import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import { Children, cloneElement, isValidElement, useMemo } from 'react';

import type { PolyRefComponent } from '@/components';
import styles from './list.module.css';
import type { ListItemProps } from './list-item';
import { Li } from './list-item';

export type ListProps = {
  children: React.ReactNode[] | React.ReactNode;
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

type ListComponent = PolyRefComponent<'ul', ListProps> & {
  /**
   * List item component.
   */
  // biome-ignore lint/style/useNamingConvention: Subcomponent
  Li: typeof Li;
};

export const List: ListComponent = ({
  as: Component = 'ul',
  children,
  dimension = 'regular',
  className,
  hideMarker = false,
  gap,
  style,
  ref: forwardedRef,
  ...otherProps
}) => {
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
};

List.Li = Li;
