import type { Meta, StoryObj } from '@storybook/react';

import { Snaplist } from './snaplist';

const style = {
  background: 'var(--dimmed-3)',
  padding: 24,
};

const meta = {
  title: 'Navigation/Snaplist',
  component: Snaplist,
  args: {
    snapAlign: 'center',
  },
  argTypes: {
    snapAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    snapType: {
      options: ['mandatory', 'proximity'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <Snaplist {...args}>
      <div style={{ minWidth: '30vw', ...style }}>Aaskdjfhasdf </div>
      <div style={style}>Bsdfasdfa sdfsdfg</div>
      <div style={style}>Caasdfgasfg</div>
      <div style={style}>afgafgafgag afga dfgadfgD</div>
      <div style={style}>Ea gfgasdf gafgafgadfg</div>
      <div style={style}>F afgafgafg</div>
      <div style={style}>a gfafgafgafg afga fdgasdfg afga sG</div>
      <div style={style}>gf H</div>
      <div style={style}>ga fgagI</div>
      <div style={style}>Ja fgagafgafg</div>
    </Snaplist>
  ),
} satisfies Meta<typeof Snaplist>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
