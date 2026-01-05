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

import { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import {
  BlankButton, Icon, PolyRefComponent,
} from '@/components';

import { CustomColumnMeta } from '../types';
import styles from './table-head-cell.module.css';

type TableHeadcellProps = CustomColumnMeta & {
  /**
   * Set the default sorting direction of the column.
   *
   * @defaultValue false
  */
  sorting?: false | SortDirection;
  /**
   * Enable sorting change on the column.
   */
  canSort?: boolean;
  /**
   * Add padding to the cell.
   *
   * @defaultValue true
   */
  padding?: boolean;
  /**
   * Set the width of the cell.
   */
  width?: string | number;
  /**
   * Callback function to be called when the cell is clicked.
   * Used only when `canSort` is `true`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type TableHeadcellComponent = PolyRefComponent<'th', TableHeadcellProps>;

export const TableHeadCell: TableHeadcellComponent = (
  {
    as: Component = 'th',
    children,
    className,
    collapsed,
    align = 'start',
    style,
    sorting = false,
    canSort,
    padding = true,
    width,
    onClick,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const computedWidth = useMemo(() => {
    if (!width) return undefined;

    return typeof width === 'string' ? width : `${width}px`;
  }, [width]);

  const dynamicStyle = useMemo(() => ({
    '--width': computedWidth,
    '--text-align': align,
  }), [align, computedWidth]);

  const content = useMemo(() => (
    <>
      {children}
      {Boolean(sorting) && (
        <Icon
          dimension={12}
          className={styles.Icon}
          fill="var(--highlight-red-foreground)"
          source={sorting === 'desc' ? 'bars-sort-down' : 'bars-sort-up'}
        />
      )}
    </>
  ), [children, sorting]);

  return (
    <Component
      ref={forwardedRef}
      className={clsx(styles.TableHeadcell, className)}
      data-table-cell-collapsed={collapsed}
      data-table-cell-padding={padding}
      data-table-cell-fixed={Boolean(width)}
      style={{
        ...dynamicStyle,
        ...style,
        userSelect: 'none',
      }}
      {...otherProps}
    >
      {canSort ? (
        <BlankButton
          className={styles.BlankButton}
          type="button"
          onClick={onClick}
        >
          {content}
        </BlankButton>
      ) : content}
    </Component>
  );
};

