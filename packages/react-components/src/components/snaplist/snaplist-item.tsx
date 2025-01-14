import {
  Children, cloneElement, isValidElement, ReactElement,
  useRef,
} from 'react';
import { useIntersection } from 'react-use';
import { FCChildren } from 'src/types/custom';

import styles from './snaplist.module.css';

type SnaplistItemProps = Record<string, unknown>

export const SnaplistItem: FCChildren<SnaplistItemProps> = ({
  className,
  children,
  ...otherProps
}) => {
  const snapItemRef = useRef<HTMLDivElement>(null);
  // const [snapItemRef, isInView] = useInViewRef(() => null, { threshold: 0.5 });
  const intersection = useIntersection(snapItemRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  return (
    <div ref={snapItemRef} className={styles.Slide} {...otherProps}>
      {Children.map(
        children,
        child => isValidElement(child as React.ReactNode) && cloneElement(child as ReactElement, {
          'data-snaplist-active': intersection?.isIntersecting,
        }),
      )}
    </div>
  );
};
