import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ReactNode } from 'react';

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

export const TabPanel = ({
  children,
  label,
  ...otherProps
}: TabPanelProps) => (
  <TabsPrimitive.Content data-tabs-label={label} {...otherProps}>
    {children}
  </TabsPrimitive.Content>
);
