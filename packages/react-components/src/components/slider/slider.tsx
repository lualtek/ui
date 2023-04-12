import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  CSSProperties, forwardRef, useMemo,
} from 'react';
import { Except } from 'type-fest';

import { Polymorphic, Stack } from '@/components';

import styles from './slider.module.css';

export type SliderProps = {
  columns?: number;
  /**
   * Set the columns repeating behaviour.
   * This refers to the CSS function `repeat()`, which can use both `auto-fit`
   * and `auto-fill` parameters.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
   */
  filling?: 'fit' | 'fill';
  colMinWidth?: string;
  bleed?: TokensTypes['space'];
  snapAlign: 'start' | 'center' | 'end';
  scrollPadding?: string;
}

type PolymorphicSlider = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Stack>,
Except<Polymorphic.OwnProps<typeof Stack>, 'wrap'> & SliderProps
>;

export const Slider = forwardRef(({
  children,
  className,
  columns,
  rowGap = 32,
  columnGap = 32,
  colMinWidth = 'max(200px, 70vw)',
  bleed,
  snapAlign = 'center',
  scrollPadding,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--columns': columns,
    '--column-min-w': colMinWidth,
    '--snap-align': snapAlign,
    '--scroll-padding': scrollPadding,
    '--bleed': bleed ? tkns.space[bleed] : 0,
  }), [bleed, columns, snapAlign, scrollPadding, colMinWidth]);

  return (
    <Stack
      ref={forwardedRef}
      direction="row"
      rowGap={rowGap}
      columnGap={columnGap}
      className={clsx(styles.Slider, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Stack>
  );
}) as PolymorphicSlider;
