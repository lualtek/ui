'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, ReactNode, useMemo } from 'react';

import { PropsWithClass } from '@/components/types';

import styles from './interpolator.module.css';

export type InterpolatorProps = {
  exitComponent: ReactNode;
  enterComponent: ReactNode;
  interpolating: boolean;
  enterScale?: [number, number];
  enterRotation?: number;
  exitScale?: [number, number];
  exitRotation?: number;
  duration?: TokensTypes['duration'];
}

export const Interpolator = forwardRef<HTMLDivElement, PropsWithClass<InterpolatorProps>>(({
  className,
  style,
  exitComponent,
  enterComponent,
  interpolating = false,
  enterScale = [0.5, 2.5],
  enterRotation = 0,
  exitRotation = 0,
  exitScale = [3.5, 0.5],
  duration = 200,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle = useMemo(() => ({
    '--enter-scale': `${enterScale[0]} ${enterScale[1]}`,
    '--exit-scale': `${exitScale[0]} ${exitScale[1]}`,
    '--duration': tkns.duration[duration],
    '--enter-rotation': `${enterRotation}deg`,
    '--exit-rotation': `${exitRotation}deg`,
  }), [enterScale, exitScale, duration, enterRotation, exitRotation]);

  return (
    <div
      className={clsx(styles.Interpolator, className)}
      data-interpolating={interpolating}
      ref={forwardedRef}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.Entering}>{enterComponent}</div>
      <div className={styles.Exiting}>{exitComponent}</div>
    </div>
  );
});

Interpolator.displayName = 'Interpolator';

