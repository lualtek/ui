import {
  Children, cloneElement, forwardRef,
  isValidElement, ReactElement,
  useRef,
} from 'react';
import { useIntersection } from 'react-use';

import styles from './snaplist.module.css';

type SnaplistItemProps = React.ComponentPropsWithRef<'div'>;

export const SnaplistItem = forwardRef<HTMLDivElement, SnaplistItemProps>(({
  className,
  children,
  ...otherProps
},
forwardedRef) => {
  const snapItemRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(snapItemRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  return (
    <div ref={forwardedRef} className={styles.Slide} {...otherProps}>
      {Children.map(
        children,
        child => isValidElement(child as React.ReactNode) && cloneElement(child as ReactElement, {
          'data-snaplist-active': intersection?.isIntersecting,
        }),
      )}
    </div>
  );
});
