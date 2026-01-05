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

import {
  Row,
} from '@tanstack/react-table';
import clsx from 'clsx';

import styles from './table-row.module.css';

type TableRowProps<T extends Record<string, unknown>> = React.ComponentPropsWithRef<'tr'> & {
  /**
   * The row data.
   */
  rowData?: Row<T>;
}

export const TableRow = <T extends Record<string, unknown>>({
  children,
  className,
  rowData,
  ...otherProps
}: TableRowProps<T>) => (
  <tr
    className={clsx(styles.TableRow, className)}
    {...otherProps}
  >
    {children}
  </tr>
);
