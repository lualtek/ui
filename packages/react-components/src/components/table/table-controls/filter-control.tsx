import type { FC } from 'react';

import type { TextfieldProps } from '@/components';
import { Textfield } from '@/components';

type FilterControlProps = TextfieldProps;

export const FilterControl: FC<FilterControlProps> = ({ ...otherProps }) => (
  <Textfield type="search" icon="zoom" iconPosition="start" showClearButton {...otherProps} />
);
