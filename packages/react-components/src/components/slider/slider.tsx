import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  ElementRef, forwardRef, useId,
} from 'react';

import { Elevator } from '@/components';

import * as styles from './slider.module.css';

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
  const uid = useId();

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

      {val?.map(v => (
        <Elevator resting={1} key={`${uid}-${v}`}>
          <SliderPrimitive.Thumb className={styles.Thumb} />
        </Elevator>
      ))}
    </SliderPrimitive.Root>
  );
});
