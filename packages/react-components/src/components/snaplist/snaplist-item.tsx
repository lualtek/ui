import {
  Children, cloneElement, isValidElement, ReactElement,
} from 'react';
import { useInViewRef } from 'rooks';
import { FCChildren } from 'src/types/custom';

import styles from './snaplist.module.css';

type SnaplistItemProps = Record<string, unknown>

export const SnaplistItem: FCChildren<SnaplistItemProps> = ({
  className,
  children,
  ...otherProps
}) => {
  const [snapItemRef, isInView] = useInViewRef(() => null, { threshold: 0.5 });

  return (
    <div ref={snapItemRef} className={styles.Slide} {...otherProps}>
      {Children.map(
        children,
        child => isValidElement(child) && cloneElement(child as ReactElement, { 'data-snaplist-active': isInView }),
      )}
    </div>
  );
};
