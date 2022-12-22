
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ReactNode, useId } from 'react';

import {
  PropsWithClass, ResponseContextProvider, Skeleton, Stack,
} from '@/components';

import styles from './table.module.css';
import { TableCell } from './table-cell';
import { TableRow } from './table-row';
import { CustomColumnMeta } from './types';

type TableProps<T> = PropsWithClass<{
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: T[];
  /**
   * Define the columns and headers of the table.
   */
  columns: Array<ColumnDef<T, any>>;
  /**
   * Add an alternate style to the table rows
   */
  stripes?: boolean;
  /**
   * Enable horizontal separators between the table rows
   */
  separators?: boolean;
  /**
   * Set the loading state of the table. This will sho skeleton loaders instead of the actual data.
   */
  loading?: boolean;
  /**
   * Custom component/empty state to show when the table has no data or
   * all columns have been toggled off.
   */
  emptyComponent?: ReactNode;
}>

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  className,
  stripes,
  separators,
  loading,
  emptyComponent,
  ...otherProps
}: TableProps<T>) => {
  const uid = useId();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ResponseContextProvider>
      <div
        className={clsx(styles.Table, className)}
      >
        {((data.length || loading) && table.getIsSomeColumnsVisible())
          ? (
            <div className={styles.TableWrapper}>
              <table
                className={styles.TableElement}
                data-table-stripes={stripes}
                data-table-separators={separators}
                aria-labelledby={`${uid}-table-title`}
                {...otherProps}
              >
                <thead role="rowgroup" className={styles.THead}>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableCell
                          key={header.id}
                          as="th"
                          width={header.column.columnDef.size}
                          isSorted={Boolean(header.column.getIsSorted())}
                          isSortedDesc={header.column.getIsSorted() === 'desc'}
                          collapsed={(header.column.columnDef.meta as CustomColumnMeta)?.collapsed}
                          align={(header.column.columnDef.meta as CustomColumnMeta)?.align}
                        >
                          {!header.isPlaceholder && flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </thead>
                <tbody role="rowgroup">
                  {loading
                    ? (
                      <TableRow>
                        <TableCell colSpan={100}>
                          <Skeleton gap={16} height={24} count={10} />
                        </TableCell>
                      </TableRow>
                    ) : table.getRowModel().rows.map(row => (
                      <TableRow key={row.id} rowData={row}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            collapsed={(cell.column.columnDef.meta as CustomColumnMeta)?.collapsed}
                            align={(cell.column.columnDef.meta as CustomColumnMeta)?.align}
                            width={cell.column.columnDef.size}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </tbody>
              </table>
            </div>
          )
          : (
            <Stack vAlign="center" hAlign="center">
              {emptyComponent ?? 'No data'}
            </Stack>
          )}
      </div>
    </ResponseContextProvider>
  );
};
