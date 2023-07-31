import * as TabsPrimitive from '@radix-ui/react-tabs';
import { FC, ReactNode } from 'react';

import { IconProps } from '@/components';

export type TabPanelProps = TabsPrimitive.TabsContentProps & TabsPrimitive.TabsTriggerProps & {
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

export const TabPanel: FC<TabPanelProps> = ({
  children,
  label,
  ...otherProps
}) => (
  <TabsPrimitive.Content data-tabs-label={label} {...otherProps}>
    {children}
  </TabsPrimitive.Content>
);
