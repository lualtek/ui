import {
  cloneElement, forwardRef, isValidElement, ReactNode,
} from 'react';
import { Except } from 'type-fest';

import { Stack, Title } from '@/components';

import styles from './table-header.module.css';

export type TableHeaderProps = Except<React.ComponentPropsWithRef<'div'>, 'title'> & {
  /**
   * Set the title of the table.
   */
  title?: ReactNode;
}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(({
  children,
  title,
  id,
  ...otherProps
},
forwardRef) => (
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
      {typeof title === 'string'
        ? <Title id={id} level="5">{title}</Title>
        : isValidElement<HTMLElement>(title) && cloneElement(
          title,
          {
            id,
          },
        )}
    </div>

    <Stack direction="row" vAlign="center" columnGap={8} rowGap={8} fill={false} wrap inline>
      {children}
    </Stack>
  </Stack>
));
