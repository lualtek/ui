import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components';

import styles from './prose.module.css';

type PolymorphicProse = Polymorphic.ForwardRefComponent<'div', {
  gap?: 'small' | 'medium' | 'big';
}>;

export const Prose = forwardRef(({
  children,
  className,
  gap = 'big',
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Prose, className)}
    data-prose-gap={gap}
    {...otherProps}
  >
    {children}
  </Wrapper>
)) as PolymorphicProse;

Prose.displayName = 'Prose';
