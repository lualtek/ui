'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/web/tokens.json';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { AnimatePresence, domMax, LazyMotion, m } from 'motion/react';
import type { FC } from 'react';
import { Children, isValidElement, useCallback, useEffect, useId, useMemo, useState } from 'react';

import { Button, Panel, Stack } from '@/components';

import styles from './tabs.module.css';
import type { TabPanelProps } from './tabs-panel';
import { TabPanel } from './tabs-panel';

type RadiusType = Record<NonNullable<TabsProps['dimension']>, Exclude<TokensTypes['radius'], string>>;

export type TabsProps = TabsPrimitive.TabsProps & {
  /**
   * Add extra space around the tab list. This property can be used to
   * add extra space between tab list and surrounding edges.
   */
  listGap?: TokensTypes['space'];
  /**
   * Set the dimension of the tabs.
   * @defaultValue "regular"
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Prevents the tabs list to fill the whole space horizontally.
   * Useful for short tabs.
   */
  inline?: boolean;
  /**
   * Makes items expand to fill the available space
   */
  segmented?: boolean;
};

type TabsComponent = FC<TabsProps> & {
  Panel: typeof TabPanel;
};

const radius: RadiusType = {
  small: 12,
  regular: 16,
  big: 24,
};

export const Tabs: TabsComponent = ({
  className,
  children,
  onValueChange,
  listGap,
  dimension = 'regular',
  inline,
  style,
  segmented = false,
  ...otherProps
}) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(otherProps.defaultValue);
  const uid = useId();

  const dynamicStyle = useMemo(
    () => ({
      '--tabs-list-gap': listGap && tkns.space[listGap],
    }),
    [listGap],
  );

  const handleOnVlaueChange = useCallback(
    (value: string) => {
      setActiveItem(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  useEffect(() => {
    if (otherProps.value) {
      setActiveItem(otherProps.value);
    }
  }, [handleOnVlaueChange, otherProps.value]);

  return (
    <TabsPrimitive.Root
      {...otherProps}
      data-tabs-dimension={dimension}
      className={clsx(styles.Tabs, className)}
      style={{ ...style, ...dynamicStyle }}
      onValueChange={handleOnVlaueChange}
      defaultValue={activeItem}
      value={activeItem}
    >
      <LazyMotion features={domMax} strict>
        <Panel
          radius={radius[dimension]}
          vPadding={4}
          hPadding={4}
          backgroundColor={0}
          className={styles.List}
          data-tabs-inline={inline}
        >
          <Stack as={TabsPrimitive.List} direction="row" fill={false} hAlign="start">
            {Children.map(
              children,
              (child) =>
                isValidElement<TabPanelProps>(child) && (
                  <TabsPrimitive.Trigger
                    value={child.props.value}
                    disabled={child.props.disabled}
                    className={styles.Trigger}
                    asChild
                  >
                    <Button kind="flat" fullWidth={segmented} dimension={dimension} icon={child.props.icon}>
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
                      <AnimatePresence key={activeItem}>
                        {child.props.value === activeItem && (
                          <m.span className={styles.Highlight} layoutId={`${uid}-tab-highlight-lazy`} />
                        )}
                      </AnimatePresence>
                    </Button>
                  </TabsPrimitive.Trigger>
                ),
            )}
          </Stack>
        </Panel>
      </LazyMotion>
      {children}
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
