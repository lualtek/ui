import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveProvider } from '@/components';

import { Stepper } from './stepper';

const meta = {
  title: 'Widgets/Stepper',
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
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Sample title',
    step: 1,
  },
} satisfies Story;
