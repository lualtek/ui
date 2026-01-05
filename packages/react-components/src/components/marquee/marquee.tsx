/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import React, {
  Children,
  CSSProperties,
  FC,
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './marquee.module.css';

export type MarqueeProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Whether to automatically fill blank space in the marquee with copies of the children or not
   * @defaultValue true
   */
  autoFill?: boolean;
  /**
   * Whether to play or pause the marquee
   * @defaultValue true
   */
  play?: boolean;
  /**
   * Whether to pause the marquee when hovered
   * @defaultValue false
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the marquee when clicked
   * @defaultValue false
   */
  pauseOnClick?: boolean;
  /**
   * The direction the marquee is sliding
   * @defaultValue "left"
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * Speed calculated as pixels/second
   * @defaultValue 50
   */
  speed?: number;
  /**
   * Duration to delay the animation after render, in seconds
   * @defaultValue 0
   */
  delay?: number;
  /**
   * The number of times the marquee should loop, 0 is equivalent to infinite
   * @defaultValue 0
   */
  loop?: number;
  /**
   * Whether to fade out the edges of the marquee
   * @defaultValue false
   */
  fade?: boolean;
  /**
   * The size of the fade area
   */
  fadeSize?: string;
  /**
   * The gap between each child
   */
  gap?: TokensTypes['space'];
  /**
   * A callback for when the marquee finishes scrolling and stops. Only calls if loop is non-zero.
   */
  onFinish?: () => void;
  /**
   * A callback for when the marquee finishes a loop.
   * Does not call if maximum loops are reached (use onFinish instead).
   */
  onCycleComplete?: () => void;
  /**
   * A callback function that is invoked once the marquee has finished mounting.
   * It can be utilized to recalculate the page size, if necessary.
   */
  onMount?: () => void;
};

export const Marquee: FC<MarqueeProps> = (
  {
    autoFill = true,
    play = true,
    pauseOnHover = false,
    pauseOnClick = false,
    direction = 'left',
    speed = 50,
    delay = 0,
    loop = 0,
    fade,
    fadeSize = '88px',
    gap,
    onFinish,
    onCycleComplete,
    children,
    style,
    className,
    ref: forwardedRef,
    ...otherProps
  },
) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = (forwardedRef as RefObject<HTMLDivElement | null>) || rootRef;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Calculate width of container and marquee and set multiplier
  const calculateWidth = useCallback(() => {
    if (marqueeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const marqueeRect = marqueeRef.current.getBoundingClientRect();
      let containerWidth = containerRect.width;
      let marqueeWidth = marqueeRect.width;

      // Swap width and height if direction is up or down
      if (direction === 'up' || direction === 'down') {
        containerWidth = containerRect.height;
        marqueeWidth = marqueeRect.height;
      }

      if (autoFill && containerWidth && marqueeWidth) {
        setMultiplier(
          marqueeWidth < containerWidth
            ? Math.ceil(containerWidth / marqueeWidth)
            : 1,
        );
      } else {
        setMultiplier(1);
      }

      setContainerWidth(containerWidth);
      setMarqueeWidth(marqueeWidth);
    }
  }, [autoFill, containerRef, direction]);

  // Calculate width and multiplier on mount and on window resize
  useEffect(() => {
    if (!isMounted) return () => undefined;

    calculateWidth();
    const resizeObserver = new ResizeObserver(() => calculateWidth());
    if (marqueeRef.current && containerRef.current) {
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(marqueeRef.current);
    }

    return () => {
      if (!resizeObserver) return;
      resizeObserver.disconnect();
    };
  }, [calculateWidth, containerRef, isMounted]);

  // Recalculate width when children change
  useEffect(() => {
    calculateWidth();
  }, [calculateWidth, children]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation duration
  const duration = useMemo(() => {
    if (autoFill) {
      return (marqueeWidth * multiplier) / speed;
    }

    return marqueeWidth < containerWidth
      ? containerWidth / speed
      : marqueeWidth / speed;
  }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);

  const dynamicStyle: CSSProperties = useMemo(
    () => {
      const computedContainerTransform = () => {
        if (direction === 'up') return 'rotate(-90deg)';
        if (direction === 'down') return 'rotate(90deg)';
        return 'none';
      };

      return {
        '--pause-on-hover': (!play || pauseOnHover) ? 'paused' : 'running',
        '--pause-on-click': (!play || (pauseOnHover && !pauseOnClick) || pauseOnClick) ? 'paused' : 'running',
        '--width': direction === 'up' || direction === 'down' ? '100vh' : '100%',
        '--transform': computedContainerTransform(),
        '--gap': gap ? tkns.space[gap] : 0,
        '--fade-size': fadeSize,
      };
    },
    [play, pauseOnHover, pauseOnClick, direction, gap, fadeSize],
  );

  const sliderStyle: CSSProperties = useMemo(
    () => ({
      '--play': play ? 'running' : 'paused',
      '--direction': direction === 'left' ? 'normal' : 'reverse',
      '--duration': `${duration}s`,
      '--delay': `${delay}s`,
      '--iteration-count': loop ? `${loop}` : 'infinite',
      '--min-width': autoFill ? 'auto' : '100%',
    }),
    [play, direction, duration, delay, loop, autoFill],
  );

  const slideStyle = useMemo(
    () => {
      const computedSlideTransform = () => {
        if (direction === 'up') return 'rotate(90deg)';
        if (direction === 'down') return 'rotate(-90deg)';
        return 'none';
      };

      return {
        '--transform': computedSlideTransform(),
      };
    },
    [direction],
  );

  // Render {multiplier} number of children
  const multiplyChildren = useCallback(
    (multiplier: number) => [
      ...Array<number>(Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0),
    ].map(_ => (
      <Fragment key={uid}>
        {Children.map(children, child => (
          <div style={slideStyle} className={styles.Slide}>
            {child}
          </div>
        ))}
      </Fragment>
    )),
    [uid, children, slideStyle],
  );

  return !isMounted ? null : (
    <div
      ref={containerRef}
      style={{ ...dynamicStyle, style }}
      className={clsx(styles.Marquee, className)}
      data-carousel-fade={fade}
      {...otherProps}
    >
      <div
        className={styles.Slider}
        style={sliderStyle}
        onAnimationIteration={onCycleComplete}
        onAnimationEnd={onFinish}
      >
        <div className={styles.ChildContainer} ref={marqueeRef}>
          {Children.map(children, child => (
            <div style={slideStyle} className={styles.Slide}>
              {child}
            </div>
          ))}
        </div>
        {multiplyChildren(multiplier - 1)}
      </div>
      <div className={styles.Slider} style={sliderStyle}>
        {multiplyChildren(multiplier)}
      </div>
    </div>
  );
};
