import clsx from 'clsx';
import { forwardRef } from 'react';

import { PolyRefComponent, PropsClassChildren } from '@/components';

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

export const Container = forwardRef(
  (
    {
      as: Component = 'div',
      children,
      className,
      dimension = 'full',
      padding = true,
      ...otherProps
    },
    forwardedRef,
  ) => (
    <Component
      ref={forwardedRef}
      className={clsx(styles.Container, className)}
      data-container-dimension={dimension}
      data-container-padding={padding}
      {...otherProps}
    >
      {children}
    </Component>
  ),
) as PolyRefComponent<'div', PropsClassChildren<ContainerProps>>;
