import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Panel } from '@/components';

import { SwipeActions } from './swipe-actions';

const meta: Meta<typeof SwipeActions> = {
  title: 'Actions/Swipe Actions',
  component: SwipeActions,
  args: {
  },
  argTypes: {},
  render: args => (
    <SwipeActions {...args}>
      <SwipeActions.Trigger>
        <Panel vibrant radius={24} vibrancyColor="soft" hPadding={24} vPadding={24} bordered>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#555' }}>Updated yesterday</p>
        </Panel>
      </SwipeActions.Trigger>
      <SwipeActions.Action
        color="#8b5cf6"
        icon={<span>E</span>}
        label="Edit"
        onClick={() => console.log('Edit clicked')}
      />
      <SwipeActions.Action
        color="#ef4444"
        icon={<span>D</span>}
        label="Delete"
        onClick={() => console.log('Delete clicked')}
      />
    </SwipeActions>
  ),
} satisfies Meta<typeof SwipeActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
