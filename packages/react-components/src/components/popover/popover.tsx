import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopoverAnchor } from './popover-anchor';
import { PopoverClose } from './popover-close';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

export type PopoverProps = PropsWithClass & PopoverPrimitive.PopoverProps
export const Popover = ({
  children,
  className,
  ...otherProps
}: PopoverProps) => (
  <PopoverPrimitive.Root {...otherProps}>
    {children}
  </PopoverPrimitive.Root>
);

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;
Popover.Anchor = PopoverAnchor;
Popover.Close = PopoverClose;
