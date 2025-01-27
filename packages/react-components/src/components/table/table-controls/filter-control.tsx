import type { FC } from 'react';

import { Textfield, type TextfieldProps } from '@/components';

type FilterControlProps = TextfieldProps;

export const FilterControl: FC<FilterControlProps> = ({ ...otherProps }) => (
  <Textfield type="search" icon="zoom" {...otherProps} />
);
