'use client';

import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { Polymorphic } from '@/components';

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
}

type PolymorphicScrollArea = Polymorphic.ForwardRefComponent<'div', ScrollAreaProps>;

export const ScrollArea = forwardRef(({
  children,
  className,
  as: Wrapper = 'div',
  canScroll = true,
  thumbColor,
  trackColor,
  useSystemStyle = true,
  hideScrollbars = false,
  gutterBehavior = 'auto',
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle = useMemo(() => (
    {
      '--thumb-color': thumbColor,
      '--track-color': trackColor,
      '--gutter-behaviour': gutterBehavior,
    }
  ), [thumbColor, trackColor, gutterBehavior]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.ScrollArea, className)}
      data-scroll-area-scrolling={canScroll}
      data-scroll-visible={!hideScrollbars}
      data-scroll-use-system={useSystemStyle}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicScrollArea;

ScrollArea.displayName = 'ScrollArea';
