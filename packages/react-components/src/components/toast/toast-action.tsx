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

import * as ToastPrimitive from '@radix-ui/react-toast';
import { FC } from 'react';
import { Except } from 'type-fest';

import { Button, ButtonProps } from '@/components';

export type ToastActionProps = Except<ButtonProps, 'dimension'> & ToastPrimitive.ToastActionProps

export const ToastAction: FC<ToastActionProps> = ({
  children,
  altText,
  ...otherProps
}) => (
  <ToastPrimitive.Action asChild altText={altText}>
    <Button {...otherProps} dimension="small">{children}</Button>
  </ToastPrimitive.Action>
);
