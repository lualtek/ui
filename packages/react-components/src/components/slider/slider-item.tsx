import {
  Children, cloneElement, isValidElement, ReactElement,
} from 'react';
import { useInViewRef } from 'rooks';
import { FCChildren } from 'src/types/custom';

import styles from './slider.module.css';

type SliderItemProps = Record<string, unknown>

export const SliderItem: FCChildren<SliderItemProps> = ({
  className,
  children,
  ...otherProps
}) => {
  const [myRef, isInView] = useInViewRef(() => null, { threshold: 0.5 });

  return (
    <div ref={myRef} className={styles.Slide} {...otherProps}>
      {Children.map(
        children,
        child => isValidElement(child) && cloneElement(child as ReactElement, { 'data-slider-active': isInView }),
      )}
    </div>
  );
};
