'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import { type ElementRef, forwardRef, useId } from 'react';

import { Elevator } from '@/components';

import { InlineToast, type InlineToastProps } from './inline-toast';
import styles from './toast.module.css';

export type ToastProps = ToastPrimitive.ToastProps & InlineToastProps;

export const Toast = forwardRef<ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ children, open, defaultOpen, type, duration, forceMount, onOpenChange, ...otherProps }, forwardedRef) => {
    const uid = useId();

    return (
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
        <li key={`${uid}-toast`} className={styles.ToastRoot}>
          <Elevator resting={4}>
            <InlineToast isPrimitive {...otherProps}>
              {children}
            </InlineToast>
          </Elevator>
        </li>
      </ToastPrimitive.Root>
    );
  },
);

export const ToastViewport = ({ className, ...otherProps }: React.ComponentPropsWithRef<'ol'>) => (
  <ToastPrimitive.Viewport className={clsx(styles.Viewport, className)} {...otherProps} />
);

export const { ToastProvider } = ToastPrimitive;
