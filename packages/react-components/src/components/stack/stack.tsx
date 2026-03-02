'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import { useMemo } from 'react';

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
  hPadding?: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0];
  /**
   * Set the vertical padding (top/bottom)
   */
  vPadding?: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0];
  /**
   * Renders children as rows or columns. The value can be one of the flex directions.
   * More info: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   * @defaultValue 'column'
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * Set the max width of the stack
   */
  maxWidth?: string;
};

export type StackComponent = PolyRefComponent<'div', StackProps>;

export const Stack: StackComponent = ({
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
  maxWidth,
  ref: forwardedRef,
  ...otherProps
}) => {
  const Component = as ?? 'div';
  const alignmentTemplate = (prop: string) => {
    if (prop.includes('start') || prop.includes('end')) {
      return `flex-${prop}`;
    }

    return prop;
  };

  const dynamicStyle = useMemo(() => {
    const getPaddingValue = (
      padding: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0],
      paddingDirection: 'horizontal' | 'vertical',
    ) => {
      const [start, end] = Array.isArray(padding) ? padding : [padding, padding];
      return paddingDirection === 'horizontal'
        ? { left: start ? tkns.space[start] : 0, right: end ? tkns.space[end] : 0 }
        : { top: start ? tkns.space[start] : 0, bottom: end ? tkns.space[end] : 0 };
    };

    const vPaddingValues = vPadding ? getPaddingValue(vPadding, 'vertical') : { top: 0, bottom: 0 };
    const hPaddingValues = hPadding ? getPaddingValue(hPadding, 'horizontal') : { left: 0, right: 0 };

    return {
      '--r-gap': rowGap ? tkns.space[rowGap] : 0,
      '--c-gap': columnGap ? tkns.space[columnGap] : 0,
      '--v-align': alignmentTemplate(vAlign),
      '--h-align': alignmentTemplate(hAlign),
      '--v-padding-top': vPaddingValues.top,
      '--v-padding-bottom': vPaddingValues.bottom,
      '--h-padding-left': hPaddingValues.left,
      '--h-padding-right': hPaddingValues.right,
      '--max-width': maxWidth,
    };
  }, [columnGap, hAlign, hPadding, rowGap, vAlign, vPadding, maxWidth]);

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
};
