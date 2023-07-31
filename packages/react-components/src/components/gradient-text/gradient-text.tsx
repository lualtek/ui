'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  CSSProperties, forwardRef, useMemo,
} from 'react';

import styles from './gradient-text.module.css';

export type GradientTextProps = ComponentPropsWithRef<'span'> & {
  /**
   * The gradient name to use from predefined gradients.
   * @default 'rainbow'
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

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(({
  children,
  className,
  gradient = 'rainbow',
  colorStart,
  colorEnd,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => ({
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
});

GradientText.displayName = 'GradientText';
