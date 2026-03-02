'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import styles from './interpolator.module.css';

export type InterpolatorProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * The component to be rendered as default which will be animated out.
   */
  exitComponent: ReactNode;
  /**
   * The component that will enter the screen.
   */
  enterComponent: ReactNode;
  /**
   * If the component is currently interpolating.
   *
   * @defaultValue false
   */
  interpolating: boolean;
  /**
   * The initial scale of the entering component.
   *
   * @defaultValue [0.5, 2.5]
   */
  enterScale?: [number, number];
  /**
   * The initial rotation of the entering component.
   *
   * @defaultValue 0
   */
  enterRotation?: string;
  /**
   * The final scale of the exiting component.
   *
   * @defaultValue [3.5, 0.5]
   */
  exitScale?: [number, number];
  /**
   * The final rotation of the exiting component.
   *
   * @defaultValue 0
   */
  exitRotation?: string;
  /**
   * The duration of the animation.
   *
   * @defaultValue 200
   */
  duration?: TokensTypes['duration'];
  /**
   * Set the delay for the entering element.
   */
  enteringDelay?: string;
  /**
   * Set the delay for the exiting element.
   */
  exitingDelay?: string;
};

export const Interpolator: FC<InterpolatorProps> = ({
  className,
  style,
  exitComponent,
  enterComponent,
  interpolating = false,
  enteringDelay,
  exitingDelay,
  enterScale = [0.5, 2.5],
  enterRotation = '0deg',
  exitRotation = '0deg',
  exitScale = [3.5, 0.5],
  duration = 200,
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--enter-scale': `${enterScale[0]} ${enterScale[1]}`,
      '--exit-scale': `${exitScale[0]} ${exitScale[1]}`,
      '--duration': tkns.duration[duration],
      '--entering-delay': enteringDelay,
      '--exiting-delay': exitingDelay,
      '--enter-rotation': enterRotation,
      '--exit-rotation': exitRotation,
    }),
    [enterScale, exitScale, duration, enterRotation, exitRotation, enteringDelay, exitingDelay],
  );

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
};
