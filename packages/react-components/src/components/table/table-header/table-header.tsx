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
  cloneElement, FC, isValidElement, ReactNode,
} from 'react';

import { Stack, Title } from '@/components';

import styles from './table-header.module.css';

export type TableHeaderProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set the title of the table.
   */
  heading?: ReactNode;
}

export const TableHeader: FC<TableHeaderProps> = ({
  children,
  heading,
  id,
  ref: forwardRef,
  ...otherProps
}) => (
  <Stack
    direction="row"
    columnGap={32}
    rowGap={8}
    vAlign="center"
    hAlign="space-between"
    wrap
    fill={false}
    ref={forwardRef}
    className={styles.TableHeader}
    {...otherProps}
  >
    <div>
      {typeof heading === 'string'
        ? <Title id={id} level="5">{heading}</Title>
        : isValidElement<HTMLElement>(heading) && cloneElement(
          heading,
          {
            id,
          },
        )}
    </div>

    <Stack direction="row" vAlign="center" columnGap={8} rowGap={8} fill={false} wrap inline>
      {children}
    </Stack>
  </Stack>
);
