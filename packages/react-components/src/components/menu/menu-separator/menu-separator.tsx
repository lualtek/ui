import type { FC } from 'react';

import type { SeparatorProps } from '@/components';
import { Separator, Stack } from '@/components';

export const MenuSeparator: FC<SeparatorProps> = ({ hPadding = 16, ...props }) => (
  <Stack as="li" role="none" vPadding={8}>
    <Separator hPadding={hPadding} {...props} />
  </Stack>
);
