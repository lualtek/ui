import { FC, useId, useMemo } from 'react';

import {
  Pagination, Select, Stack, Text,
} from '@/components';
import { PropsWithClass } from '@/components/types';

export type TablePaginationProps = PropsWithClass & {
  clusters?: number[];
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageClick?: (page: number) => void;
  isManual?: boolean;
  clustersLabel?: string;
}

export const TablePagination: FC<TablePaginationProps> = ({
  children,
  itemsPerPage,
  onPageSizeChange,
  clusters = [5, 10, 20, 30, 50, 100],
  totalItems,
  currentPage,
  isManual,
  onPageClick,
  clustersLabel = 'Items per page',
  ...otherProps
}) => {
  const uid = useId();
  const computedItemsInPageStart = useMemo(
    () => (currentPage && itemsPerPage) && currentPage * itemsPerPage,
    [currentPage, itemsPerPage],
  );
  const computedItemsInPageEnd = useMemo(() => currentPage * itemsPerPage + itemsPerPage, [currentPage, itemsPerPage]);

  return (
    <Stack
      fill={false}
      direction="row"
      columnGap={16}
      vAlign="center"
      hAlign="end"
      vPadding={16}
      {...otherProps}
    >
      <Stack direction="row" columnGap={4}>
        <Select
          value={itemsPerPage}
          label={clustersLabel}
          id={`${uid}-table-i-per-page`}
          onChange={({ target }) => {
            onPageSizeChange?.(Number(target.value));
          }}
        >
          {clusters.map(cluster => (
            <option key={cluster} value={cluster}>{cluster}</option>
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
