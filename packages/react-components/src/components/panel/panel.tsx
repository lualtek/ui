
import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import {
  useStyles, VibrancyBlur, VibrancyColor, VibrancySaturation,
} from '@/components';
import { Polymorphic } from '@/components/types';

import styles from './panel.module.css';

export type PanelProps = {
  /**
   * Set the background color of the panel between dimmed colors or custom string.
   * If `vibrant` is enabled, this will be ignored and vibrantColor will be used instead.
   */
  backgroundColor?: string | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * Set the background color of the panel between dimmed colors or custom string when hovered.
   * If `vibrant` is enabled, this will be ignored and vibrantColor will be used instead.
   */
  backgroundColorHover?: string | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * Enable or disable the vibrant effect. Add translucent and blurred background.
   *
   * @defaultValue false
   */
  vibrant?: boolean;
  /**
   * Set the vibrancy level of the panel.
   *
   * @defayltValue "strong"
   */
  vibrancyLevel?: VibrancyBlur;
  /**
   * Change the background color of the card.
   */
  vibrancyColor?: VibrancyColor;
  /**
   * Change the saturation of the elements behind the vibrancy effect.
   *
   * @defaultValue "standard"
   */
  vibrancySaturation?: VibrancySaturation;
  /**
   * Show a border around the panel.
   */
  bordered?: boolean;
  /**
 * Define the edge radius of the card.
 */
  radius?: TokensTypes['radius'];
  /**
   * Enable border on a specific side.
   * @defaultValue 'all'
   */
  borderSide?: 'all' | 'top' | 'right' | 'bottom' | 'left';
  /**
   * Set the horizontal padding (left/right)
   */
  hPadding?: TokensTypes['space'];
  /**
   * Set the vertical padding (top/bottom)
   */
  vPadding?: TokensTypes['space'];
}

type PolymorphicPanel = Polymorphic.ForwardRefComponent<'div', PanelProps>;

export const Panel = forwardRef(({
  className,
  children,
  style,
  vibrant = false,
  vibrancyLevel = 'strong',
  vibrancyColor,
  vibrancySaturation,
  bordered,
  borderSide = 'all',
  radius,
  hPadding,
  vPadding,
  backgroundColor,
  backgroundColorHover,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  const computedBackground = typeof backgroundColor === 'number' ? `var(--dimmed-${backgroundColor})` : backgroundColor;
  const computedBackgroundHover = typeof backgroundColorHover === 'number' ? `var(--dimmed-${backgroundColorHover})` : backgroundColorHover;

  const { vibrancy } = useStyles({
    vibrancy: {
      blur: vibrancyLevel,
      saturation: vibrancySaturation,
      color: vibrancyColor,
    },
  });

  const dynamicStyle = useMemo(() => ({
    '--radius': radius && tkns.radius[radius],
    '--v-padding': vPadding ? tkns.space[vPadding] : 0,
    '--h-padding': hPadding ? tkns.space[hPadding] : 0,
    '--background': vibrant ? undefined : computedBackground,
    '--background-hover': vibrant ? undefined : computedBackgroundHover,
  }), [radius, vPadding, hPadding, vibrant, computedBackground, computedBackgroundHover]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Panel, className)}
      data-panel-bordered={bordered}
      data-panel-border-side={borderSide}
      data-panel-radius={Boolean(radius)}
      data-panel-hover={Boolean(backgroundColorHover)}
      style={{ ...dynamicStyle, ...style }}
      {...vibrant && vibrancy.attributes}
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
}) as PolymorphicPanel;

Panel.displayName = 'Panel';
