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
  ...otherProps
}) => (
  <RechartReferenceLine
    {...otherProps}
    stroke={color}
    strokeDasharray={dashed ? '4 4' : 'none'}
  />
);

ReferenceLine.displayName = 'ReferenceLine';
