import { FCChildrenClass } from '@lualtek/react-components';
import clsx from 'clsx';

import styles from './test.module.css';

export type TestProps = Record<string, unknown>

export const Test: FCChildrenClass = ({
  className,
  ...otherProps
}) => (
  <div className={clsx(styles.Test, className)} {...otherProps}>
    CONTENT
  </div>
);

Test.displayName = 'Test';
