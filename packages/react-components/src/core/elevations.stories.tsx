import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '../components/container';
import { Stack } from '../components/stack';

const meta = {
  title: 'Core/Elevations',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

const divStyle = {
  display: 'flex',
  width: 100,
  flexShrink: 0,
  height: 100,
  borderRadius: 8,
  placeContent: 'center',
};

export const Resting = {
  render: () => (
    <Container dimension="large">
      <Stack direction="row" rowGap={24} columnGap={88} fill={false}>
        <div data-elevation="1" style={divStyle}>1</div>
        <div data-elevation="2" style={divStyle}>2</div>
        <div data-elevation="3" style={divStyle}>3</div>
        <div data-elevation="4" style={divStyle}>4</div>
      </Stack>
    </Container>
  ),
} satisfies Story;

export const Hoverable = {
  render: () => (
    <Container dimension="large">
      <Stack direction="row" rowGap={24} columnGap={88} fill={false}>
        <div data-elevation="1" data-elevation-hover="2" style={divStyle}>1</div>
      </Stack>
    </Container>
  ),
} satisfies Story;
