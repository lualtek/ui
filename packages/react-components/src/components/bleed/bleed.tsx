/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  FC, useMemo,
} from 'react';

import styles from './bleed.module.css';

export type BleedProps = React.ComponentPropsWithRef<'div'> & {
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

export const Bleed: FC<BleedProps> = ({
  className,
  children,
  style,
  full = false,
  amount,
  ref: forwardedRef,
  ...otherProps
}) => {
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
};

