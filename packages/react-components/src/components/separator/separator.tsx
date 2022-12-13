import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';

import styles from './separator.module.css';

export type SeparatorProps = HTMLAttributes<HTMLHRElement> & {
  /**
   * Add top and bottom space using margins.
   */
  vPadding?: TokensTypes['space'];
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  vPadding,
  style,
  ...otherProps
}, forwardedRef) => {
  const computedStyle: CSSProperties = {
    '--v-padding': vPadding ? tkns.space[vPadding] : 0,
  };

  return (
    <hr
      ref={forwardedRef}
      className={clsx(styles.Separator, className)}
      style={{ ...computedStyle, ...style }}
      {...otherProps}
    />
  );
});

Separator.displayName = 'Separator';
