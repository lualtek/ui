'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  ElementRef, forwardRef, ReactNode, useCallback, useId, useState,
} from 'react';

import { Elevator, Stack, Text } from '@/components';

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
  /**
   * Assign a label to the input.
   */
  label?: ReactNode;
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
  valueLabel = val => val,
  onValueChange,
  max = 100,
  label,
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
    <Stack rowGap={16} inline className={clsx(styles.Slider, className)}>
      {label && (
        <Text
          as="span"
          lineHeight="none"
          size={16}
        >
          {label}
        </Text>
      )}
      <SliderPrimitive.Root
        className={styles.Input}
        orientation={orientation}
        id={uid}
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
          <SliderPrimitive.Range className={styles.ValueTrack} />
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
    </Stack>
  );
});
