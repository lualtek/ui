import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Panel } from '@/components';

import { SwipeActions } from './swipe-actions';

const meta: Meta<typeof SwipeActions> = {
  title: 'Actions/Swipe Actions',
  component: SwipeActions,
  tags: ['mobile'],
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
        icon="trash"
        label="Edit"
        onClick={() => console.log('Edit clicked')}
      />
      <SwipeActions.Action
        color="green"
        icon="ai-chat"
        label="Action 2"
        onClick={() => console.log('Delete clicked')}
      />
      <SwipeActions.Action
        color="cyan"
        icon="zoom"
        label="Action 3"
        onClick={() => console.log('Delete clicked')}
      />
      <SwipeActions.Action
        color="red"
        icon="remove"
        label="My Action"
        onClick={() => console.log('Delete clicked')}
      />
    </SwipeActions>
  ),
} satisfies Meta<typeof SwipeActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const NoLabels = {} satisfies Story;
