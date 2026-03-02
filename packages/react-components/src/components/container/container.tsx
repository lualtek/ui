import clsx from 'clsx';

import type { PolyRefComponent } from '@/components';

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
};

type ContainerComponent = PolyRefComponent<'div', ContainerProps>;

export const Container: ContainerComponent = ({
  as: Component = 'div',
  children,
  className,
  dimension = 'full',
  padding = true,
  ref: forwardedRef,
  ...otherProps
}) => (
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
