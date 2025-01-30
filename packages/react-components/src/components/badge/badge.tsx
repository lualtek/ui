'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  forwardRef, useMemo,
} from 'react';

import styles from './badge.module.css';

export type BadgeProps = React.ComponentPropsWithRef<'div'> & {
  gap?: number;
  badgeSize?: number;
  color?: TokensTypes['colors'];
  showBadge?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  children,
  className,
  gap = 4,
  badgeSize = 12,
  color = 'yellow',
  style,
  showBadge = false,
  ...otherProps
}, forwardRef) => {
  const dynamicStyle = useMemo(() => ({
    '--badge-size': `${badgeSize}px`,
    '--gap': `${gap}px`,
    '--badge-color': tkns.color[color]['50'],
  }), [badgeSize, gap, color]);

  return (
    <div
      ref={forwardRef}
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
});
