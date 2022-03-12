import clsx from 'clsx';
import { FC } from 'react';

import styles from './table-row.module.css';

type TableRowProps = PropsWithClass

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  ...otherProps
}) => (
  <tr
    className={clsx(styles.TableRow, className)}
    {...otherProps}
  >
    {children}
  </tr>
);
