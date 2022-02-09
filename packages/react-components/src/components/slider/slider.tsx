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
   * Set the size of the slider.
   */
  dimension?: 'small' | 'regular';
  /**
   * Show values beside the slider.
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
  dimension = 'regular',
  onValueChange,
  showValues,
  max = 100,
  ...otherProps
}, forwardedRef) => {
  const val = value ?? defaultValue;
  const seedID = useUIDSeed();
  // const [displayValues, setDispalyValues] = useState<number[]>(val ?? []);

  // const handleValueChage = useCallback((value) => {
  //   setDispalyValues(value);
  //   return onValueChange?.(value);
  // }, [onValueChange]);

  // const getNumberLength = (num: number) => `${`${num}`.length + 1}ch`;

  return (
    <>
      {/* {showValues && (
      <Text
        as="span"
        maxWidth={getNumberLength(max)}
        textAlign="end"
        lineHeight="small"
        size={14}
      >
        {displayValues[0]}
      </Text>
      )} */}
      <SliderPrimitive.Root
        className={clsx(styles.Slider, className)}
        data-slider-dimension={dimension}
        minStepsBetweenThumbs={1}
        // onValueChange={handleValueChage}
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
      {/* {(showValues && displayValues[1]) && (
      <Text
        as="span"
        maxWidth={getNumberLength(max)}
        textAlign="start"
        lineHeight="small"
        size={14}
      >
        {displayValues[1]}
      </Text>
      )} */}
    </>
  );
});
