'use client';

import type { FC, ReactNode } from 'react';
import { useId, useMemo } from 'react';
import type { Except } from 'type-fest';

import type { StackProps } from '@/components';
import { Stack, Text } from '@/components';

import styles from './meter.module.css';

export type MeterProps = Except<React.ComponentPropsWithRef<'meter'>, 'min' | 'max'> & {
  /**
   * Set the dimension of the meter.
   */
  dimension?: 'small' | 'regular';
  /**
   * Set the direction of the meter.
   */
  direction?: StackProps['direction'];
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

export const Meter: FC<MeterProps> = ({
  className,
  dimension = 'regular',
  value,
  label,
  showLabel = true,
  labelPosition = 'end',
  direction = 'row',
  ref: forwardedRef,
  ...otherProps
}) => {
  const uid = useId();

  const horizontalLabelDirection = useMemo(() => (labelPosition === 'end' ? 'row' : 'row-reverse'), [labelPosition]);

  const verticalLabelDirection = useMemo(
    () => (labelPosition === 'end' ? 'column' : 'column-reverse'),
    [labelPosition],
  );

  const stackDirection = useMemo(
    () => (direction === 'row' ? horizontalLabelDirection : verticalLabelDirection),
    [direction, horizontalLabelDirection, verticalLabelDirection],
  );

  return (
    <Stack
      inline
      direction={stackDirection}
      vAlign="center"
      hAlign="center"
      columnGap={4}
      rowGap={4}
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
};
