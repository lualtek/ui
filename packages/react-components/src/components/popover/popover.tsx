/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FC } from 'react';

import { PopoverAnchor } from './popover-anchor';
import { PopoverClose } from './popover-close';
import { PopoverContent } from './popover-content';
import { PopoverPortal } from './popover-portal';
import { PopoverTrigger } from './popover-trigger';

export type PopoverProps = React.ComponentPropsWithRef<'div'> & PopoverPrimitive.PopoverProps

type PopoverComponentProps = FC<PopoverProps> & {
  Anchor: typeof PopoverAnchor;
  Close: typeof PopoverClose;
  Content: typeof PopoverContent;
  Portal: typeof PopoverPortal;
  Trigger: typeof PopoverTrigger;
}

export const Popover: PopoverComponentProps = ({
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
Popover.Portal = PopoverPortal;
