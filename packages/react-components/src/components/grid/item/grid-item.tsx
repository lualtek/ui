import clsx from 'clsx';
import type { FC } from 'react';
import { useMemo } from 'react';

import styles from './grid-item.module.css';

export type GridItemProps = React.ComponentPropsWithRef<'li'> & {
  /**
   * Make the item span the entire row.
   *
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * Set the explicit offsets (start/end) of the item across the grid columns.
   * This props refers to the CSS `grid-column` property.
   *
   * @see [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
   */
  column?: string;
  /**
   * Set the explicit offsets (start/end) of the item across the grid rows.
   * This props refers to the CSS `grid-row` property.
   *
   * @see [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
   */
  row?: string;
};

export const GridItem: FC<GridItemProps> = ({
  style,
  children,
  className,
  fullWidth = false,
  column,
  row,
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--column': column,
      '--row': row,
    }),
    [column, row],
  );

  return (
    <li
      ref={forwardedRef}
      className={clsx(styles.GridItem, className)}
      style={{ ...dynamicStyle, ...style }}
      data-grid-item-fullwidth={fullWidth}
      {...otherProps}
    >
      {children}
    </li>
  );
};
