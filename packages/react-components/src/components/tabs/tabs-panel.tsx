import * as TabsPrimitive from '@radix-ui/react-tabs';

export type TabPanelProps = TabsPrimitive.TabsContentProps & TabsPrimitive.TabsTriggerProps & {
  label: string;
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
