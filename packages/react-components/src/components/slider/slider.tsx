import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  ElementRef, forwardRef,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Elevator } from '@/components';

import styles from './slider.module.css';

export type SliderProps = SliderPrimitive.SliderProps & {
  /**
   * Show values beside the thumbs
   */
  showValues?: boolean;
};
export const Slider = forwardRef<
ElementRef<typeof SliderPrimitive.Root>,
SliderProps
>(({
  className,
  value,
  defaultValue,
  orientation = 'horizontal',
  showValues,
  max = 100,
  ...otherProps
}, forwardedRef) => {
  const val = value ?? defaultValue;
  const seedID = useUIDSeed();

  return (
    <SliderPrimitive.Root
      className={clsx(styles.Slider, className)}
      orientation={orientation}
      data-slider-show-values={showValues}
      minStepsBetweenThumbs={1}
      ref={forwardedRef}
      defaultValue={defaultValue}
      value={value}
      max={max}
      {...otherProps}
    >
      <SliderPrimitive.Track className={styles.Track}>
        <SliderPrimitive.Range className={styles.Range} />
      </SliderPrimitive.Track>

      {val?.map((_, i) => (
        <Elevator resting={1} key={seedID(i)}>
          <SliderPrimitive.Thumb className={styles.Thumb} />
        </Elevator>
      ))}
    </SliderPrimitive.Root>
  );
});
