import { useMemo, useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider, SliderProps } from './slider';

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  args: {
    orientation: 'horizontal',
    defaultValue: [30],
    showValues: true,
  },
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <div style={{ height: 50 }}>
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;

const DynamicTemplate = (args: SliderProps) => {
  const [sabbia, setSabbia] = useState(40); // Initial value for sabbia
  const [argilla, setArgilla] = useState(60); // Initial value for argilla

  // Calculate limo using useMemo
  const limo = useMemo(() => Math.max(0, 100 - sabbia - argilla), [sabbia, argilla]);

  const handleSabbiaChange = (values: number[]) => {
    const value = values[0];
    const adjustedArgilla = argilla > (100 - value) ? (100 - value) : argilla;
    setSabbia(value);
    setArgilla(adjustedArgilla);
  };

  const handleArgillaChange = (values: number[]) => {
    const value = values[0];
    const adjustedSabbia = sabbia > (100 - value) ? (100 - value) : sabbia;
    setArgilla(value);
    setSabbia(adjustedSabbia);
  };

  return (
    <div>
      <Slider
        label="Sabbia"
        value={[sabbia]}
        defaultValue={[sabbia]}
        onValueCommit={handleSabbiaChange}
        {...args}
      />
      <Slider
        label="Argilla"
        value={[argilla]}
        onValueCommit={handleArgillaChange}
        {...args}
      />
      <Slider
        label="Limo"
        value={[limo]}
        disabled
        {...args}
      />
    </div>
  );
};

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithLabel = {
  args: {
    label: 'Slider',
  },
} satisfies Story;

export const Double = {
  args: {
    defaultValue: [30, 70],
  },
} satisfies Story;

export const ValueLabel = {
  args: {
    defaultValue: [6000, 9000],
    min: 5000,
    max: 10000,
    valueLabel: val => (val ? `${new Intl.NumberFormat('en-GB').format(val)}K` : ''),
  },
} satisfies Story;

export const Dynamic = {
  args: {
    min: 0,
    max: 100,
  },
  render: args => <DynamicTemplate {...args} />,
} satisfies Story;
