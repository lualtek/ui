'use client';

import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  CSSProperties, forwardRef, HTMLAttributes, useMemo,
} from 'react';

import styles from './separator.module.css';

export type SeparatorProps = HTMLAttributes<HTMLHRElement> & {
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
   * @default 2
   */
  dimmed?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  vPadding,
  hPadding,
  dimmed = 2,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--v-padding': vPadding ? tkns.space[vPadding] : 0,
      '--h-padding': hPadding ? tkns.space[hPadding] : 0,
      '--color': `var(--dimmed-${dimmed})`,
    }
  ), [vPadding, hPadding, dimmed]);

  return (
    <hr
      ref={forwardedRef}
      className={clsx(styles.Separator, className)}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    />
  );
});

Separator.displayName = 'Separator';
