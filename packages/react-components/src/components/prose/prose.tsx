import clsx from 'clsx';
import { forwardRef } from 'react';

import { PolyRefComponent } from '@/components';

import styles from './prose.module.css';

export type ProseProps = {
  /**
   * Set the gap between block elements inside the prose.
   *
   * @defaultValue "div"
   */
  gap?: 'small' | 'medium' | 'big';
  /**
   * Set the text wrapping to be balanced. Works only with block elements.
   *
   * @defaultValue false
   */
  balanced?: boolean;
};

export const Prose = forwardRef((
  {
    as: Component = 'div',
    children,
    className,
    gap = 'big',
    balanced = false,
    ...otherProps
  },
  forwardedRef,
) => (
  <Component
    ref={forwardedRef}
    className={clsx(styles.Prose, className)}
    data-prose-gap={gap}
    data-prose-balanced={balanced}
    {...otherProps}
  >
    {children}
  </Component>
)) as PolyRefComponent<'div', ProseProps>;

