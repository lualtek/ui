import {
  Row,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { PropsWithClass } from '@/components/types';

import styles from './table-row.module.css';

type TableRowProps<T extends Record<string, unknown>> = PropsWithChildren<PropsWithClass<{
  expanded?: boolean;
  rowData?: Row<T>;
}>>

export const TableRow = <T extends Record<string, unknown>>({
  children,
  className,
  expanded,
  rowData,
  ...otherProps
}: TableRowProps<T>) => (
  <tr
    className={clsx(styles.TableRow, className)}
    data-table-row-expanded={expanded}
    {...otherProps}
  >
    {children}
  </tr>
  );
