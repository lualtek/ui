'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  forwardRef, ReactNode, useMemo,
} from 'react';

import styles from './grid.module.css';
import { GridItem } from './item/grid-item';

export type GridProps = React.ComponentPropsWithRef<'ul'> & {
  /**
   * The children to be rendered in the grid.
   * Even though this component doesn't block you to use any elements as children,
   * it's recommended to use only `<Grid.Item>` component to generate the grid items.
   */
  children: ReactNode;
  /**
   * Specify how many columns the grid should have.
   */
  columns?: number;
  /**
   * Specify how many rows the grid should have.
   */
  rows?: number;
  /**
   * Add a gap between rows.
   */
  rowGap?: TokensTypes['space'];
  /**
   * Add a gap between columns.
   */
  columnGap?: TokensTypes['space'];
  /**
   * Set the columns repeating behaviour.
   * This refers to the CSS function `repeat()`, which can use both `auto-fit`
   * and `auto-fill` parameters.
   *
   * @see [repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
   * @defaultValue "fill"
   */
  filling?: 'fit' | 'fill' | false;
  /**
   * Set the minimum columns width
   *
   * @defaultValue "10rem"
   */
  colMinWidth?: string;
  /**
   * Set the minimum rows height
   *
   * @defaultValue "1fr"
   */
  rowMinHeight?: string;
  /**
   * Set the horizontal padding (left/right)
   */
  hPadding?: TokensTypes['space'];
  /**
   * Set the vertical padding (top/bottom)
   */
  vPadding?: TokensTypes['space'];
}

type GridComponent = React.ForwardRefExoticComponent<GridProps> & {
  Item: typeof GridItem;
}

export const Grid = forwardRef<HTMLUListElement, GridProps>(({
  className,
  children,
  columns,
  rows,
  rowGap,
  columnGap,
  style,
  filling = 'fill',
  colMinWidth = '10rem',
  rowMinHeight = '1fr',
  hPadding,
  vPadding,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle = useMemo(() => (
    {
      '--row-gap': rowGap ? tkns.space[rowGap] : 0,
      '--column-gap': columnGap ? tkns.space[columnGap] : 0,
      '--columns': columns,
      '--column-min-w': colMinWidth,
      '--rows': rows,
      '--row-min-h': rowMinHeight,
      '--v-padding': vPadding ? tkns.space[vPadding] : 0,
      '--h-padding': hPadding ? tkns.space[hPadding] : 0,
    }
  ), [colMinWidth, columnGap, columns, hPadding, rowGap, rowMinHeight, rows, vPadding]);

  return (
    <ul
      className={clsx(styles.Grid, className)}
      style={{ ...dynamicStyle, ...style }}
      data-grid-filling-type={filling}
      data-stack-has-padding={Boolean(hPadding ?? vPadding)}
      ref={forwardedRef}
      {...otherProps}
    >
      {children}
    </ul>
  );
}) as GridComponent;

Grid.Item = GridItem;
