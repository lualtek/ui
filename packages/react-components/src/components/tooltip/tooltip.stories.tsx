import type { Meta, StoryObj } from '@storybook/react';

import { Icon, Stack, Text } from '../..';
import { Tooltip, TooltipProvider } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Dialogs/Tooltip',
  component: Tooltip,
  args: {
    side: 'bottom',
    children: (
      <Text as="p" maxWidth="30ch">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit expedita, saepe numquam illo quas, Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Impedit expedita, saepe numquam illo quas, Lorem ipsum dolor, sit
        amet consectetur adipisicing elit.
      </Text>
    ),
    trigger: (
      <Text as="mark" sentiment="informative">
        HTML
      </Text>
    ),
  },
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  render: (args) => (
    <Stack hAlign="center" fill={false}>
      <Tooltip {...args} />
    </Stack>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSVG = {
  args: {
    align: 'end',
    alignOffset: -24,
    trigger: <Icon source="c-warning" dimension={24} />,
  },
} satisfies Story;

export const WithPortal = {
  args: {
    usePortal: true,
  },
} satisfies Story;
