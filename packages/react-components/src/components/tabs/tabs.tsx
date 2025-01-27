'use client';

import type { TokensTypes } from '@lualtek/tokens/platforms/web';
import tkns from '@lualtek/tokens/platforms/web/tokens.json';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { LazyMotion, domMax, m } from 'motion/react';
import { Children, type FC, isValidElement, useCallback, useId, useState } from 'react';

import { Button, Panel, Stack } from '@/components';

import { TabPanel, type TabPanelProps } from './tabs-panel';
import styles from './tabs.module.css';

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
};

type TabsComponent = FC<TabsProps> & {
  // biome-ignore lint/style/useNamingConvention: This is a sub-component
  Panel: typeof TabPanel;
};

export const Tabs: TabsComponent = ({
  className,
  children,
  onValueChange,
  defaultValue,
  listGap,
  dimension = 'regular',
  style,
  ...otherProps
}) => {
  const [activeItem, setActiveItem] = useState<string>(defaultValue ?? '');
  const uid = useId();

  const radius: RadiusType = {
    small: 12,
    regular: 16,
    big: 24,
  };

  const handleOnVlaueChange = useCallback(
    (value: string) => {
      onValueChange?.(value);
      setActiveItem(value);
    },
    [onValueChange],
  );

  const dynamicStyle = {
    '--tabs-list-gap': listGap && tkns.space[listGap],
  };

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={handleOnVlaueChange}
      data-tabs-dimension={dimension}
      className={clsx(styles.Tabs, className)}
      style={{ ...style, ...dynamicStyle }}
      {...otherProps}
    >
      <LazyMotion features={domMax} strict>
        <Panel
          bordered
          radius={radius[dimension]}
          vPadding={4}
          hPadding={4}
          vibrant
          vibrancyColor="soft"
          className={styles.List}
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
                      {child.props.value === activeItem && (
                        <m.span className={styles.Highlight} layoutId={`${uid}-tab-highlight-lazy`} />
                      )}
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
