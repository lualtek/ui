import * as TabsPrimitive from '@radix-ui/react-tabs';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, isValidElement, useCallback, useId, useState,
} from 'react';

import { Button, Icon } from '@/components';

import styles from './tabs.module.css';
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
  const uid = useId();

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
              <Button kind="flat" dimension="big">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {child.props.icon && <Icon source={child.props.icon} dimension={18} />}
                <span className={styles.Label}>{child.props.label}</span>
                {child.props.decorator}
                {(child.props.value === activeItem) && (
                  <>
                    <m.span className={styles.Highlight} layoutId={`${uid}-tab-highlight-lazy`} />
                    <m.span className={styles.Highlight} data-highlight-alt transition={{ ease: 'easeOut', delay: 0.01 }} layoutId={`${uid}-tab-highlight`} />
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
