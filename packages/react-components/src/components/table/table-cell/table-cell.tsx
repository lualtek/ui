import type { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import type { PolyRefComponent } from '@/components';

import type { CustomColumnMeta } from '../types';
import styles from './table-cell.module.css';

type TableCellProps = CustomColumnMeta & {
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
  width?: number;
  /**
   * Set the min width of the cell.
   */
  minWidth?: number;
  /**
   * Callback function to be called when the cell is clicked.
   * Used only when `canSort` is `true`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const TableCell = forwardRef(
  (
    {
      as: Component = 'td',
      children,
      className,
      collapsed,
      align = 'start',
      style,
      padding = true,
      width,
      minWidth,
      onClick,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const dynamicStyle = useMemo(
      () => ({
        '--width': width ? `${width}px` : undefined,
        '--min-width': minWidth ? `${minWidth}px` : undefined,
        '--text-align': align,
      }),
      [align, width, minWidth],
    );

    return (
      <Component
        ref={forwardedRef}
        className={clsx(styles.TableCell, className)}
        data-table-cell-collapsed={collapsed}
        data-table-cell-padding={padding}
        data-table-cell-fixed={Boolean(width)}
        style={{
          ...dynamicStyle,
          ...style,
          userSelect: Component === 'td' ? undefined : 'none',
        }}
        {...otherProps}
      >
        {children}
      </Component>
    );
  },
) as PolyRefComponent<'td', TableCellProps>;
