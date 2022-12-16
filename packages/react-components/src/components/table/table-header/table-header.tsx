import {
  cloneElement, HTMLAttributes, isValidElement, ReactNode,
} from 'react';
import { Except } from 'type-fest';

import { FCChildrenClass, Stack, Title } from '@/components';

import styles from './table-header.module.css';

export type TableHeaderProps = Except<HTMLAttributes<HTMLElement>, 'title'> & {
  title?: ReactNode;
}

export const TableHeader: FCChildrenClass<TableHeaderProps> = ({
  children,
  title,
  id,
  ...otherProps
}) => (
  <Stack
    direction="row"
    columnGap={32}
    vAlign="center"
    hAlign="space-between"
    fill={false}
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

    <Stack direction="row" vAlign="center" columnGap={24} inline>
      {children}
    </Stack>
  </Stack>
);
