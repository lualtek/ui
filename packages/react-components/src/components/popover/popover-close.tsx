import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Except } from 'type-fest';

type PopoverCloseProps = Except<PopoverPrimitive.PopoverCloseProps, 'asChild'>;

export const PopoverClose = ({
  children,
  ...otherProps
}: PopoverCloseProps) => (
  <PopoverPrimitive.Close asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Close>
);
