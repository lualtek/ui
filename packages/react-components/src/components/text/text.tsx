'use client';

'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import clsx from 'clsx';
import { CSSProperties, forwardRef, useMemo } from 'react';

import { Polymorphic } from '@/components';

import styles from './text.module.css';

export type TextProps = {
  /**
   * Set the dimension of the text from one of
   * the typography system values
   *
   * @defaultValue 18
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
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  responsive?: boolean;
  /**
   * Set the text line-height of the text. This uses
   * the predefined tokens from the typography system.
   * @defaultValue "standard"
   */
  lineHeight?: 'none' | 'extra-small' | 'small' | 'standard' |'large';
  /**
   * Assign a custom color to the text when `dimmed` or `sentiment` are not set.
   */
  textColor?: string;
}

type PolymorphicText = Polymorphic.ForwardRefComponent<'p', TextProps>;

export const Text = forwardRef(({
  children,
  className,
  size = 18,
  sentiment,
  dimmed,
  weight,
  maxWidth,
  align = 'start',
  as: Wrapper = 'p',
  responsive = true,
  lineHeight = 'standard',
  textColor,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--max-w': maxWidth,
      '--t-align': align,
      '--text-color': textColor,
    }
  ), [maxWidth, align, textColor]);

  return (
    <Wrapper
      ref={forwardedRef}
      data-text-size={size}
      data-text-weight={weight}
      data-text-sentiment={sentiment}
      data-text-dimmed={dimmed}
      data-text-line-height={lineHeight}
      data-text-responsive={size === 12 ? false : responsive}
      className={clsx(styles.Text, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicText;

Text.displayName = 'Text';
