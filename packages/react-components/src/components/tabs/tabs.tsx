import * as TabsPrimitive from '@radix-ui/react-tabs';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, isValidElement, useCallback, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Button } from '@/components';

import * as styles from './tabs.module.css';
import { TabPanel, TabPanelProps } from './tabs-panel';

export type TabsProps = TabsPrimitive.TabsProps & Record<string, unknown>;

export const Tabs = ({
  className,
  children,
  onValueChange,
  defaultValue,
  ...otherProps
}: TabsProps) => {
  const [activeItem, setActiveItem] = useState<string>(defaultValue ?? '');
  const seedID = useUIDSeed();

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
          {Children.map(children, child => isValidElement<TabPanelProps>(child) && (
            <TabsPrimitive.Trigger
              value={child.props.value}
              disabled={child.props.disabled}
              className={styles.Trigger}
              asChild
            >
              <Button kind="flat" icon={child.props.icon}>
                {child.props.label}
                {(child.props.value === activeItem) && 'active' && (
                  <>
                    <m.span className={styles.Highlight} layoutId={seedID('tab-highlight-lazy')} />
                    <m.span className={styles.Highlight} transition={{ ease: 'easeOut', delay: 0.01 }} layoutId={seedID('tab-highlight')} />
                  </>
                )}
              </Button>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
