import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useMemo } from 'storybook/preview-api';

import { Slider } from './slider';

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
  render: (args) => (
    <div style={{ height: 50 }}>
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;

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
    valueLabel: (val) => (val ? `${new Intl.NumberFormat('en-GB').format(val)}K` : ''),
  },
} satisfies Story;

export const Dynamic = {
  args: {
    min: 0,
    max: 100,
  },
  render: function Render({ ...args }) {
    const [{ sabbia = 40 }, setSabbia] = useArgs<{ sabbia: number }>();
    const [{ argilla = 60 }, setArgilla] = useArgs<{ argilla: number }>();

    // Calculate limo using useMemo
    const limo = useMemo(() => Math.max(0, 100 - sabbia - argilla), [sabbia, argilla]);

    const handleSabbiaChange = (values: number[]) => {
      const value = values[0];
      const adjustedArgilla = argilla > 100 - value ? 100 - value : argilla;
      setSabbia({ sabbia: value });
      setArgilla({ argilla: adjustedArgilla });
    };

    const handleArgillaChange = (values: number[]) => {
      const value = values[0];
      const adjustedSabbia = sabbia > 100 - value ? 100 - value : sabbia;
      setArgilla({ argilla: value });
      setSabbia({ sabbia: adjustedSabbia });
    };

    return (
      <div>
        <Slider label="Sabbia" value={[sabbia]} defaultValue={[sabbia]} onValueCommit={handleSabbiaChange} {...args} />
        <Slider label="Argilla" value={[argilla]} onValueCommit={handleArgillaChange} {...args} />
        <Slider label="Limo" value={[limo]} disabled {...args} />
      </div>
    );
  },
} satisfies Story;
