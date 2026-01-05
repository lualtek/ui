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

import { FC } from 'react';
import type { ReferenceLineProps as RechartReferenceLineProps } from 'recharts';
import { ReferenceLine as RechartReferenceLine } from 'recharts';
import { Except } from 'type-fest';

export type ReferenceLineProps = Except<
  RechartReferenceLineProps,
'fill' | 'stroke' | 'strokeDasharray'
> & {
  dashed?: boolean;
  color?: string;
}

export const ReferenceLine: FC<ReferenceLineProps> = ({
  className,
  dashed = false,
  color = 'var(--dimmed-4)',
  ref,
  ...otherProps
}) => (
  <RechartReferenceLine
    ref={ref}
    {...otherProps}
    stroke={color}
    strokeDasharray={dashed ? '4 4' : 'none'}
  />
);
