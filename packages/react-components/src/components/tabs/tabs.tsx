import * as TabsPrimitive from '@radix-ui/react-tabs';
import { Children, isValidElement } from 'react';

import { TabPanel } from './tabs-panel';

export type TabsProps = TabsPrimitive.TabsProps & Record<string, unknown>;

export const Tabs = ({
  className,
  children,
  ...otherProps
}: TabsProps) => {
  const renderedChildren = Children.toArray(children).filter(Boolean);

  return (
    <TabsPrimitive.Root {...otherProps}>
      <TabsPrimitive.List>
        {Children.map(renderedChildren, child => isValidElement(child) && (
          <TabsPrimitive.Trigger
            value={child.props.value}
            disabled={child.props.disabled}
          >
            {child.props.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {renderedChildren}
    </TabsPrimitive.Root>
  );
};

Tabs.Panel = TabPanel;
