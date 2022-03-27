import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Except } from 'type-fest';

type PopoverTriggerProps = Except<PopoverPrimitive.PopoverTriggerProps, 'asChild'>;

export const PopoverTrigger = ({
  children,
  ...otherProps
}: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger asChild {...otherProps}>
    {children}
  </PopoverPrimitive.Trigger>
);
