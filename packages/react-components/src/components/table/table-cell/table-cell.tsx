import { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { useMemo } from 'react';

import { PolyRefComponent } from '@/components';

import { CustomColumnMeta } from '../types';
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
};

type TableCellComponent = PolyRefComponent<'td', TableCellProps>;

export const TableCell: TableCellComponent = ({
  as: Component = 'td',
  children,
  className,
  collapsed,
  align = 'start',
  style,
  padding = true,
  width,
  minWidth,
  ref: forwardedRef,
  ...otherProps
}) => {
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
};
