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
