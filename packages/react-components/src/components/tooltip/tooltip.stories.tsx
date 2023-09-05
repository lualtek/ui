import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../..';
import { Tooltip, TooltipProvider } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Dialogs/Tooltip',
  component: Tooltip,
  args: {
    side: 'bottom',
    children: 'Tooltip',
    trigger: <Text as="mark" sentiment="informative">HTML</Text>,
  },
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <Tooltip {...args}>
      {args.children}
    </Tooltip>
  ),
  decorators: [
    Story => (
      <TooltipProvider>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit expedita,
        saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Impedit expedita, saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Impedit expedita, saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Impedit expedita, saepe numquam illo quas,Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Impedit expedita, saepe numquam illo quas,
        {' '}
        <Story />
        {' '}
        eos dolorum modi earum quidem molestias recusandae, voluptas delectus aliquam nemo temporibus.
        Quas perspiciatis sunt ut.
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
