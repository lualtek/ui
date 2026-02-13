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

import clsx from 'clsx';
import React, { FC } from 'react';
import { Brush as ReBrush } from 'recharts';

import styles from './brush.module.css';

export type BrushProps = React.ComponentProps<typeof ReBrush>;

export const Brush: FC<BrushProps> = ({
  className,
  ...otherProps
}) => (
  <ReBrush
    {...otherProps}
    className={clsx(className, styles.Brush)}
    height={24}
    stroke="var(--cta-default)"
    travellerWidth={16}
  />
);

Brush.displayName = 'Brush';

