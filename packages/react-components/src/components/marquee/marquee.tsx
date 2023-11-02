import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import React, {
  Children,
  CSSProperties,
  forwardRef,
  Fragment,
  MutableRefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Container } from '@/components';
import { PropsClassChildren } from '@/components/types';

import styles from './marquee.module.css';

export type MarqueeProps = PropsClassChildren<{
  /**
   * Whether to automatically fill blank space in the marquee with copies of the children or not
   * @type {boolean}
   * @defaultValue false
   */
  autoFill?: boolean;
  /**
   * Whether to play or pause the marquee
   * @type {boolean}
   * @defaultValue true
   */
  play?: boolean;
  /**
   * Whether to pause the marquee when hovered
   * @type {boolean}
   * @defaultValue false
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the marquee when clicked
   * @type {boolean}
   * @defaultValue false
   */
  pauseOnClick?: boolean;
  /**
   * The direction the marquee is sliding
   * @type {"left" | "right" | "up" | "down"}
   * @defaultValue "left"
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * Speed calculated as pixels/second
   * @type {number}
   * @defaultValue 50
   */
  speed?: number;
  /**
   * Duration to delay the animation after render, in seconds
   * @type {number}
   * @defaultValue 0
   */
  delay?: number;
  /**
   * The number of times the marquee should loop, 0 is equivalent to infinite
   * @type {number}
   * @defaultValue 0
   */
  loop?: number;
  fade?: boolean;
  gap?: TokensTypes['space'];
  /**
   * A callback for when the marquee finishes scrolling and stops. Only calls if loop is non-zero.
   * @type {() => void}
   */
  onFinish?: () => void;
  /**
   * A callback for when the marquee finishes a loop.
   * Does not call if maximum loops are reached (use onFinish instead).
   * @type {() => void}
   */
  onCycleComplete?: () => void;
  /**
   * A callback function that is invoked once the marquee has finished mounting.
   * It can be utilized to recalculate the page size, if necessary.
   * @type {() => void}
   */
  onMount?: () => void;
}>;

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>((
  {
    style = {},
    className = '',
    autoFill = false,
    play = true,
    pauseOnHover = false,
    pauseOnClick = false,
    direction = 'left',
    speed = 50,
    delay = 0,
    loop = 0,
    fade,
    gap,
    onFinish,
    onCycleComplete,
    onMount,
    children,
  },
  forwardedRef,
) => {
  // React Hooks
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = (forwardedRef as MutableRefObject<HTMLDivElement>) || rootRef;
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
    if (!isMounted) return;

    calculateWidth();
    const resizeObserver = new ResizeObserver(() => calculateWidth());
    if (marqueeRef.current && containerRef.current) {
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(marqueeRef.current);
    }

    // eslint-disable-next-line consistent-return
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

  // Runs the onMount callback, if it is a function, when Marquee is mounted.
  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount();
    }
  }, [onMount]);

  // Animation duration
  const duration = useMemo(() => {
    if (autoFill) {
      return (marqueeWidth * multiplier) / speed;
    }

    return marqueeWidth < containerWidth
      ? containerWidth / speed
      : marqueeWidth / speed;
  }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--gap': gap ? tkns.space[gap] : 0,
  }), [gap]);

  const containerStyle: CSSProperties = useMemo(
    () => {
      const computedContainerDirection = () => {
        if (direction === 'up') return 'rotate(-90deg)';
        if (direction === 'down') return 'rotate(90deg)';
        return 'none';
      };

      return {
        ...style,
        '--pause-on-hover': !play || pauseOnHover ? 'paused' : 'running',
        '--pause-on-click': !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? 'paused' : 'running',
        '--width': direction === 'up' || direction === 'down' ? '100vh' : '100%',
        '--transform': computedContainerDirection(),
      };
    },
    [style, play, pauseOnHover, pauseOnClick, direction],
  );

  const marqueeStyle: CSSProperties = useMemo(
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
      const computedSlideDirection = () => {
        if (direction === 'up') return 'rotate(90deg)';
        if (direction === 'down') return 'rotate(-90deg)';
        return 'none';
      };

      return {
        '--transform': computedSlideDirection(),
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
    <Container
      className={styles.Marquee}
      data-carousel-fade={fade}
      style={{ ...dynamicStyle, style }}
      padding={false}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className={clsx(styles.Container, className)}
      >
        <div
          className={styles.Slider}
          style={marqueeStyle}
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
        <div className={styles.Slider} style={marqueeStyle}>
          {multiplyChildren(multiplier)}
        </div>
      </div>
    </Container>
  );
});
