
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
