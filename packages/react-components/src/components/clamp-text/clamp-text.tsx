'use client';

import clsx from 'clsx';
import React, {
  forwardRef, useMemo,
} from 'react';

import { PolymorphicPropsRef, PropsClassChildren } from '@/components';

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

type PolymorphicClampText<T extends React.ElementType = 'span'> = PolymorphicPropsRef<
  T,
  PropsClassChildren<ClampTextProps>
>;

type ClampTextComponent = <T extends React.ElementType = 'span'>(
  props: PolymorphicClampText<T>
) => JSX.Element | React.ReactNode | null

export const ClampText: ClampTextComponent = forwardRef(
  <T extends React.ElementType = 'span'>(
    {
      as,
      className,
      children,
      rows = 1,
      style,
      inline,
      ...otherProps
    }: PolymorphicClampText<T>,
    forwardedRef?: React.ForwardedRef<T>,
  ) => {
    const Component = as ?? 'span';

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
);
