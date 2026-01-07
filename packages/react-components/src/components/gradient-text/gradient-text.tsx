'use client';

import clsx from 'clsx';
import {
  FC,
  useMemo,
} from 'react';

import styles from './gradient-text.module.css';

export type GradientTextProps = React.ComponentPropsWithRef<'span'> & {
  /**
   * The gradient name to use from predefined gradients.
   * @defaultValue "rainbow"
   */
  gradient?: 'rainbow' | 'brand' | 'primary' | 'cyan' | 'dawn';
  /**
   * The starting color stop of the gradient.
   */
  colorStart?: string;
  /**
   * The end color stop of the gradient.
   */
  colorEnd?: string;
}

export const GradientText: FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'rainbow',
  colorStart,
  colorEnd,
  style,
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(() => ({
    '--gradient-color-start': colorStart,
    '--gradient-color-end': colorEnd,
  }), [colorStart, colorEnd]);

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.GradientText, className)}
      data-gradient-text={!colorStart && !colorEnd ? gradient : 'custom'}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </span>
  );
};

