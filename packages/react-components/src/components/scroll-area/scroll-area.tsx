'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { PolyRefComponent } from '@/components';

import styles from './scroll-area.module.css';

export type ScrollAreaProps = {
  /**
   * If true, the content can be scrolled.
   *
   * @defaultValue true
   */
  canScroll?: boolean;
  /**
   * The color of the scrollbar thumb.
   */
  thumbColor?: string;
  /**
   * Horizontal negative margin used to offset the list.
   * Used to align list edges to the viewport or containers.
   */
  bleed?: TokensTypes['space'];
  /**
   * The color of the scrollbar track.
   */
  trackColor?: string;
  /**
   * If true, scrollbars will always be visible.
   *
   * @defaultValue false
   */
  hideScrollbars?: boolean;
  /**
   * If true, the native scrollbar styles will be used.
   * This will override other props and fallback to system behaviour.
   *
   * @defaultValue true
   */
  useSystemStyle?: boolean;
  /**
   * Prevent content jumping when scrollbars are shown/hidden.
   *
   * @defaultValue 'auto'
   */
  gutterBehavior?: 'auto' | 'stable' | 'stable both-edges';
  /**
   * The direction to fade out.
   */
  fadeDirection?: 'vertical' | 'horizontal';
  /**
   * The size of the fade.
   *
   * @defaultValue 16
   */
  fadeSize?: string | Exclude<TokensTypes['space'], string>;
  /**
   * The behavior of the overscroll effect.
   *
   * @defaultValue 'contain'
   */
  overscrollBehavior?: 'auto' | 'contain' | 'none';
}

type ScrollAreaComponent = PolyRefComponent<'div', ScrollAreaProps>;

export const ScrollArea: ScrollAreaComponent = (
  {
    as: Component = 'div',
    children,
    className,
    canScroll = true,
    thumbColor,
    trackColor,
    bleed,
    useSystemStyle = true,
    hideScrollbars = false,
    gutterBehavior = 'auto',
    fadeDirection,
    overscrollBehavior = 'contain',
    fadeSize = 16,
    style,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const computedFadeDirection = useMemo(() => {
    if (fadeSize) {
      return typeof fadeSize === 'string' ? fadeSize : tkns.space[fadeSize];
    }

    return '0';
  }, [fadeSize]);

  const dynamicStyle = useMemo(() => (
    {
      '--thumb-color': thumbColor,
      '--track-color': trackColor,
      '--gutter-behaviour': gutterBehavior,
      '--fade-size': computedFadeDirection,
      '--overscroll-behavior': overscrollBehavior,
      '--bleed': bleed ? tkns.space[bleed] : 0,
    }
  ), [thumbColor, trackColor, gutterBehavior, overscrollBehavior, bleed, computedFadeDirection]);

  return (
    <Component
      ref={forwardedRef}
      className={clsx(styles.ScrollArea, className)}
      data-scroll-area-scrolling={canScroll}
      data-scroll-visible={!hideScrollbars}
      data-scroll-use-system={useSystemStyle}
      data-scroll-fade-direction={fadeDirection}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
