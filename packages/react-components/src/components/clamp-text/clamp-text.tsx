'use client';

import clsx from 'clsx';
import {
  forwardRef, useMemo,
} from 'react';

import { PolyRefComponent } from '@/components';

import styles from './clamp-text.module.css';

export type ClampTextProps = {
  /**
   * Define how many lines the text should be clamped to.
   * @defaultValue 1
   */
  rows?: number;
  /**
   * Put the text as inline element instead of block.
   */
  inline?: boolean;
}

type ClampTextComponent = PolyRefComponent<'span', ClampTextProps>;

export const ClampText: ClampTextComponent = (
  {
    as: Component = 'span',
    className,
    children,
    rows = 1,
    style,
    inline,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const dynamicStyle = useMemo(() => ({
    '--r': rows,
  }), [rows]);

  return (
    <Component
      ref={forwardedRef}
      style={{ ...dynamicStyle, ...style }}
      className={clsx(styles.ClampText, className)}
      data-clamp-text-inline={inline}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
