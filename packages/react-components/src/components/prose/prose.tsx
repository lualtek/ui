import clsx from 'clsx';
import { forwardRef } from 'react';

import { PolymorphicPropsRef, PropsClassChildren } from '@/components';

import styles from './prose.module.css';

export type ProseProps = {
  gap?: 'small' | 'medium' | 'big';
};

type PolymorphicProse<T extends React.ElementType = 'div'> = PolymorphicPropsRef<T, PropsClassChildren<ProseProps>>;

type ProseComponent = <T extends React.ElementType = 'div'>(
  props: PolymorphicProse<T>
) => JSX.Element | React.ReactNode | null

export const Prose: ProseComponent = forwardRef(
  <T extends React.ElementType = 'div'>(
    {
      as,
      children,
      className,
      gap = 'big',
      ...otherProps
    }: PolymorphicProse<T>,
    forwardedRef?: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'div';
    return (
      <Component
        ref={forwardedRef}
        className={clsx(styles.Prose, className)}
        data-prose-gap={gap}
        {...otherProps}
      >
        {children}
      </Component>
    );
  },
);

