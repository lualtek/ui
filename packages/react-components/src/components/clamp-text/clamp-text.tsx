'use client';

import clsx from 'clsx';
import React, {
  forwardRef, useMemo,
} from 'react';

import { PolyRefComponent, PropsClassChildren } from '@/components';

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

export const ClampText = forwardRef(
  (
    {
      as: Component = 'span',
      className,
      children,
      rows = 1,
      style,
      inline,
      ...otherProps
    },
    forwardedRef,
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
  },
) as PolyRefComponent<'span', PropsClassChildren<ClampTextProps>>;
