import type { Meta, StoryObj } from '@storybook/react';

import { List } from './list';

const meta = {
  title: 'Typography/List',
  component: List,
  args: {
    hideMarker: false,
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: ({ marker, markerColor, ...args }) => (
    <List {...args}>
      <List.Li marker={marker} hideMarker markerColor={markerColor}>List item text</List.Li>
      <List.Li marker={marker} markerColor={markerColor}>List item text List item textList text</List.Li>
      <List.Li marker={marker} markerColor={markerColor}>List item text</List.Li>
    </List>
  ),
} satisfies Meta<typeof List & typeof List.Li>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomMarker = {
  args: {
    marker: 'chat',
  },
} satisfies Story;

export const MarkerColor = {
  args: {
    markerColor: 'green',
  },
} satisfies Story;

export const Ordered = {
  args: {
    as: 'ol',
  },
} satisfies Story;
