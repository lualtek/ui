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
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  Children, cloneElement, isValidElement, useMemo,
} from 'react';

import { PolyRefComponent } from '@/components';

import styles from './list.module.css';
import { Li, ListItemProps } from './list-item';

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
}

type ListComponent = PolyRefComponent<'ul', ListProps> & {
  /**
   * List item component.
   */
  Li: typeof Li;
}

export const List: ListComponent = (
  {
    as: Component = 'ul',
    children,
    dimension = 'regular',
    className,
    hideMarker = false,
    gap,
    style,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const isUnordered = useMemo(() => Component === 'ul', [Component]);

  const dynamicStyle = useMemo(() => (
    {
      '--gap': gap ? tkns.space[gap] : 0,
    }
  ), [gap]);

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
      {Children.map(children, child => isValidElement<ListItemProps>(child) && cloneElement(
        child,
        {
          hideMarker: !isUnordered || hideMarker,
          dimension,
        },
      ))}
    </Component>
  );
};

List.Li = Li;
