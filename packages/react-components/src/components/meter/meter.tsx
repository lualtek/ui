import clsx from 'clsx';
import {
  ComponentPropsWithoutRef, FC,
} from 'react';
import { Except } from 'type-fest';

import styles from './meter.module.css';

export type MeterProps = Except<ComponentPropsWithoutRef<'meter'>, 'min' | 'max'> & {
  dimension?: 'small' | 'regular';
};

export const Meter: FC<MeterProps> = ({
  className,
  dimension = 'regular',
  value = 0,
  ...otherProps
}) => (
  <meter
    data-meter-dimension={dimension}
    min={0}
    max={6}
    value={Math.floor(Number(value))}
    className={clsx(styles.Meter, className)}
    {...otherProps}
  />
);

Meter.displayName = 'Meter';
