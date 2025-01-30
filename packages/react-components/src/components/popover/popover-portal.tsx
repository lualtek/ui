import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';

export type PopoverPortalProps = PopoverPrimitive.PopoverPortalProps;

export const PopoverPortal: FC<PopoverPortalProps> = ({
  children,
  ...otherProps
}) => (
  <PopoverPrimitive.Portal {...otherProps}>
    {children}
  </PopoverPrimitive.Portal>
);
