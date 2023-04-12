import { Meta, StoryFn } from '@storybook/react';

import { Elevator } from './elevator';

const story: Meta<typeof Elevator> = {
  title: 'Widgets/Elevator',
  component: Elevator,
  argTypes: {
    resting: {
      options: ['0', '1', '2', '3', '4'],
      control: { type: 'select' },
    },
    hover: {
      options: ['0', '1', '2', '3', '4'],
      control: { type: 'select' },
    },
    direction: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Elevator> = args => (
  <Elevator {...args}>
    <div style={{ padding: 32, background: 'var(--dimmed-0)' }}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.
    </div>
  </Elevator>
);

export const Default = Template.bind({});
Default.args = {
  resting: 1,
};
export const WithHover = Template.bind({});
WithHover.args = {
  resting: 1,
  hover: 3,
};
