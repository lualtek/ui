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

import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  FC, useId,
} from 'react';

import { Elevator } from '@/components';

import { InlineToast, InlineToastProps } from './inline-toast';
import styles from './toast.module.css';

export type ToastProps = ToastPrimitive.ToastProps & InlineToastProps & React.ComponentPropsWithRef<'li'>

// ElementRef<typeof ToastPrimitive.Root>,
export const Toast: FC<ToastProps> = ({
  children,
  open,
  defaultOpen,
  type,
  duration,
  forceMount,
  onOpenChange,
  ref: forwardedRef,
  ...otherProps
}) => {
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
};

export const ToastViewport = ({ className, ...otherProps }: React.ComponentPropsWithRef<'ol'>) => (
  <ToastPrimitive.Viewport className={clsx(styles.Viewport, className)} {...otherProps} />
);

export const { ToastProvider } = ToastPrimitive;
