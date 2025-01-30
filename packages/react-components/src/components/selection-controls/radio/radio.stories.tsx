import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../..';
import { Radio } from './radio';

const meta = {
  title: 'Inputs/Radio',
  component: Radio,
  args: {
    disabled: false,
    dimension: 'regular',
  },
  render: args => (
    <fieldset>
      <Radio {...args} defaultChecked value="1" name="story" />
      <Radio {...args} value="2" name="story" />
      <Radio {...args} value="3" name="story" />
    </fieldset>
  ),
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Indeterminate = {
  render: args => (
    <fieldset>
      <Radio {...args} value="1" name="story" />
      <Radio {...args} value="2" name="story" />
      <Radio {...args} value="3" name="story" />
    </fieldset>
  ),
} satisfies Story;

export const DisabledChecked = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const WithLabel = {
  args: {
    label: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Et blanditiis dolore natus itaque fugiat eos harum ea veritatis consequatur
    deserunt, maxime similique unde ad veniam quas tempore, laboriosam accusamus nihil.`,
  },
} satisfies Story;

export const WithCustomLabel = {
  args: {
    label: <Chip color="green">Rich label</Chip>,
  },
} satisfies Story;
