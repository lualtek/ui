'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  domAnimation, LazyMotion, m,
} from 'framer-motion';
import {
  ElementRef, forwardRef, useId,
} from 'react';

import { Elevator } from '@/components';
import { PropsWithClass } from '@/components/types';

import { InlineToast, InlineToastProps } from './inline-toast';
import styles from './toast.module.css';

export type ToastProps = ToastPrimitive.ToastProps & InlineToastProps

const animation = {
  hidden: {
    x: 20,
  },
  visible: {
    x: 0,
  },
};

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
}, forwardedRef) => {
  const uid = useId();

  return (
    <LazyMotion features={domAnimation}>
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
        <m.li
          key={`${uid}-toast`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={animation}
          transition={{
            type: 'spring',
            stiffness: 700,
            damping: 30,
          }}
        >
          <Elevator resting={4}>
            <InlineToast isPrimitive {...otherProps}>
              {children}
            </InlineToast>
          </Elevator>
        </m.li>
      </ToastPrimitive.Root>
    </LazyMotion>
  );
});

export const ToastViewport = ({ className, ...otherProps }: PropsWithClass) => (
  <ToastPrimitive.Viewport className={clsx(styles.Viewport, className)} {...otherProps} />
);

export const { ToastProvider } = ToastPrimitive;
