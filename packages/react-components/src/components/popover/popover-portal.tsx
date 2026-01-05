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
