import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { FC } from 'react';
import type { Except } from 'type-fest';

export type PopoverTriggerProps = Except<PopoverPrimitive.PopoverTriggerProps, 'asChild'>;

export const PopoverTrigger: FC<PopoverTriggerProps> = ({ children, ...otherProps }) => (
  <PopoverPrimitive.Trigger asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Trigger>
);
