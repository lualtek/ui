import type { FC, ReactElement } from 'react';
import { Children, cloneElement, isValidElement, useRef } from 'react';
import { useIntersection } from 'react-use';

import styles from './snaplist.module.css';

type SnaplistItemProps = React.ComponentPropsWithRef<'div'>;

export const SnaplistItem: FC<SnaplistItemProps> = ({ children, ref: forwardedRef, ...otherProps }) => {
  const snapItemRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(snapItemRef as React.RefObject<HTMLElement>, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  return (
    <div ref={forwardedRef} className={styles.Slide} {...otherProps}>
      {Children.map(
        children,
        (child) =>
          isValidElement(child as React.ReactNode) &&
          cloneElement(child as ReactElement<any>, {
            'data-snaplist-active': intersection?.isIntersecting,
          }),
      )}
    </div>
  );
};
