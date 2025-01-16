import { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { PolymorphicPropsRef } from '@/components';

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
  /**
   * Callback function to be called when the cell is clicked.
   * Used only when `canSort` is `true`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type PolymorphicCell<T extends React.ElementType = 'td'> = PolymorphicPropsRef<T, TableCellProps>;

type CellComponent = <T extends React.ElementType = 'td'>(
  props: PolymorphicCell<T>
) => JSX.Element | React.ReactNode | null

export const TableCell: CellComponent = forwardRef(
  <T extends React.ElementType = 'td'>(
    {
      as,
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
    }: PolymorphicCell<T>,
    forwardedRef?: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'td';
    const dynamicStyle = useMemo(() => ({
      '--width': width ? `${width}px` : undefined,
      '--min-width': minWidth ? `${minWidth}px` : undefined,
      '--text-align': align,
    }), [align, width, minWidth]);

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
);
