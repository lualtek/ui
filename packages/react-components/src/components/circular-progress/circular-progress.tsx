'use client';

import clsx from 'clsx';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

import styles from './circular-progress.module.css';

export type CircularProgressProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Set the current progress of the progress bar.
   * This value should be between 0 and 'max'. The percentage is
   * automatically computed.
   */
  value: number;
  /**
   * Set the max value of the progress bar. This determines the
   * computed percentage.
   * @defaultValue 100
   */
  max?: number;
  /**
   * Set the dimension of the progress bar.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Show or hide the progress value.
   */
  showProgress?: boolean;
  /**
   * Show custom value label instead of raw value
   * @defaultValue (value) => `${value}%`
   */
  progressLabel?: (value: number) => string;
  /**
   * Change the color of the progress bar.
   */
  color?: string;
};

export const CircularProgress: FC<CircularProgressProps> = ({
  className,
  value,
  max = 100,
  dimension = 'regular',
  showProgress,
  progressLabel = (val) => val,
  color,
  style,
  ref: forwardedRef,
  ...otherProps
}) => {
  const getPercentage = useCallback(() => (value ? Math.round((100 * value) / max) : 0), [max, value]);

  const clamp = useMemo(() => (num: number, min: number, maxNum: number) => Math.min(Math.max(num, min), maxNum), []);

  const dynamicStyle = useMemo(
    () => ({
      '--progress': `${getPercentage()}%`,
      '--rotation': `${getPercentage() / 100}turn`,
      '--progress-color': color,
    }),
    [color, getPercentage],
  );

  return (
    <div
      ref={forwardedRef}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={clsx(styles.CircularProgress, className)}
      data-circular-progress={progressLabel?.(clamp(getPercentage(), 0, 100))}
      data-circular-progress-dimension={dimension}
      data-circular-progress-show-progress={showProgress}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <span className={styles.Start} />
      <span className={styles.End} />
    </div>
  );
};
