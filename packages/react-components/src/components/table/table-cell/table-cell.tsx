import { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { CSSProperties, forwardRef, useMemo } from 'react';

import { Icon, Polymorphic } from '@/components';

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
  width?: string | number;
  /**
   * Callback function to be called when the cell is clicked.
   * Used only when `canSort` is `true`.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type PolymorphicCell = Polymorphic.ForwardRefComponent<'td', TableCellProps>;

export const TableCell = forwardRef(({
  children,
  className,
  collapsed,
  align = 'start',
  style,
  sorting = false,
  canSort,
  as: Wrapper = 'td',
  padding = true,
  width,
  onClick,
  ...otherProps
}, forwardedRef) => {
  const computedWidth = useMemo(() => {
    if (!width) return undefined;

    return typeof width === 'string' ? width : `${width}px`;
  }, [width]);

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--width': computedWidth,
    '--text-align': align,
  }), [align, computedWidth]);

  const content = useMemo(() => (
    <>
      {children}
      {Boolean(sorting) && (
        <Icon
          dimension={12}
          className={styles.HeadCellIcon}
          fill="var(--highlight-red-foreground)"
          source={sorting === 'desc' ? 'bars-sort-down' : 'bars-sort-up'}
        />
      )}
    </>
  ), [children, sorting]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.TableCell, className)}
      data-table-cell-collapsed={collapsed}
      data-table-cell-padding={padding}
      data-table-cell-fixed={Boolean(width)}
      style={{
        ...dynamicStyle,
        ...style,
        userSelect: Wrapper === 'td' ? undefined : 'none',
      }}
      {...otherProps}
    >
      {canSort ? (
        <button
          className={styles.BlankButton}
          type="button"
          onClick={onClick}
        >
          {content}
        </button>
      ) : content}
    </Wrapper>
  );
}) as PolymorphicCell;
