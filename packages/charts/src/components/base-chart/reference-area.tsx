import { FC } from 'react';
import type { ReferenceAreaProps as RechartReferenceAreaProps } from 'recharts';
import { ReferenceArea as RechartReferenceArea } from 'recharts';
import { Except } from 'type-fest';

export type ReferenceAreaProps = Except<
RechartReferenceAreaProps, 'fill' | 'fillOpacity'
> & {
  color?: string;
  opacity?: number;
};

export const ReferenceArea: FC<ReferenceAreaProps> = ({
  color = 'var(--dimmed-4)',
  opacity = 0.2,
  ...otherProps
}) => (
  <RechartReferenceArea
    {...otherProps}
    fill={color}
    fillOpacity={opacity}
  />
);

ReferenceArea.displayName = 'ReferenceArea';

// Esclude default props, see https://github.com/recharts/recharts/issues/544#issuecomment-2008058998
const { fill, fillOpacity, ...defaultProps } = RechartReferenceArea.defaultProps;
// @ts-expect-error https://github.com/recharts/recharts/issues/544#issuecomment-2008058998
ReferenceArea.defaultProps = defaultProps;
