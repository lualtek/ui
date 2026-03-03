'use client';

import type { FC } from 'react';
import type { ReferenceLineProps as RechartReferenceLineProps } from 'recharts';
import { ReferenceLine as RechartReferenceLine } from 'recharts';
import type { Except } from 'type-fest';

export type ReferenceLineProps = Except<RechartReferenceLineProps, 'fill' | 'stroke' | 'strokeDasharray'> & {
  dashed?: boolean;
  color?: string;
};

export const ReferenceLine: FC<ReferenceLineProps> = ({
  dashed = false,
  color = 'var(--dimmed-4)',
  ref,
  ...otherProps
}) => <RechartReferenceLine ref={ref} {...otherProps} stroke={color} strokeDasharray={dashed ? '4 4' : 'none'} />;
