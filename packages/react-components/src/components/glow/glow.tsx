/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { FCChildrenClass } from '@/components/types';

import styles from './glow.module.css';

export type GlowProps = {
  /**
   * The distance from the edge of the card to start the glow effect
   *
   * @defaultValue 170
   */
  proximity?: number;
  /**
   * The width of the highlighted area
   *
   * @defaultValue 80
   */
  spread?: number;
  /**
   * The starting opacity of the glow effect
   */
  opacity?: number;
  /**
   * The width of the border
   */
  borderWidth?: number;
  /**
   * The color of the border
   *
   * @defaultValue 'var(--vibrancy-background-hard)'
   */
  borderColor?: string;
  /**
   * The offset of the border.
   * Nevative values will put the border outside the panel
   *
   * defaultValue -5
   */
  borderOffset?: number;
  /**
   * The power of the glow effect. Set to 0 to disable.
   *
   * @defaultValue 10
   */
  glowPower?: number;
  /**
   * The value of the radius of the inner element.
   * This will be used to set the radius of the glow effect based on `borderOffset`.
   */
  innerRadius?: TokensTypes['radius'];
  /**
   * Whether the highlight should be global and shared across all cards
   *
   * @defaultValue true
   */
  globalHighlight?: boolean;
  /**
   * Whether the highlight should be rainbow colored
   */
  rainbowColors?: boolean;
}

export const Glow: FCChildrenClass<GlowProps> = ({
  className,
  children,
  proximity = 170,
  spread = 80,
  opacity = 0,
  borderWidth = 2,
  borderColor = 'var(--vibrancy-background-hard)',
  glowPower = 10,
  borderOffset = -5,
  innerRadius,
  globalHighlight = true,
  rainbowColors = false,
  style,
  ...otherProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeOpacity, setActiveOpacity] = useState(opacity);
  const [startingAngle, setStartingAngle] = useState('0');

  const paint = useCallback(
    (event: PointerEvent) => {
      if (containerRef.current === null) return;

      // get the angle based on the center point of the card and pointer position
      // Check the card against the proximity and then start updating
      const CARD_BOUNDS = containerRef.current.getBoundingClientRect();
      // Get distance between pointer and outerbounds of card
      if (
        event?.x > CARD_BOUNDS.left - proximity
          && event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + proximity
          && event?.y > CARD_BOUNDS.top - proximity
          && event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + proximity) {
        // If within proximity set the active opacity
        setActiveOpacity(1);
      } else {
        setActiveOpacity(opacity);
      }

      const CARD_CENTER = [
        CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
        CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
      ];

      let ANGLE = Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180 / Math.PI;
      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
      setStartingAngle(String(ANGLE + 90));
    },
    [opacity, proximity],
  );

  useEffect(() => {
    document.body.addEventListener('pointermove', paint);
    return () => {
      document.body.removeEventListener('pointermove', paint);
    };
  }, [paint]);

  const dynamicStyle = useMemo(() => ({
    '--active-opacity': activeOpacity,
    '--starting-angle': startingAngle,
    '--blur': 50,
    '--spread': spread,
    '--glow-power': `${glowPower}px`,
    '--border-offset': `${borderOffset}px`,
    '--border-width': `${borderWidth}px`,
    '--border-color': borderColor,
    '--radius': innerRadius && tkns.radius[innerRadius],
  }), [
    activeOpacity, startingAngle, spread,
    glowPower, borderOffset, borderWidth,
    borderColor, innerRadius,
  ]);

  return (
    <div
      ref={containerRef}
      className={styles.Glow}
      data-glow-global={rainbowColors ? false : globalHighlight}
      data-glow-rainbow={rainbowColors}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {glowPower > 0 && <div className={styles.Light} />}
      {children}
    </div>
  );
};

Glow.displayName = 'Glow';
