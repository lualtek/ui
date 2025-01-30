import { FC } from 'react';

import {
  Textfield, TextfieldProps,
} from '@/components';

type FilterControlProps = TextfieldProps

export const FilterControl: FC<FilterControlProps> = ({
  ...otherProps
}) => (
  <Textfield
    type="search"
    icon="zoom"
    {...otherProps}
  />
);

