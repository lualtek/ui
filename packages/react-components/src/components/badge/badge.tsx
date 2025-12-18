'use client';

import { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import clsx from 'clsx';
import {
  FC, useMemo,
} from 'react';
import { Except } from 'type-fest';

import { PulseLight, PulseLightProps } from '../pulse-light';
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
  badgeSize?: PulseLightProps['dimension'];
  /**
   * The color of the badge.
   * @defaultValue 'yellow' (`color-yellow-50`)
   */
  color?: PulseLightProps['color'];
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
}

export const Badge: FC<BadgeProps> = ({
  children,
  className,
  gap = 4,
  badgeSize = 8,
  color = 'yellow',
  style,
  showBadge = false,
  fullWidth,
  ref: forwardRef,
  ...otherProps
}) => {
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
      data-badge-fullwidth={fullWidth}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      <div className={styles.Mask}>
        {children}
      </div>
      {showBadge && <PulseLight className={styles.Light} dimension={badgeSize} color={color} />}
    </div>
  );
};
