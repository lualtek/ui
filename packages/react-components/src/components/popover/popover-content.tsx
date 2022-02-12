import { TokensTypes } from '@lualtek/tokens';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverContentProps = PopoverPrimitive.PopoverContentProps & {
  showArrow?: boolean;
  arrowColor?: string;
  sideOffset?: TokensTypes['space'];
}

export const PopoverContent = ({
  showArrow = false,
  arrowColor = 'var(--dimmed-2)',
  sideOffset = 4,
  children,
  ...otherProps
}: PopoverContentProps) => (
  <PopoverPrimitive.Content sideOffset={sideOffset} {...otherProps}>
    {children}

    {showArrow && <PopoverPrimitive.Arrow fill={arrowColor} />}
  </PopoverPrimitive.Content>
);
