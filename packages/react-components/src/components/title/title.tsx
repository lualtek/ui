'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  forwardRef, useMemo,
} from 'react';

import { PolyRefComponent } from '@/components';

import styles from './title.module.css';

export type TitleProps = React.ComponentPropsWithRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'> & {
  /**
   * Set the level of the title. This property only
   * affects the visual appearance of the title and not the
   * semantic meaning of the title, which you can define
   * by using the `as` property.
   *
   * @defaultValue "1"
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 'display';
  /**
   * Set the text line-height of the title. This uses
   * the predefined tokens from the typography system.
   * @defaultValue "standard"
   */
  lineHeight?: 'none' | 'extra-small' | 'small' | 'standard' | 'large';
  /**
   * Set the text alignment of the title based on the text direction.
   *
   * @defaultValue "start"
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Set the maximum width of the text after which it will wrap.
   */
  maxWidth?: string;
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  responsive?: boolean;
  /**
   * Set the white-space property of the title.
   */
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
  /**
   * Set the text wrapping to be balanced. Works only with block elements.
   *
   * @defaultValue false
   */
  balanced?: boolean;
  /**
   * Set the horizontal padding (left/right). Works better with block elements.
   */
  hPadding?: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0];
  /**
   * Set the vertical padding (top/bottom). Works better with block elements.
   */
  vPadding?: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0];
  /**
   * Trim leading (pronounced "ledding") whitespace from the text.
   */
  trim?: 'start' | 'end' | 'both';
  /**
   * Set the trim behaviour for the text.
   *
   * @defaultValue "text alphabetic"
   */
  trimType?: string;
  /**
   * Set the font weight of the title. Can be a number (e.g., 200-1000)
   * or you can rely on the default weight for each level.
   */
  weight?: number;
  /**
   * Set the font width (wdth) for variable fonts.
   * Typically ranges from 75 to 125.
   */
  fontWidth?: number;
  /**
   * Set the optical size (opsz) for variable fonts.
   * For Nunito Sans, ranges from 6 to 12.
   */
  opticalSize?: number;
}

type TitleComponent = PolyRefComponent<'span', TitleProps>;

export const Title: TitleComponent = (
  {
    as: Component = 'span',
    children,
    className,
    lineHeight = 'standard',
    level = '1',
    align = 'start',
    whiteSpace = 'normal',
    maxWidth,
    responsive = true,
    balanced = false,
    hPadding,
    vPadding,
    trim = 'both',
    trimType = 'cap alphabetic',
    weight,
    fontWidth,
    opticalSize,
    style,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const computedLevel = level.match(/\d/g) ? `H${level}` : level.charAt(0).toUpperCase() + level.slice(1);
  // @ts-expect-error: generated className is not pure in CSS
  const computedCSSClass = String(styles[computedLevel]);
  const dynamicStyle = useMemo(() => {
    const getPaddingValue = (
      padding: TokensTypes['space'] | [TokensTypes['space'] | 0, TokensTypes['space'] | 0],
      direction: 'horizontal' | 'vertical',
    ) => {
      const [start, end] = Array.isArray(padding) ? padding : [padding, padding];
      return direction === 'horizontal'
        ? { left: start ? tkns.space[start] : 0, right: end ? tkns.space[end] : 0 }
        : { top: start ? tkns.space[start] : 0, bottom: end ? tkns.space[end] : 0 };
    };

    const vPaddingValues = vPadding ? getPaddingValue(vPadding, 'vertical') : { top: 0, bottom: 0 };
    const hPaddingValues = hPadding ? getPaddingValue(hPadding, 'horizontal') : { left: 0, right: 0 };

    return {
      '--max-w': maxWidth,
      '--t-align': align,
      '--white-space': whiteSpace,
      '--v-padding-top': vPaddingValues.top,
      '--v-padding-bottom': vPaddingValues.bottom,
      '--h-padding-left': hPaddingValues.left,
      '--h-padding-right': hPaddingValues.right,
      '--trim': trim ? `trim-${trim}` : undefined,
      '--trim-type': trimType,
      '--custom-weight': weight,
      '--custom-width': fontWidth,
      '--custom-opsz': opticalSize,
    };
  }, [maxWidth, align, whiteSpace, vPadding, hPadding, trimType, trim, weight, fontWidth, opticalSize]);

  return (
    <Component
      ref={forwardedRef}
      data-title-line-height={lineHeight}
      data-title-responsive={responsive}
      data-title-balanced={balanced}
      data-title-has-padding={Boolean(hPadding ?? vPadding)}
      className={clsx(styles.Title, computedCSSClass, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
