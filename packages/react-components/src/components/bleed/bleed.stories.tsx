import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/components';

import { Bleed } from './bleed';

const meta = {
  title: 'Layouts/Bleed',
  component: Bleed,
  render: args => (
    <Container dimension="medium" className="ContainerEx">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, necessitatibus provident
      possimus quidem voluptatum accusamus fuga,
      alias libero eligendi laboriosam numquam aperiam sint quis iusto excepturi at iste, a quas.

      <Bleed style={{ background: 'red', marginTop: 32, marginBottom: 32 }} {...args}>
        BLEEDING CONTENT
      </Bleed>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quia officiis distinctio earum
      neque assumenda odit voluptatibus quos dolores tempore molestiae maxime, impedit voluptate
      veritatis deserunt. Cum cumque reiciendis a.
    </Container>
  ),
  args: {
    amount: undefined,
    full: false,
  },
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
  },
} satisfies Story;
export const FullBleed = {
  args: {
    full: true,
  },
} satisfies Story;

