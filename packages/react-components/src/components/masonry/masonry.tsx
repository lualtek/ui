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
  Children, cloneElement, CSSProperties,
  FC, isValidElement, ReactElement, useMemo,
} from 'react';
import MasonryLayout from 'react-masonry-css';

import styles from './masonry.module.css';

type Columns = {
  default: number;
  extraSmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  extraLarge?: number;
  wide?: number;
}

export type MasonryProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * Set the space between items. This is applied on both vertical
   * and horizontal axis.
   */
  gap?: TokensTypes['space'];
  /**
   * Set the breakpoints for the masonry layout. You can pass a fixed number
   * or an object map.
   *
   * The object map is used to change the number of the columns based on
   * the specified breakpoint. When passing an object, you must specify the
   * default key, other breakpoints are optional.
   *
   * @example Different number of columns based on the breakpoint
   * ```js
   * {
   *    default: 7,
   *    wide: 6,
   *    extraLarge: 5,
   *    large: 4,
   *    medium: 3,
   *    small: 2,
   *    extraSmall: 1
   * }
   * ```
   * @defaultValue 3
   */
  columns?: number | Columns;
}

const breakpoints: Record<string, number> = {
  extraSmall: 480,
  small: 768,
  medium: 960,
  large: 1280,
  extraLarge: 1600,
  wide: 2100,
};

export const Masonry: FC<MasonryProps> = ({
  className,
  children,
  columns = 3,
  gap,
  style,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(() => (
    {
      '--gap': gap ? tkns.space[gap as keyof typeof tkns.space] : 0,
    }
  ), [gap]);

  const computedColumnsGiuste = useMemo(() => (typeof columns === 'object' ? Object.keys(columns).reduce(
    (acc, current) => {
      if (current === 'default') {
        return acc;
      }

      const breakpoint = breakpoints[current as keyof Columns];
      const column = columns[current as keyof Columns];

      return ({
        ...acc,
        [breakpoint]: column,

        default: columns.default,
      });
    }, {
      default: 0,
    },
  ) : undefined), [columns]);

  return (
    <MasonryLayout
      role="list"
      className={clsx(styles.Masonry, className)}
      columnClassName={styles.Column}
      breakpointCols={typeof columns === 'number' ? columns : computedColumnsGiuste}
      style={{ ...dynamicStyle, ...style } as CSSProperties}
      {...otherProps}
    >
      {Children.map(children, (child) => {
        if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
          return cloneElement(
            child,
            {
              role: 'listitem',
            },
          );
        }

        return undefined;
      })}
    </MasonryLayout>
  );
};
