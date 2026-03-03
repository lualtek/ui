import type { FC } from 'react';
import { useId, useMemo } from 'react';

import { Pagination, Select, Stack, Text } from '@/components';

export type TablePaginationProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set the options for the items per page select.
   *
   * @defaultValue `[5, 10, 20, 30, 50, 100]`
   */
  clusters?: number[];
  /**
   * Set the number of items per page.
   */
  itemsPerPage: number;
  /**
   * Set the total number of items.
   */
  totalItems: number;
  /**
   * Set the current rendered page.
   */
  currentPage: number;
  /**
   * Callback function to be called when the items per page select is changed.
   * @param {number} pageSize - The number of items per page.
   * @returns void
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Callback function to be called when the page is changed.
   * @param {number} page
   * @returns void
   */
  onPageClick?: (page: number) => void;
  /**
   * Set the label of the items per page select.
   *
   * @defaultValue `Items per page`
   */
  clustersLabel?: string;
};

export const TablePagination: FC<TablePaginationProps> = ({
  // oxlint-disable-next-line no-unused-vars
  children,
  itemsPerPage,
  onPageSizeChange,
  clusters = [5, 10, 20, 30, 50, 100],
  totalItems,
  currentPage,
  onPageClick,
  clustersLabel = 'Items per page',
  ...otherProps
}) => {
  const uid = useId();
  const computedItemsInPageStart = useMemo(
    () => currentPage && itemsPerPage && currentPage * itemsPerPage,
    [currentPage, itemsPerPage],
  );
  const computedItemsInPageEnd = useMemo(() => currentPage * itemsPerPage + itemsPerPage, [currentPage, itemsPerPage]);

  return (
    <Stack fill={false} direction="row" columnGap={16} vAlign="center" hAlign="end" vPadding={16} {...otherProps}>
      <Stack direction="row" columnGap={4}>
        <Select
          value={itemsPerPage}
          label={clustersLabel}
          id={`${uid}-table-i-per-page`}
          onChange={({ target }) => {
            onPageSizeChange?.(Number(target.value));
          }}
        >
          {clusters.map((cluster) => (
            <option key={cluster} value={cluster}>
              {cluster}
            </option>
          ))}
        </Select>
      </Stack>
      <Text aria-hidden="true" weight="bold" size={14}>
        {`${computedItemsInPageStart + 1}-${computedItemsInPageEnd > totalItems ? totalItems : computedItemsInPageEnd} of ${totalItems}`}
      </Text>
      <Pagination
        itemsCount={totalItems}
        itemsPerPage={itemsPerPage}
        onPageClick={({ selected }) => onPageClick?.(selected)}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage < 0 ? 0 : currentPage}
      />
    </Stack>
  );
};
