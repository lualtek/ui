import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { FC, ReactNode } from 'react';

import type { IconProps } from '@/components';

import styles from './tabs.module.css';

export type TabPanelProps = TabsPrimitive.TabsContentProps &
  TabsPrimitive.TabsTriggerProps & {
    /**
     * The label of the tab to show in the tab list.
     */
    label: string;
    /**
     * An optional icon to show in the tab list next to the label.
     */
    icon?: IconProps['source'];
    /**
     * Add a decorator beside the tab label
     */
    decorator?: ReactNode;
  };

export const TabPanel: FC<TabPanelProps> = ({ children, label, ...otherProps }) => (
  <TabsPrimitive.Content className={styles.Panel} data-tabs-label={label} {...otherProps}>
    {children}
  </TabsPrimitive.Content>
);
