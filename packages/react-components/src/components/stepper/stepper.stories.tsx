import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveProvider } from '@/components';

import { Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  args: {},
  decorators: [
    Story => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: ({ title, step, ...otherArgs }) => (
    <>
      {Array.from(Array(4).keys()).map((n, i) => (
        <Stepper title={`${title} #${i}`} step={i + 1} {...otherArgs}>
          Step
          {' '}
          {step}
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
    title: 'Sample title',
    step: 1,
  },
};
