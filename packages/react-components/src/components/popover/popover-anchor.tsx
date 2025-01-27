import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { FC } from 'react';
import type { Except } from 'type-fest';

export type PopoverAnchorProps = Except<PopoverPrimitive.PopoverAnchorProps, 'asChild'>;

export const PopoverAnchor: FC<PopoverAnchorProps> = ({ children, ...otherProps }) => (
  <PopoverPrimitive.Anchor asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Anchor>
);
