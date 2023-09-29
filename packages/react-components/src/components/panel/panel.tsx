
import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef, useMemo } from 'react';

import {
  useStyles, VibrancyBlur, VibrancyColor, VibrancySaturation,
} from '@/components';
import { Polymorphic } from '@/components/types';

import styles from './panel.module.css';

export type PanelProps = {
  /**
   * Enable or disable the vibrant effect. Add translucent and blurred background.
   */
  vibrancy?: VibrancyBlur;
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
}

type PolymorphicPanel = Polymorphic.ForwardRefComponent<'div', PanelProps>;

export const Panel = forwardRef(({
  className,
  children,
  style,
  vibrancy,
  vibrancyColor,
  vibrancySaturation,
  bordered,
  borderSide = 'all',
  radius,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  const { elevation, vibrancy: vib } = useStyles({
    vibrancy: {
      blur: vibrancy,
      saturation: vibrancySaturation,
      color: vibrancyColor,
    },
  });

  const dynamicStyle: CSSProperties = useMemo(() => ({
    '--radius': radius && tkns.radius[radius],
  }), [radius]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Panel, className)}
      data-panel-vibrancy={vibrancy}
      data-panel-bordered={bordered}
      data-panel-border-side={borderSide}
      data-panel-radius={Boolean(radius)}
      style={{
        ...elevation.style, ...dynamicStyle, ...style,
      }}
      {...vib.attributes}
      {...elevation.attributes}
      {...otherProps}
    >
      <div className={styles.PanelContent}>
        {children}
      </div>
    </Wrapper>
  );
}) as PolymorphicPanel;

Panel.displayName = 'Panel';
