'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import { Children, Fragment, isValidElement, useMemo } from 'react';
import { Except } from 'type-fest';

import { PolyRefComponent, Stack, StackProps } from '@/components';

import { SnaplistItem } from './snaplist-item';
import styles from './snaplist.module.css';

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
  /**
   * Seth the size (max-width) of the snap element.
   *
   * @defaultValue "max-content"
   */
  snapItemWidth?: string;
};

type SnaplistComponent = PolyRefComponent<
  typeof Stack,
  Except<StackProps, 'wrap' | 'fill'> & SnaplistProps
>;

export const Snaplist: SnaplistComponent = ({
  as = 'div' as React.ElementType,
  children,
  className,
  rowGap = 32,
  columnGap = 32,
  bleed,
  snapAlign = 'center',
  snapType = 'mandatory',
  scrollPadding,
  snapItemWidth,
  style,
  ref: forwardedRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--snap-align': snapAlign,
      '--snap-type': snapType,
      '--scroll-padding': scrollPadding ? tkns.space[scrollPadding] : 0,
      '--snap-item-width': snapItemWidth,
      '--bleed': bleed ? tkns.space[bleed] : 0,
    }),
    [bleed, snapAlign, snapType, scrollPadding, snapItemWidth],
  );

  return (
    <Stack
      {...otherProps}
      as={as}
      ref={forwardedRef}
      direction="row"
      rowGap={rowGap}
      columnGap={columnGap}
      className={clsx(styles.Snaplist, className)}
      style={{ ...dynamicStyle, ...style }}
    >
      {Children.toArray(children).map((child) => {
        if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
          if (child.type === Fragment) {
            return Children.map(
              child.props.children,
              (fragmentChild: React.ReactNode) =>
                isValidElement<React.HTMLAttributes<HTMLElement>>(fragmentChild) && (
                  <SnaplistItem key={fragmentChild.key}>{fragmentChild}</SnaplistItem>
                ),
            )!;
          }

          return <SnaplistItem key={child.key}>{child}</SnaplistItem>;
        }

        return null;
      })}
    </Stack>
  );
};
