'use client';

import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  Children, forwardRef, isValidElement, useMemo,
} from 'react';
import { Except } from 'type-fest';

import { Polymorphic, Stack } from '@/components';

import styles from './snaplist.module.css';
import { SnaplistItem } from './snaplist-item';

export type SnaplistProps = {
  /**
   * The alignment of the snap element.
   * This define which side the snap element is anchored when srcolling.
   * @defaultValue "center"
   */
  snapAlign?: 'start' | 'center' | 'end';
  /**
   * The type of snap.
   * @defaultValue "mandatory"
   */
  snapType?: 'mandatory' | 'proximity';
  /**
   * Horizontal negative margin used to offset the list.
   * Used to align list edges to the viewport or containers.
   */
  bleed?: TokensTypes['space'];
  /**
   * The distance between the snap element and the scroller edges..
   */
  scrollPadding?: TokensTypes['space'];
}

type PolymorphicSnaplist = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Stack>,
Except<Polymorphic.OwnProps<typeof Stack>, 'wrap' | 'fill'> & SnaplistProps
>;

export const Snaplist = forwardRef(({
  children,
  className,
  rowGap = 32,
  columnGap = 32,
  bleed,
  snapAlign = 'center',
  snapType = 'mandatory',
  scrollPadding,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle = useMemo(() => ({
    '--snap-align': snapAlign,
    '--snap-type': snapType,
    '--scroll-padding': scrollPadding ? tkns.space[scrollPadding] : 0,
    '--bleed': bleed ? tkns.space[bleed] : 0,
  }), [bleed, snapAlign, snapType, scrollPadding]);

  return (
    <Stack
      ref={forwardedRef}
      direction="row"
      rowGap={rowGap}
      columnGap={columnGap}
      className={clsx(styles.Snaplist, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {Children.map(children, child => isValidElement(child) && <SnaplistItem>{child}</SnaplistItem>)}
    </Stack>
  );
}) as PolymorphicSnaplist;

Snaplist.displayName = 'Snaplist';
