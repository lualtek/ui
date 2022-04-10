import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  ElementRef, forwardRef,
} from 'react';

import { InlineToast, InlineToastProps } from './inline-toast';

export type ToastProps = ToastPrimitive.ToastProps & InlineToastProps

export const Toast = forwardRef<
ElementRef<typeof ToastPrimitive.Root>,
ToastProps
>(({
  children,
  open,
  defaultOpen,
  type,
  duration,
  forceMount,
  onOpenChange,
  ...otherProps
}, forwardedRef) => (
  <ToastPrimitive.Root
    asChild
    ref={forwardedRef}
    open={open}
    type={type}
    duration={duration}
    forceMount={forceMount}
    onOpenChange={onOpenChange}
    defaultOpen={defaultOpen}
  >
    <InlineToast isPrimitive {...otherProps}>
      {children}
    </InlineToast>
  </ToastPrimitive.Root>
));

export const { ToastViewport, ToastProvider } = ToastPrimitive;
