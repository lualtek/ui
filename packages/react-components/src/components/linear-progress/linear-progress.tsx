/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import clsx from 'clsx';
import {
  FC,
  RefObject,
  useCallback, useMemo,
} from 'react';

import { Text } from '@/components';

import styles from './linear-progress.module.css';

export type LinearProgressProps = React.ComponentPropsWithRef<'progress'> & {
  /**
   * Set the current progress of the progress bar.
   * This value should be between 0 and 'max'. The percentage is
   * automatically computed.
   */
  value?: number;
  /**
   * Set the max value of the progress bar. This determines the
   * computed percentage.
   *
   * @defaultValue 100
   */
  max?: number;
  /**
   * Set the dimension of the progress bar.
   *
   * @defaultValue "regular"
   */
  dimension?: 'regular' | 'big';
  /**
   * Show or hide the progress value.
   */
  showProgress?: boolean;
}

export const LinearProgress: FC<LinearProgressProps> = ({
  className,
  style,
  value,
  max = 100,
  dimension = 'regular',
  showProgress,
  ref: forwardedRef,
  ...otherProps
}) => {
  const getPercentage = useCallback(
    () => (value ? Math.round((100 * value) / max) : 0),
    [max, value],
  );

  const clamp = useMemo(() => (num: number, min: number, max: number) => Math.min(Math.max(num, min), max), []);

  const dynamicStyle = useMemo(() => (
    {
      '--percentage-offset': `${getPercentage()}%`,
      '--percentage-translation': value !== 0 ? '-100%' : '-50%',
    }
  ), [getPercentage, value]);

  return (
    <div className={clsx(styles.LinearProgress, className)} style={{ ...dynamicStyle, ...style }}>
      <progress
        role="progressbar"
        ref={forwardedRef}
        className={styles.Progress}
        data-progress-dimension={dimension}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuemax={max}
        value={value}
        max={max}
        {...otherProps}
      />
      {(showProgress) && (
        <Text
          as="span"
          className={styles.Percentage}
          weight="bold"
          size={dimension === 'regular' ? 16 : 18}
        >
          {value && clamp(getPercentage(), 0, 100)}
        </Text>
      )}
    </div>
  );
};
