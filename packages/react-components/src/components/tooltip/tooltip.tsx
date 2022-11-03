import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {
  domAnimation, LazyMotion, m,
} from 'framer-motion';
import {
  Children, cloneElement, isValidElement, ReactNode, useEffect, useRef, useState,
} from 'react';

import * as styles from './tooltip.module.css';

export type TooltipProps = PropsWithClass & TooltipPrimitive.TooltipProps & {
  trigger: ReactNode;
  side?: TooltipPrimitive.TooltipContentProps['side'];
}

const animation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const Tooltip = ({
  children,
  className,
  trigger,
  side = 'top',
  delayDuration = 0,
  ...otherProps
}: TooltipProps) => {
  const [triggerCenter, setTriggerCenter] = useState<number>(0);
  const triggerRef = useRef<HTMLHtmlElement>();

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
        <TooltipPrimitive.Content asChild side={side} className={clsx(styles.Tooltip, className)}>
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
