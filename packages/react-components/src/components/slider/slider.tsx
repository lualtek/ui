import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  ElementRef, forwardRef, useCallback, useId, useState,
} from 'react';

import { Elevator } from '@/components';

import styles from './slider.module.css';

export type SliderProps = SliderPrimitive.SliderProps & {
  /**
   * Show values beside the thumbs
   */
  showValues?: boolean;
  /**
   * Show custom value label instead of raw value
   */
  valueLabel?: (value: number) => string;
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
  valueLabel,
  onValueChange,
  max = 100,
  ...otherProps
}, forwardedRef) => {
  const val = value ?? defaultValue;
  const uid = useId();
  const [changedValue, setChangedValue] = useState<number[] | undefined>(val);

  const handleChange = useCallback(
    (value: number[]) => {
      setChangedValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

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
      onValueChange={handleChange}
      {...otherProps}
    >
      <SliderPrimitive.Track className={styles.Track}>
        <SliderPrimitive.Range className={styles.Range} />
      </SliderPrimitive.Track>

      {val?.map((value, index) => (
        <Elevator resting={1} key={`${uid}-${value}`}>
          <SliderPrimitive.Thumb
            className={styles.Thumb}
            data-slider-value-label={valueLabel?.(changedValue?.[index] ?? 0)}
          />
        </Elevator>
      ))}
    </SliderPrimitive.Root>
  );
});
