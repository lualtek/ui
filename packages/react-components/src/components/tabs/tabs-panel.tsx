import * as TabsPrimitive from '@radix-ui/react-tabs';

import { IconProps } from '@/components';

export type TabPanelProps = TabsPrimitive.TabsContentProps & TabsPrimitive.TabsTriggerProps & {
  label: string;
  icon?: IconProps['source'];
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
