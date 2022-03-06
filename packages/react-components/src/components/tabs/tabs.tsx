import * as TabsPrimitive from '@radix-ui/react-tabs';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, isValidElement, useCallback, useState,
} from 'react';

import { Button } from '@/components';

import styles from './tabs.module.css';
import { TabPanel } from './tabs-panel';

export type TabsProps = TabsPrimitive.TabsProps & Record<string, unknown>;

export const Tabs = ({
  className,
  children,
  onValueChange,
  defaultValue,
  ...otherProps
}: TabsProps) => {
  const [activeItem, setActiveItem] = useState<string>(defaultValue ?? '');

  const handleOnVlaueChange = useCallback(
    (value: string) => {
      onValueChange?.(value);
      setActiveItem(value);
    },
    [onValueChange],
  );

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={handleOnVlaueChange}
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        <TabsPrimitive.List className={styles.List}>
          {Children.map(children, child => isValidElement(child) && (
            <TabsPrimitive.Trigger
              value={child.props.value}
              disabled={child.props.disabled}
              className={styles.Trigger}
              asChild
            >
              <Button kind="flat">
                {child.props.label}
                {(child.props.value === activeItem) && 'active' && (
                  <m.span className={styles.Highlight} layoutId="highlight" />
                )}
              </Button>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {children}
      </LazyMotion>
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
