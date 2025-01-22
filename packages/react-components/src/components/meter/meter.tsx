'use client';

import {
  forwardRef,
  ReactNode,
  useId,
} from 'react';
import { Except } from 'type-fest';

import { Stack, Text } from '@/components';

import styles from './meter.module.css';

export type MeterProps = Except<React.ComponentPropsWithRef<'meter'>, 'min' | 'max'> & {
  /**
   * Set the dimension of the meter.
   */
  dimension?: 'small' | 'regular';
  /**
   * Show the label next to the meter.
   *
   * @defaultValue true
   */
  showLabel?: boolean;
  /**
   * Position of the label next to the meter.
   *
   * @defaultValue 'end'
   */
  labelPosition?: 'start' | 'end';
  /**
   * Custom label to show next to the meter. This replace the default label.
   */
  label?: ReactNode;
};

export const Meter = forwardRef<HTMLMeterElement, MeterProps>(({
  className,
  dimension = 'regular',
  value,
  label,
  showLabel = true,
  labelPosition = 'end',
  ...otherProps
}, forwardedRef) => {
  const uid = useId();

  return (
    <Stack
      inline
      direction={labelPosition === 'end' ? 'row' : 'row-reverse'}
      vAlign="center"
      columnGap={4}
      className={className}
    >
      <meter
        data-meter-dimension={dimension}
        min={0}
        max={6}
        ref={forwardedRef}
        value={Math.floor(Number(value))}
        className={styles.Meter}
        aria-labelledby={`${uid}-meter`}
        {...otherProps}
      />
      {showLabel && (
        <Text id={`${uid}-meter`} size={14} lineHeight="extra-small">
          {label ?? Math.floor(Number(value))}
        </Text>
      )}
    </Stack>
  );
});
