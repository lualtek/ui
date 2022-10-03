import * as PopoverPrimitive from '@radix-ui/react-popover';

type PopoverPortalProps = PopoverPrimitive.PopoverPortalProps;

export const PopoverPortal = ({
  children,
  ...otherProps
}: PopoverPortalProps) => (
  <PopoverPrimitive.Portal {...otherProps}>
    {children}
  </PopoverPrimitive.Portal>
);
