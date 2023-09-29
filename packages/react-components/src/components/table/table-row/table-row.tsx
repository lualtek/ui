import {
  Row,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { PropsWithClass } from '@/components/types';

import styles from './table-row.module.css';

type TableRowProps<T extends Record<string, unknown>> = PropsWithChildren<PropsWithClass<{
  /**
   * The row data.
   */
  rowData?: Row<T>;
}>>

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
