import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Except } from 'type-fest';

type PopoverAnchorProps = Except<PopoverPrimitive.PopoverAnchorProps, 'asChild'>;

export const PopoverAnchor = ({
  children,
  ...otherProps
}: PopoverAnchorProps) => (
  <PopoverPrimitive.Anchor asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Anchor>
);
