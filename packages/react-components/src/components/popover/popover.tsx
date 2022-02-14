import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ReactNode } from 'react';

import { PopoverClose } from './popover-close';
import { PopoverContent } from './popover-content';

export type PopoverProps = PropsWithClass & PopoverPrimitive.PopoverProps & {
  trigger: ReactNode;
}

export const Popover = ({
  children,
  className,
  trigger,
  ...otherProps
}: PopoverProps) => (
  <PopoverPrimitive.Root {...otherProps}>
    <PopoverPrimitive.Trigger asChild>
      {trigger}
    </PopoverPrimitive.Trigger>
    {children}
  </PopoverPrimitive.Root>
);

Popover.Content = PopoverContent;
Popover.Close = PopoverClose;
