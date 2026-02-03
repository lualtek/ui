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

import React, { FC } from 'react';
import { Brush as ReBrush } from 'recharts';

export type BrushProps = React.ComponentProps<typeof ReBrush>;

export const Brush: FC<BrushProps> = ({
  ...otherProps
}) => (
  <ReBrush
    {...otherProps}
    height={30}
    stroke="#8884d8"
    travellerWidth={50}
  />
);

Brush.displayName = 'Brush';

