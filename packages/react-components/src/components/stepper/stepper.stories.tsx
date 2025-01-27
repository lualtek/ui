import type { Meta, StoryObj } from '@storybook/react';

import { Chip, ResponsiveProvider } from '@/components';

import { Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  args: {
    title: 'Sample title',
  },
  decorators: [
    (Story) => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: ({ title, step, ...otherArgs }) => (
    <>
      {Array.from(new Array(4).keys()).map((_n, i) => (
        <Stepper title={title} step={i + 1} {...otherArgs}>
          Step {step}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam amet aperiam cum dolorem doloribus
        </Stepper>
      ))}
    </>
  ),
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    heading: 'Sample title',
    step: 1,
  },
};

export const WithCustomTitle: Story = {
  args: {
    heading: <Chip>Custom title</Chip>,
    step: 1,
  },
};
