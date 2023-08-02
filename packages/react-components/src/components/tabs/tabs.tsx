'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, FC, isValidElement, useCallback, useId, useState,
} from 'react';

import {
  Button, Stack, StackProps,
} from '@/components';

import styles from './tabs.module.css';
import { TabPanel, TabPanelProps } from './tabs-panel';

export type TabsProps = TabsPrimitive.TabsProps & {
  /**
   * Add extra space before and after the tab list. This property can be used to
   * align the tab list with the surrounding content.
   */
  padding?: StackProps['hPadding'];
  /**
   * Set the dimension of the tabs.
   * @default 'regular'
   */
  dimension?: 'small' | 'regular' | 'big';
};

type TabsComponent = FC<TabsProps> & {
  Panel: typeof TabPanel;
}

export const Tabs: TabsComponent = ({
  className,
  children,
  onValueChange,
  defaultValue,
  padding,
  dimension = 'regular',
  ...otherProps
}) => {
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
      data-tabs-dimension={dimension}
      className={clsx(styles.Tabs, className)}
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        <Stack
          as={TabsPrimitive.List}
          direction="row"
          fill={false}
          hAlign="start"
          hPadding={padding}
          className={styles.List}
        >
          {Children.map(children, child => isValidElement<TabPanelProps>(child) && (
            <TabsPrimitive.Trigger
              value={child.props.value}
              disabled={child.props.disabled}
              className={styles.Trigger}
              asChild
            >
              <Button kind="flat" dimension={dimension} icon={child.props.icon}>
                <Stack
                  as="span"
                  className={styles.Label}
                  direction="row"
                  vAlign="center"
                  hAlign="center"
                  columnGap={8}
                  inline
                >
                  {child.props.label}
                  {child.props.decorator}
                </Stack>
                {(child.props.value === activeItem) && (
                  <m.span className={styles.Highlight} layoutId={`${uid}-tab-highlight-lazy`} />
                )}
              </Button>
            </TabsPrimitive.Trigger>
          ))}
        </Stack>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
