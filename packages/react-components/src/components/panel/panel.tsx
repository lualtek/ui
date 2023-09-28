
import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef, useMemo } from 'react';

import { Polymorphic } from '@/components/types';

import styles from './panel.module.css';

export type PanelProps = {
  /**
   * Enable or disable the vibrant effect. Add translucent and blurred background.
   */
  vibrancy?: 'soft' | 'strong';
  /**
   * Change the background color of the card.
   */
  vibrancyColor?: 'background' | 'soft' | 'mid' | 'hard';
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
}

type PolymorphicPanel = Polymorphic.ForwardRefComponent<'div', PanelProps>;

export const Panel = forwardRef(({
  className,
  children,
  style,
  vibrancy,
  vibrancyColor,
  bordered,
  borderSide = 'all',
  radius,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  const computedVibrancyBackground = vibrancyColor === 'background' ? 'var(--vibrancy-background)' : `var(--vibrancy-background-${vibrancyColor})`;

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--background': (vibrancyColor) && computedVibrancyBackground,
    '--radius': radius && tkns.radius[radius],
  }), [vibrancyColor, radius, computedVibrancyBackground]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Panel, className)}
      data-panel-vibrancy={vibrancy}
      data-panel-border-side={borderSide}
      data-panel-radius={radius}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.PanelContent}>
        {children}
      </div>
    </Wrapper>
  );
}) as PolymorphicPanel;

Panel.displayName = 'Panel';
