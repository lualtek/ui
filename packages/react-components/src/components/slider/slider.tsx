'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import {
  FC,
  ReactNode, useCallback, useEffect, useId, useMemo, useState,
} from 'react';

import {
  Elevator, Stack, Text, useStyles,
} from '@/components';

import styles from './slider.module.css';

export type SliderProps = SliderPrimitive.SliderProps & React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
  /**
   * Show values beside the thumbs
   */
  showValues?: boolean;
  /**
   * Show custom value label instead of raw value
   *
   * @defaultValue `val => val`
   */
  valueLabel?: (value: number) => string;
  /**
   * Assign a label to the input.
   */
  label?: ReactNode;
};

export const Slider: FC<SliderProps> = ({
  className,
  value,
  defaultValue,
  orientation = 'horizontal',
  showValues,
  valueLabel = val => val,
  onValueChange,
  max = 100,
  label,
  ref: forwardedRef,
  ...otherProps
}) => {
  const { vibrancy } = useStyles({
    vibrancy: {
      color: 'mid',
    },
  });
  const val = useMemo(() => value ?? defaultValue, [value, defaultValue]);
  const uid = useId();
  const [changedValue, setChangedValue] = useState<number[] | undefined>(val);

  const handleChange = useCallback(
    (value: number[]) => {
      setChangedValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  useEffect(() => {
    setChangedValue(val);
  }, [val]);

  return (
    <Stack rowGap={4} inline className={clsx(styles.Slider, className)}>
      {label && (
        <Text
          as="span"
          lineHeight="extra-small"
          dimmed={5}
          size={14}
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
        value={changedValue}
        max={max}
        onValueChange={handleChange}
        {...otherProps}
      >
        <SliderPrimitive.Track className={styles.Track} {...vibrancy.attributes}>
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
};
