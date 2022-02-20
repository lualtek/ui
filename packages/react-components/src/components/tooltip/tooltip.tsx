import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {
  Children, cloneElement, ReactElement, ReactNode, useEffect, useRef, useState,
} from 'react';

import styles from './tooltip.module.css';

export type TooltipProps = PropsWithClass & TooltipPrimitive.TooltipProps & {
  trigger: ReactNode | ReactElement<HTMLButtonElement>;
}

export const Tooltip = ({
  children,
  className,
  trigger,
  delayDuration = 0,
  ...otherProps
}: TooltipProps) => {
  const [triggerCenter, setTriggerCenter] = useState<number>(0);
  const triggerRef = useRef<any>(trigger);

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

      {Children.map(trigger, child => (
        <TooltipPrimitive.Trigger asChild>
          {cloneElement(
            child as ReactElement,
            {
              ref: triggerRef,
              tabIndex: 0,
            },
          )}
        </TooltipPrimitive.Trigger>
      ))}

      <TooltipPrimitive.Content className={clsx(styles.Tooltip, className)}>
        {children}
        <TooltipPrimitive.Arrow offset={triggerCenter} fill="var(--global-foreground)" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};
