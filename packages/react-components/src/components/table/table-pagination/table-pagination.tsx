import { FC, useId, useMemo } from 'react';

import {
  Pagination, Select, Stack, Text,
} from '@/components';

export type TablePaginationProps = PropsWithClass & {
  clusters?: number[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageClick?: (page: number) => void;
  isManual?: boolean;
}

export const TablePagination: FC<TablePaginationProps> = ({
  children,
  pageSize,
  onPageSizeChange,
  clusters = [5, 10, 20, 30, 50, 100],
  totalItems,
  currentPage,
  isManual,
  totalPages,
  onPageClick,
  ...otherProps
}) => {
  const uid = useId();
  const computedPageCount = useMemo(() => (
    isManual ? Math.ceil(totalItems / pageSize) : totalPages
  ), [isManual, pageSize, totalItems, totalPages]);
  const computedItemsInPageStart = useMemo(
    () => (currentPage && pageSize) && currentPage * pageSize,
    [currentPage, pageSize],
  );
  const computedItemsInPageEnd = useMemo(() => currentPage * pageSize + pageSize, [currentPage, pageSize]);

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
          value={pageSize}
          label="Items per page"
          id={`${uid}-table-i-per-page`}
          onChange={({ currentTarget }) => {
            onPageSizeChange?.(Number(currentTarget.value));
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
        itemsPerPage={pageSize}
        pageCount={computedPageCount}
        onPageClick={({ selected }) => onPageClick?.(selected)}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
    </Stack>
  );
};
