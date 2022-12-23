
import {
  ColumnDef,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowData,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'framer-motion';
import {
  CSSProperties,
  ReactNode, useId, useMemo, useState,
} from 'react';
import { useDebounce } from 'rooks';

import {
  PropsWithClass, ResponseContextProvider, Skeleton, Stack, Text,
} from '@/components';

import styles from './table.module.css';
import { TableCell } from './table-cell';
import { TableCheckbox } from './table-checkbox';
import { FilterControl, ToggleColumnsControl } from './table-controls';
import { TableHeader, TableHeaderProps } from './table-header';
import { TablePagination, TablePaginationProps } from './table-pagination';
import { TableRow } from './table-row';
import { CustomColumnMeta } from './types';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  interface ColumnMeta<TData extends RowData, TValue> extends CustomColumnMeta {}
}

type CommonProps<T> = PropsWithClass<{
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
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  showPagination?: boolean;
  /**
    * Set clusters of items to show in a single page. These values are used to
    * compute the select options for the page size select.
    */
  pageClusters?: TablePaginationProps['clusters'];
  /**
   * Set the label for the clusters select.
   * @note Use this propertu to translate the label of the select used to change visible items per page.
   */
  clustersLabel?: string;
  /**
   * Pass custom actions to the table header
   */
  actions?: ReactNode;
  /**
   * Add an accessible title to the table component
   */
  title?: TableHeaderProps['title'];
  /**
   * Hide the header which includes the title and controls.
   * This option is ignored and set to `true` if `selectableRows` is set to `true`.
   */
  showHeader?: boolean;
  /**
 * Enable the dropdown to choose the visibility of the column
 */
  enableToggleColumns?: boolean;
  /**
   * Set the label for the toggle columns control
   */
  toggleColumnsLabel?: string;
  /**
   * Enable row selection. This property will render an additiona column
   * at the start of the table, containing a checkbox.
   */
  selectableRows?: boolean;
  /**
   * Set the label for selected items in the table. Default to "Selected items"
   */
  renderSelectedLabel?: (count: number) => ReactNode;
  /**
   * Pass custom components to show when rows are selected.
   */
  renderSelectedActions?: (selectedRows: Array<Row<T>>) => ReactNode;
  /**
   * Set the table height after which the table will scroll.
   */
  height?: string;
  /**
   * Set the table background color. This must be set if `height` is set because
   * the color is used as background for sticky headers.
   */
  background?: string;
}>

type ConditionalProps<T> =
| {
  /**
   * Enable the global filter function
   */
  enableFilterControl: boolean;
  /**
   * Custom function used to filters table data.
   */
  filterFn: FilterFnOption<T>;
  /**
   * Set the label for the filter textfield control
   */
  filterControlLabel: string;
  /**
   * Set debounce time for filter search
   * @default 230
   */
  filterDebounce?: number;
} | {
  /**
   * Enable the global filter function
   */
  enableFilterControl?: never;
  /**
   * Custom function used to filters table data.
   */
  filterFn?: never;
  /**
   * Set the label for the filter textfield control
   */
  filterControlLabel?: never;
  /**
   * Set debounce time for filter search
   * @default 230
   */
  filterDebounce?: never;
}

export type TableProps<T> = CommonProps<T> & ConditionalProps<T>

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  className,
  stripes,
  separators = true,
  loading,
  emptyComponent,
  showPagination,
  pageClusters,
  clustersLabel,
  actions,
  title,
  showHeader = false,
  enableToggleColumns = false,
  toggleColumnsLabel,
  selectableRows,
  renderSelectedLabel = selectedRows => `Selected items: ${selectedRows}`,
  renderSelectedActions,
  height,
  background,
  enableFilterControl,
  filterFn,
  filterControlLabel = 'Search across data',
  filterDebounce = 230,
  style,
  ...otherProps
}: TableProps<T>) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const setDebouncedGlobalFilter = useDebounce(setGlobalFilter, filterDebounce);

  const finalColumns = useMemo(() => (selectableRows ? [
    {
      id: 'selection',
      enableHiding: false,
      header: ({ table }) => (
        !loading ? (
          <TableCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ) : null
      ),
      cell: ({ row }) => (
        <TableCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      meta: {
        collapsed: true,
      },
    },
    ...columns,
  ] : columns) as Array<ColumnDef<T>>, [columns, loading, selectableRows]);

  const uid = useId();
  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFn ?? 'auto',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const selectedRowsCount = useMemo(() => Object.keys(rowSelection).length, [rowSelection]);

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--table-height': height,
    '--table-background': background,
  }), [height, background]);

  return (
    <ResponseContextProvider>
      <div
        className={clsx(styles.Table, className)}
        style={{ ...dynamicStyle, ...style }}
      >
        <AnimatePresence>
          <LazyMotion features={domMax}>
            {selectableRows && selectedRowsCount > 0 && (
              <Stack
                as={m.div}
                className={styles.Toast}
                direction="row"
                hAlign="space-between"
                vAlign="center"
                hPadding={16}
                vPadding={8}
                fill={false}
                columnGap={16}
                initial={{ y: '-16px', opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 700,
                    damping: 30,
                  },
                }}
                exit={{ y: '-16px', opacity: 0 }}
              >
                <Text as="span" size={14} weight="bold">
                  {renderSelectedLabel(selectedRowsCount)}
                </Text>
                {renderSelectedActions?.(table.getSelectedRowModel().flatRows)}
              </Stack>
            )}

            {/* HEADER */}
            {(showHeader || selectableRows) && (
              <m.div
                animate={{
                  y: selectedRowsCount > 0 ? 20 : 0,
                  opacity: selectedRowsCount > 0 ? 0 : 1,
                  transition: {
                    type: 'spring',
                    stiffness: 700,
                    damping: 30,
                  },
                }}
              >
                <TableHeader title={title} id={`${uid}-table-title`}>
                  {actions}

                  {(enableFilterControl && data.length) ? (
                    <FilterControl
                      label={filterControlLabel}
                      onChange={event => setDebouncedGlobalFilter(event.target.value)}
                    />
                  ) : null}

                  {(enableToggleColumns && data.length)
                    ? (
                      <ToggleColumnsControl
                        columns={table.getAllLeafColumns()}
                        label={toggleColumnsLabel}
                      />
                    )
                    : null}
                </TableHeader>
              </m.div>
            )}
          </LazyMotion>
        </AnimatePresence>

        {/* TABLE */}
        {((data.length || loading) && table.getIsSomeColumnsVisible())
          ? (
            <div className={styles.TableWrapper} data-table-scrolling={Boolean(height)}>
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
                          canSort={header.column.getCanSort()}
                          sorting={header.column.getIsSorted()}
                          collapsed={header.column.columnDef.meta?.collapsed}
                          align={header.column.columnDef.meta?.align}
                          onClick={header.column.getToggleSortingHandler()}
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
                            collapsed={cell.column.columnDef.meta?.collapsed}
                            align={cell.column.columnDef.meta?.align}
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

        {/* PAGINATION */}
        {(showPagination && table.getIsSomeColumnsVisible() && table.getRowModel().rows.length > 0) && (
          <TablePagination
            clusters={pageClusters}
            itemsPerPage={table.getState().pagination.pageSize}
            totalItems={data.length}
            currentPage={table.getState().pagination.pageIndex}
            clustersLabel={clustersLabel}
            onPageSizeChange={pageSize => table.setPageSize(pageSize)}
            onPageClick={selected => table.setPageIndex(selected)}
          />
        )}
      </div>
    </ResponseContextProvider>
  );
};

export { createColumnHelper } from '@tanstack/react-table';
