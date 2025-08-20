import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

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
        <div style={{ padding: '1rem', border: '1px solid #ccc', background: '#f9f9f9' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#555' }}>Updated yesterday</p>
        </div>
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
