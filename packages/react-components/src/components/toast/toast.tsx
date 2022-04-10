import * as ToastPrimitive from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  domAnimation, LazyMotion, m,
} from 'framer-motion';
import {
  ElementRef, forwardRef,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Elevator } from '@/components';

import { InlineToast, InlineToastProps } from './inline-toast';
import styles from './toast.module.css';

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
}, forwardedRef) => {
  const seedID = useUIDSeed();
  const animation = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

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
          key={seedID('toast')}
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

export const ToastViewport = ({ className }: PropsWithClass) => (
  <ToastPrimitive.Viewport className={clsx(styles.Viewport, className)} />
);

export const { ToastProvider } = ToastPrimitive;
