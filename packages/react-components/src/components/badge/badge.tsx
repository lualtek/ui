'use client';

import type { TokensTypes } from '@lualtek/tokens/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { Except } from 'type-fest';

import styles from './badge.module.css';

export type BadgeProps = Except<React.ComponentPropsWithRef<'div'>, 'children'> & {
  children: React.ReactElement;
  /**
   * The size of the gap border around the badge.
   * @defaultValue 4
   */
  gap?: number;
  /**
   * The size of the badge.
   * @defaultValue 12
   */
  badgeSize?: number;
  /**
   * The color of the badge.
   * @defaultValue 'yellow' (`color-yellow-50`)
   */
  color?: TokensTypes['colors'];
  /**
   * Whether to show the badge.
   * @defaultValue false
   */
  showBadge?: boolean;
  /**
   * Whether the badge should take full width of its container.
   * @defaultValue false
   */
  fullWidth?: boolean;
};

export const Badge: FC<BadgeProps> = ({
  children,
  className,
  gap = 4,
  badgeSize = 12,
  color = 'yellow',
  style,
  showBadge = false,
  fullWidth,
  ref: forwardRef,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(
    () => ({
      '--badge-size': `${badgeSize}px`,
      '--gap': `${gap}px`,
      '--badge-color': tkns.color[color]['50'],
    }),
    [badgeSize, gap, color],
  );

  return (
    <div
      ref={forwardRef}
      className={clsx(styles.Badge, className)}
      data-badge-show={showBadge}
      data-badge-fullwidth={fullWidth}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.Mask}>{children}</div>
    </div>
  );
};
