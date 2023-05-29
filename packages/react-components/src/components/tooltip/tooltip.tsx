'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {
  domAnimation, LazyMotion, m,
} from 'framer-motion';
import {
  Children, cloneElement, isValidElement, ReactNode, useEffect, useMemo, useRef, useState,
} from 'react';

import { PropsWithClass } from '@/components/types';

import styles from './tooltip.module.css';

export type TooltipProps = PropsWithClass<
TooltipPrimitive.TooltipProps &
TooltipPrimitive.TooltipContentProps & {
  trigger: ReactNode;
  side?: TooltipPrimitive.TooltipContentProps['side'];
}>

export const Tooltip = ({
  children,
  className,
  trigger,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset,
  delayDuration,
  ...otherProps
}: TooltipProps) => {
  const [triggerCenter, setTriggerCenter] = useState<number>(0);
  const triggerRef = useRef<HTMLHtmlElement>();

  const computeOrigin = useMemo(() => {
    if (side === 'left') {
      return { x: 20, y: 0 };
    }

    if (side === 'right') {
      return { x: -20, y: 0 };
    }

    if (side === 'top') {
      return { x: 0, y: 20 };
    }

    return { x: 0, y: -20 };
  }, [side]);

  const animation = useMemo(() => ({
    hidden: {
      opacity: 0,
      ...computeOrigin,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }), [computeOrigin]);

  useEffect(() => {
    if (triggerRef.current) setTriggerCenter(triggerRef.current.offsetWidth / 2);

    return () => {
      setTriggerCenter(0);
    };
  }, [triggerRef]);

  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      {...otherProps}
    >

      {Children.map(trigger, child => isValidElement<any>(child) && (
        <TooltipPrimitive.Trigger asChild>
          {cloneElement(
            child,
            {
              ref: triggerRef,
              tabIndex: 0,
            },
          )}
        </TooltipPrimitive.Trigger>
      ))}

      <LazyMotion features={domAnimation}>
        <TooltipPrimitive.Content
          asChild
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={clsx(styles.Tooltip, className)}
        >
          <m.div
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
            {children}
            <TooltipPrimitive.Arrow offset={triggerCenter} fill="var(--global-foreground)" />
          </m.div>
        </TooltipPrimitive.Content>
      </LazyMotion>
    </TooltipPrimitive.Root>
  );
};

export const TooltipProvider = TooltipPrimitive.Provider;
