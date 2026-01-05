
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

import { Separator, SeparatorProps, Stack } from '@/components';

export const MenuSeparator: FC<SeparatorProps> = ({
  hPadding = 16,
  ...props
}) => (
  <Stack as="li" role="none" vPadding={8}>
    <Separator hPadding={hPadding} {...props} />
  </Stack>
);
