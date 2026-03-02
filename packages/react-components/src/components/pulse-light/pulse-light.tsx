'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { Except } from 'type-fest';

import styles from './pulse-light.module.css';

export type PulseLightProps = Except<React.ComponentPropsWithRef<'span'>, 'children'> & {
  color: TokensTypes['colors'];
  dimension?: Exclude<TokensTypes['space'], string>;
};

export const PulseLight: FC<PulseLightProps> = ({
  className,
  color = 'yellow',
  style,
  dimension = 8,
  ref: forwardRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--color': color ? tkns.color?.[color][50] : undefined,
      '--light-color': color ? `var(--highlight-${color}-foreground)` : undefined,
      '--dimension': dimension ? tkns.space?.[dimension] : tkns.space?.[8],
    }),
    [color, dimension],
  );

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
