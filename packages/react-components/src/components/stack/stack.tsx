'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import type { PolyRefComponent } from '@/components';

import styles from './stack.module.css';

export type StackProps = {
  /**
   * Add a gap between rows.
   */
  rowGap?: TokensTypes['space'];
  /**
   * Add a gap between columns.
   */
  columnGap?: TokensTypes['space'];
  /**
   * Display the element as inline-flex
   * @defaultValue false
   */
  inline?: boolean;
  /**
   * Wrap children when there is no space for them.
   * @defaultValue false
   */
  wrap?: boolean;
  /**
   * Make the children grow to fill the available space instead
   * of being sized based on their content.
   * @defaultValue true
   */
  fill?: boolean;
  /**
   * Place the content vertically centered instead of
   * growing to fill the available space.
   * @defaultValue "initial"
   */
  vAlign?: string;
  /**
   * Place the content horizontally centered instead of
   * growing to fill the available space.
   * @defaultValue "initial"
   */
  hAlign?: string;
  /**
   * Set the horizontal padding (left/right)
   */
  hPadding?: TokensTypes['space'];
  /**
   * Set the vertical padding (top/bottom)
   */
  vPadding?: TokensTypes['space'];
  /**
   * Renders children as rows or columns. The value can be one of the flex directions.
   * More info: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   * @defaultValue 'column'
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export const Stack = forwardRef(
  (
    {
      as,
      children,
      className,
      rowGap,
      columnGap,
      inline = false,
      direction = 'column',
      wrap = false,
      fill = true,
      vAlign = 'initial',
      hAlign = 'initial',
      hPadding,
      vPadding,
      style,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const Component = as ?? 'div';

    const alignmentTemplate = useMemo(
      () => (prop: string) => {
        if (prop.includes('start') || prop.includes('end')) {
          return `flex-${prop}`;
        }

        return prop;
      },
      [],
    );

    const dynamicStyle = useMemo(
      () => ({
        '--r-gap': rowGap ? tkns.space[rowGap] : 0,
        '--c-gap': columnGap ? tkns.space[columnGap] : 0,
        '--v-align': vAlign && alignmentTemplate(vAlign),
        '--h-align': hAlign && alignmentTemplate(hAlign),
        '--v-padding': vPadding ? tkns.space[vPadding] : 0,
        '--h-padding': hPadding ? tkns.space[hPadding] : 0,
      }),
      [alignmentTemplate, columnGap, hAlign, hPadding, rowGap, vAlign, vPadding],
    );

    return (
      <Component
        ref={forwardedRef}
        style={{ ...dynamicStyle, ...style }}
        data-stack-inline={inline}
        data-stack-wrap={wrap}
        data-stack-direction={direction}
        data-stack-fill={fill}
        data-stack-has-padding={Boolean(hPadding ?? vPadding)}
        className={clsx(styles.Stack, className)}
        {...otherProps}
      >
        {children}
      </Component>
    );
  },
) as PolyRefComponent<'div', StackProps>;
