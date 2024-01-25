'use client';

import { TokensTypes } from '@lualtek/tokens';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { useMemo } from 'react';
import { FCChildrenClass } from 'src/types/custom';

import styles from './badge.module.css';

export type BadgeProps = {
  gap?: number;
  badgeSize?: number;
  color?: TokensTypes['colors'];
  showBadge?: boolean;
}

export const Badge: FCChildrenClass<BadgeProps> = ({
  children,
  className,
  gap = 4,
  badgeSize = 12,
  color = 'yellow',
  style,
  showBadge = false,
  ...otherProps
}) => {
  const dynamicStyle = useMemo(() => ({
    '--badge-size': `${badgeSize}px`,
    '--gap': `${gap}px`,
    '--badge-color': `oklch(${tkns.color[color]['50']})`,
  }), [badgeSize, gap, color]);

  return (
    <div
      className={clsx(styles.Badge, className)}
      data-badge-show={showBadge}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.Mask}>
        {children}
      </div>
    </div>
  );
};
