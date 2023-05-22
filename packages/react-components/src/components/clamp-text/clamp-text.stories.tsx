import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '../..';
import { ClampText } from './clamp-text';

const meta = {
  title: 'Typography/Clamp Text',
  component: ClampText,
  render: args => (
    <Container dimension="medium">
      <ClampText {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
        aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
      </ClampText>
    </Container>
  ),
  argTypes: {
    rows: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof ClampText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    rows: 3,
  },
} satisfies Story;
