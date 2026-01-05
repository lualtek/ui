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
import { Except } from 'type-fest';

import styles from './pulse-light.module.css';

export type PulseLightProps = Except<React.ComponentPropsWithRef<'span'>, 'children'> & {
  color: TokensTypes['colors'];
  dimension?: Exclude<TokensTypes['space'], string>;
}

export const PulseLight: FC<PulseLightProps> = ({
  className,
  color = 'yellow',
  style,
  dimension = 8,
  ref: forwardRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(() => ({
    '--color': color ? tkns.color?.[color][50] : undefined,
    '--light-color': color ? `var(--highlight-${color}-foreground)` : undefined,
    '--dimension': dimension ? tkns.space?.[dimension] : tkns.space?.[8],
  }), [color, dimension]);

  return (
    <span
      className={clsx(styles.PulseLight, className)}
      data-status-light-status={color}
      style={{ ...dynamicStyle, ...style }}
      ref={forwardRef}
      {...otherProps}
    />
  );
};
