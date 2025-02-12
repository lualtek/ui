'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  forwardRef, HTMLAttributes,
  useMemo,
} from 'react';

import styles from './bleed.module.css';

export type BleedProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Sets the amount of bleed on each inline side.
   */
  amount?: string | Exclude<TokensTypes['space'], string>;

  /**
   * Make the content bleed to the edges of the viewport.
   * This will ignore the `amount` prop.
   */
  full?: boolean;
}

export const Bleed = forwardRef<HTMLDivElement, BleedProps>(({
  className,
  children,
  style,
  full = false,
  amount,
  ...otherProps
}, forwardedRef) => {
  const amountType = (typeof amount === 'string') ? amount : tkns.space[amount as TokensTypes['space']];
  const dynamicStyle = useMemo(() => (
    {
      '--bleed': amount ? amountType : 0,
    }
  ), [amount, amountType]);

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

