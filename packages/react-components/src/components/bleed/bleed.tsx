'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  CSSProperties, forwardRef, HTMLAttributes, useMemo,
} from 'react';

import styles from './bleed.module.css';

export type BleedProps = HTMLAttributes<HTMLDivElement> &{
  /**
   * Sets the amount of bleed on each inline side.
   */
  amount: string | Exclude<TokensTypes['space'], string>;

  /**
   * Set if the bleed should be full width.
   * @importatnt This will ignore the `amount` prop.
   */
  full?: boolean;
}

export const Bleed = forwardRef<HTMLDivElement, BleedProps>(({
  className,
  children,
  style,
  full = false,
  amount = 16,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = useMemo(() => (
    {
      '--bleed': (typeof amount === 'string') ? amount : tkns.space[amount],
    }
  ), [amount]);

  return (
    <div
      ref={forwardedRef}
      className={clsx(styles.Bleed, className)}
      style={{ ...dynamicStyle, ...style }}
      data-bleed-full={full}
      {...otherProps}
    >
      {children}
    </div>
  );
});

Bleed.displayName = 'Bleed';
