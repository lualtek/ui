import clsx from 'clsx';
import { forwardRef } from 'react';

import type { PolyRefComponent } from '@/components';

import styles from './prose.module.css';

export type ProseProps = {
  gap?: 'small' | 'medium' | 'big';
};

export const Prose = forwardRef(
  ({ as: Component = 'div', children, className, gap = 'big', ...otherProps }, forwardedRef) => (
    <Component ref={forwardedRef} className={clsx(styles.Prose, className)} data-prose-gap={gap} {...otherProps}>
      {children}
    </Component>
  ),
) as PolyRefComponent<'div', ProseProps>;
