'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import styles from './separator.module.css';

export type SeparatorProps = React.ComponentPropsWithRef<'hr'> & {
  /**
   * Add top and bottom space using margins.
   */
  vPadding?: TokensTypes['space'];
  /**
   * Add left and right space using margins.
   */
  hPadding?: TokensTypes['space'];
  /**
   * Set the dimmed color for the seperator.
   * @defaultValue 2
   */
  dimmed?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * Set the seperator to be vertical.
   * @defaultValue false
   */
  vertical?: boolean;
};

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, vPadding, hPadding, dimmed = 2, vertical = false, style, ...otherProps }, forwardedRef) => {
    const dynamicStyle = useMemo(
      () => ({
        '--v-padding': vPadding ? tkns.space[vPadding] : 0,
        '--h-padding': hPadding ? tkns.space[hPadding] : 0,
        '--color': `var(--dimmed-${dimmed})`,
      }),
      [vPadding, hPadding, dimmed],
    );

    return (
      <hr
        ref={forwardedRef}
        className={clsx(styles.Separator, className)}
        data-separator-vertical={vertical}
        style={{ ...dynamicStyle, ...style }}
        {...otherProps}
      />
    );
  },
);
