import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import {
  Children, isValidElement, useCallback, useId, useState,
} from 'react';

import {
  Button, Icon, Stack, StackProps,
} from '@/components';

import styles from './tabs.module.css';
import { TabPanel, TabPanelProps } from './tabs-panel';

export type TabsProps = TabsPrimitive.TabsProps & {
  /**
   * Add extra space before and after the tab list. This property can be used to
   * align the tab list with the surrounding content.
   */
  padding?: StackProps['hPadding'];
};

export const Tabs = ({
  className,
  children,
  onValueChange,
  defaultValue,
  padding,
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
              <Button kind="flat" dimension="big">
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
        </Stack>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
