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
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  vPadding,
  hPadding,
  style,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--v-padding': vPadding ? tkns.space[vPadding] : 0,
      '--h-padding': hPadding ? tkns.space[hPadding] : 0,
    }
  ), [vPadding, hPadding]);

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
