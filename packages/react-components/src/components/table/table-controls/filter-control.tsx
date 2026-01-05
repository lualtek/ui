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
    iconPosition="start"
    showClearButton
    {...otherProps}
  />
);

