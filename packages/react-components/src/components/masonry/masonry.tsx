'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { type CSSProperties, Children, type FC, type ReactElement, cloneElement, isValidElement, useMemo } from 'react';
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
};

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
};

const breakpoints: Record<string, number> = {
  extraSmall: 480,
  small: 768,
  medium: 960,
  large: 1280,
  extraLarge: 1600,
  wide: 2100,
};

export const Masonry: FC<MasonryProps> = ({ className, children, columns = 3, gap, style, ...otherProps }) => {
  const dynamicStyle = useMemo(
    () => ({
      '--gap': gap ? tkns.space[gap as keyof typeof tkns.space] : 0,
    }),
    [gap],
  );

  const computedColumnsGiuste = useMemo(() => {
    if (typeof columns !== 'object') {
      return undefined;
    }

    return Object.keys(columns).reduce(
      (acc, current) => {
        if (current === 'default') {
          return acc;
        }

        const breakpoint = breakpoints[current as keyof Columns];
        const column = columns[current as keyof Columns];

        return Object.assign({}, acc, { [breakpoint]: column }, { default: columns.default });
      },
      {
        default: 0,
      },
    );
  }, [columns]);

  return (
    <MasonryLayout
      // biome-ignore lint/a11y/useSemanticElements: MasonryLayout is external lib
      role="list"
      className={clsx(styles.Masonry, className)}
      columnClassName={styles.Column}
      breakpointCols={typeof columns === 'number' ? columns : computedColumnsGiuste}
      style={{ ...dynamicStyle, ...style } as CSSProperties}
      {...otherProps}
    >
      {Children.map(
        children,
        (child) =>
          isValidElement(child) &&
          cloneElement(child as ReactElement, {
            role: 'listitem',
          }),
      )}
    </MasonryLayout>
  );
};
