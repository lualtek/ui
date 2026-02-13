'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { PolyRefComponent } from '@/components';

import styles from './text.module.css';

export type TextProps = React.ComponentPropsWithRef<'span'> & {
  /**
   * Set the dimension of the text from one of
   * the typography system values
   */
  size?: TokensTypes['font']['size'];
  /**
   * Set the sentiment of the text.
   */
  sentiment?: 'positive' | 'informative' | 'danger' | 'warning';
  /**
   * Set the dimmed color of the text. To keep readability and contrast,
   * you can only use dimmed colors `5`, `6`, and `7`.
   */
  dimmed?: 4 | 5 | 6 | 7 | 8;
  /**
   * Set the font weight of the text. The values are
   * consistent with the typography system.
   */
  weight?: 'light' | 'regular' | 'semibold' | 'bold' ;
  /**
   * Set the maximum width of the text after which it will wrap.
   */
  maxWidth?: string;
  /**
   * Set the text alignment of the text. This is a logical property
   * based on the direction of the text.
   *
   * @defaultValue "start"
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   *
   * @defaultValue true
   */
  responsive?: boolean;
  /**
   * Set the text line-height of the text. This uses
   * the predefined tokens from the typography system.
   *
   * @defaultValue "standard"
   */
  lineHeight?: 'none' | 'extra-small' | 'small' | 'standard' | 'large';
  /**
   * Assign a custom color to the text when `dimmed` or `sentiment` are not set.
   */
  textColor?: string;
  /**
   * Set the white-space property of the text.
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
}

export type TextComponent = PolyRefComponent<'span', TextProps>;

export const Text: TextComponent = (
  {
    as: Component = 'span',
    children,
    className,
    size,
    sentiment,
    dimmed,
    weight,
    maxWidth,
    align = 'start',
    responsive = true,
    lineHeight = 'standard',
    textColor,
    whiteSpace = 'normal',
    balanced = false,
    hPadding,
    vPadding,
    trim,
    trimType = 'text alphabetic',
    style,
    ref: forwardedRef,
    ...otherProps
  },
) => {
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
      '--text-color': textColor,
      '--white-space': whiteSpace,
      '--v-padding-top': vPaddingValues.top,
      '--v-padding-bottom': vPaddingValues.bottom,
      '--h-padding-left': hPaddingValues.left,
      '--h-padding-right': hPaddingValues.right,
      '--trim': trim ? `trim-${trim}` : undefined,
      '--trim-type': trimType,
    };
  }, [maxWidth, align, textColor, whiteSpace, hPadding, vPadding, trimType, trim]);

  return (
    <Component
      ref={forwardedRef}
      data-text-size={size}
      data-text-weight={weight}
      data-text-sentiment={sentiment}
      data-text-dimmed={dimmed}
      data-text-line-height={lineHeight}
      data-text-responsive={size === 12 ? false : responsive}
      data-text-balanced={balanced}
      data-text-has-padding={Boolean(hPadding ?? vPadding)}
      className={clsx(styles.Text, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
