import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { FC } from 'react';
import type { Except } from 'type-fest';

export type PopoverCloseProps = Except<PopoverPrimitive.PopoverCloseProps, 'asChild'>;

export const PopoverClose: FC<PopoverCloseProps> = ({ children, ...otherProps }) => (
  <PopoverPrimitive.Close asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Close>
);
