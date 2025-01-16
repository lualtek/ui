import clsx from 'clsx';
import { forwardRef } from 'react';

import { PolymorphicPropsRef, PropsClassChildren } from '@/components';

import styles from './container.module.css';

export type ContainerProps = {
  /**
   * Set the horizontal max-width of the container.
   * @defaultValue "full"
   */
  dimension?: 'full' | 'small' | 'medium' | 'large' | 'extra-large';
  /**
   * Set or remove the container's predefined horizontal padding.
   * @defaultValue true
   */
  padding?: boolean;
}

type PolymorphicContainer<T extends React.ElementType = 'div'> = PolymorphicPropsRef<
  T,
  PropsClassChildren<ContainerProps>
>;

type ContainerComponent = <T extends React.ElementType = 'div'>(
  props: PolymorphicContainer<T>
) => JSX.Element | React.ReactNode | null

export const Container: ContainerComponent = forwardRef(
  <T extends React.ElementType = 'div'>(
    {
      as,
      children,
      className,
      dimension = 'full',
      padding = true,
      ...otherProps
    }: PolymorphicContainer<T>,
    forwardedRef?: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'div';

    return (
      <Component
        ref={forwardedRef}
        className={clsx(styles.Container, className)}
        data-container-dimension={dimension}
        data-container-padding={padding}
        {...otherProps}
      >
        {children}
      </Component>
    );
  },
);
