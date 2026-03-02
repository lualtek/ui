'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'motion/react';
import type { FC, ReactNode, Ref } from 'react';
import { Children, cloneElement, isValidElement, useMemo, useRef } from 'react';

import { ConditionalWrapper } from '@/components';

import { Elevator } from '../elevator';
import styles from './tooltip.module.css';

export type TooltipProps = TooltipPrimitive.TooltipProps &
  TooltipPrimitive.TooltipContentProps & {
    /**
     * The trigger element that will show the tooltip when hovered or focused.
     */
    trigger: ReactNode;
    /**
     * Where to place the tooltip relative to the trigger.
     *
     * @defaultValue "top"
     */
    side?: TooltipPrimitive.TooltipContentProps['side'];
    /**
     * Use a portal to render the tooltip.
     */
    usePortal?: boolean;
  };

export const Tooltip: FC<TooltipProps> = ({
  children,
  className,
  trigger,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset,
  delayDuration,
  usePortal = false,
  ...otherProps
}) => {
  const triggerRef = useRef<HTMLHtmlElement>(null);

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

  const animation = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        ...computeOrigin,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
      },
    }),
    [computeOrigin],
  );

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...otherProps}>
      {Children.map(
        trigger,
        (child) =>
          isValidElement<{
            ref: Ref<HTMLHtmlElement>;
            tabIndex: number;
          }>(child) && (
            <TooltipPrimitive.Trigger asChild>
              {cloneElement(child, {
                ref: triggerRef,
                tabIndex: 0,
              })}
            </TooltipPrimitive.Trigger>
          ),
      )}

      <LazyMotion features={domAnimation}>
        <Elevator resting={3}>
          <ConditionalWrapper
            condition={usePortal}
            wrapper={(portalContent) => <TooltipPrimitive.Portal>{portalContent}</TooltipPrimitive.Portal>}
          >
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
                <TooltipPrimitive.Arrow fill="var(--global-foreground)" className={styles.Arrow} />
              </m.div>
            </TooltipPrimitive.Content>
          </ConditionalWrapper>
        </Elevator>
      </LazyMotion>
    </TooltipPrimitive.Root>
  );
};

export const TooltipProvider = TooltipPrimitive.Provider;
