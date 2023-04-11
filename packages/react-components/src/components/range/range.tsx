import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  ElementRef, forwardRef, useCallback, useId, useState,
} from 'react';

import { Elevator } from '@/components';

import styles from './range.module.css';

export type RangeProps = SliderPrimitive.SliderProps & {
  /**
   * Show values beside the thumbs
   */
  showValues?: boolean;
  /**
   * Show custom value label instead of raw value
   */
  valueLabel?: (value: number) => string;
};
export const Range = forwardRef<
ElementRef<typeof SliderPrimitive.Root>,
RangeProps
>(({
  className,
  value,
  defaultValue,
  orientation = 'horizontal',
  showValues,
  valueLabel = val => val,
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
      className={clsx(styles.Range, className)}
      orientation={orientation}
      data-range-show-values={showValues}
      minStepsBetweenThumbs={1}
      ref={forwardedRef}
      defaultValue={defaultValue}
      value={value}
      max={max}
      onValueChange={handleChange}
      {...otherProps}
    >
      <SliderPrimitive.Track className={styles.Track}>
        <SliderPrimitive.Range className={styles.ValueTrack} />
      </SliderPrimitive.Track>

      {val?.map((value, index) => (
        <Elevator resting={1} key={`${uid}-${value}`}>
          <SliderPrimitive.Thumb
            className={styles.Thumb}
            data-range-value-label={valueLabel?.(changedValue?.[index] ?? 0)}
          />
        </Elevator>
      ))}
    </SliderPrimitive.Root>
  );
});
