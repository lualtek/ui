import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';
import { Except } from 'type-fest';

export type PopoverCloseProps = Except<PopoverPrimitive.PopoverCloseProps, 'asChild'>;

export const PopoverClose: FC<PopoverCloseProps> = ({
  children,
  ...otherProps
}) => (
  <PopoverPrimitive.Close asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Close>
);
