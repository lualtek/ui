'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { FC } from 'react';

import { PopoverAnchor } from './popover-anchor';
import { PopoverClose } from './popover-close';
import { PopoverContent } from './popover-content';
import { PopoverPortal } from './popover-portal';
import { PopoverTrigger } from './popover-trigger';

export type PopoverProps = React.ComponentPropsWithRef<'div'> & PopoverPrimitive.PopoverProps;

type PopoverComponentProps = FC<PopoverProps> & {
  // biome-ignore lint/style/useNamingConvention: This is not a component, but a sub-component
  Anchor: typeof PopoverAnchor;
  // biome-ignore lint/style/useNamingConvention: This is not a component, but a sub-component
  Close: typeof PopoverClose;
  // biome-ignore lint/style/useNamingConvention: This is not a component, but a sub-component
  Content: typeof PopoverContent;
  // biome-ignore lint/style/useNamingConvention: This is not a component, but a sub-component
  Portal: typeof PopoverPortal;
  // biome-ignore lint/style/useNamingConvention: This is not a component, but a sub-component
  Trigger: typeof PopoverTrigger;
};

export const Popover: PopoverComponentProps = ({ children, className, ...otherProps }: PopoverProps) => (
  <PopoverPrimitive.Root {...otherProps}>{children}</PopoverPrimitive.Root>
);

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;
Popover.Anchor = PopoverAnchor;
Popover.Close = PopoverClose;
Popover.Portal = PopoverPortal;
