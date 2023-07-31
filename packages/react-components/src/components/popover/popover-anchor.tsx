import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';
import { Except } from 'type-fest';

export type PopoverAnchorProps = Except<PopoverPrimitive.PopoverAnchorProps, 'asChild'>;

export const PopoverAnchor: FC<PopoverAnchorProps> = ({
  children,
  ...otherProps
}) => (
  <PopoverPrimitive.Anchor asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Anchor>
);
