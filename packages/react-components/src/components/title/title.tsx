'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithRef, CSSProperties, forwardRef, useMemo,
} from 'react';

import { Polymorphic } from '@/components';

import styles from './title.module.css';

export type TitleProps = ComponentPropsWithRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> & {
  /**
   * Set the level of the title. This property only
   * affects the visual appearance of the title and not the
   * semantic meaning of the title, which you can define
   * by using the `as` property.
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 'display';
  /**
   * Set the text line-height of the title. This uses
   * the predefined tokens from the typography system.
   * @default 'standard'
   */
  lineHeight?: 'none' | 'extra-small' | 'small' | 'standard' |'large';
  /**
   * Set the text alignment of the title based on the text direction.
   */
  textAlign?: 'start' | 'center' | 'end';
  /**
   * Set the maximum width of the text after which it will wrap.
   */
  maxWidth?: string;
  /**
   * Enable or disable the responsiveness of the text. If disabled,
   * the text will be always the same size across all breakpoints.
   */
  responsive?: boolean;
}

type PolymorphicTitle = Polymorphic.ForwardRefComponent<'span', TitleProps>;

export const Title = forwardRef(({
  children,
  className,
  as: Wrapper = 'span',
  lineHeight = 'standard',
  level = '1',
  textAlign = 'start',
  maxWidth,
  responsive = true,
  style,
  ...otherProps
}, forwardedRef) => {
  const computedLevel = level.match(/\d/g) ? `H${level}` : level.charAt(0).toUpperCase() + level.slice(1);
  // @ts-expect-error: generated className is not pure in CSS
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const computedCSSClass = styles[computedLevel];
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--max-w': maxWidth,
      '--t-align': textAlign,
    }
  ), [maxWidth, textAlign]);

  return (
    <Wrapper
      ref={forwardedRef}
      data-title-line-height={lineHeight}
      data-title-responsive={responsive}
      className={clsx(styles.Title, computedCSSClass, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicTitle;

Title.displayName = 'Title';
