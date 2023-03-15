import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { Icon } from '@/components';
import { FCChildrenClass } from '@/components/types';

import styles from './pagination.module.css';

export type PaginationProps = ReactPaginateProps & {
  /**
   * Set the total number of items to paginate through.
   */
  itemsCount: number;
  /**
   * Set the number of items to display per page.
   */
  itemsPerPage?: number;
  /**
   * Callback function to be called when the page is changed. A an `object`
   * is passed with the following properties:
   * - `selected`: The index of the selected page.
   * - `offset`: The offset of the selected page.
   */
  onPageClick?: (data: Record<string, number>) => void;
}

export const Pagination: FCChildrenClass<PaginationProps> = ({
  className,
  itemsCount,
  itemsPerPage = 10,
  onPageClick,
  pageCount,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
  ...otherProps
}) => {
  const [computedPageCount, setComputedPageCount] = useState(0);

  useEffect(() => {
    if (itemsCount) {
      setComputedPageCount(Math.ceil(itemsCount / itemsPerPage));
    }
  }, [itemsCount, itemsPerPage]);

  const handlePageClick = (event: Record<string, any>) => {
    const newOffset = (event.selected * itemsPerPage) % itemsCount;
    if (onPageClick) {
      onPageClick({ ...event, offset: newOffset });
    }
  };

  return (
    <ReactPaginate
      containerClassName={clsx(styles.Pagination, className)}
      breakLabel="..."
      nextLabel={<Icon dimension={16} source="ctrl-right" />}
      previousLabel={<Icon dimension={16} source="ctrl-left" />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={Number(pageCount) || computedPageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      {...otherProps}
    />
  );
};
