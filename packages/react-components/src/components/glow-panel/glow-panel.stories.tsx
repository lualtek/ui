import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea, Stack } from '@/components';

import { GlowPanel } from './glow-panel';

const meta = {
  title: 'Widgets/Glow Panel',
  component: GlowPanel,
  args: {
    bordered: true,
    radius: 24,
    vibrant: true,
    vibrancyColor: 'mid',
    proximity: 170,
    spread: 80,
    opacity: 0,
    borderWidth: 2,
    borderColor: 'var(--vibrancy-background-hard)',
    glowPower: 10,
    borderOffset: -5,
  },
  argTypes: {
    spread: {
      control: {
        type: 'range', min: 0, max: 200, step: 1,
      },
    },
    opacity: {
      control: {
        type: 'range', min: 0, max: 1, step: 0.1,
      },
    },
    glowPower: {
      control: {
        type: 'range', min: 0, max: 10, step: 1,
      },
    },
    borderOffset: {
      control: {
        type: 'range', min: -10, max: 10, step: 1,
      },
    },
    borderWidth: {
      control: {
        type: 'range', min: 1, max: 10, step: 1,
      },
    },
  },
  render: args => (
    <Stack direction="row" fill={false} columnGap={32}>
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
      <GlowPanel {...args} style={{ width: 400, height: 400 }} />
    </Stack>
  ),
} satisfies Meta<typeof GlowPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithContent = {
  args: {
    radius: undefined,
  },
  render: args => (
    <GlowPanel {...args}>
      <ScrollArea fadeDirection="vertical" useSystemStyle={false} style={{ height: 400 }}>
        <Stack vPadding={32} hPadding={32}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ut,
          beatae autem quam maxime iste excepturi ipsum, vero reiciendis natus alias
          quae asperiores eaque voluptates tempore explicabo, eum ad nihil.
        </Stack>
      </ScrollArea>
    </GlowPanel>
  ),
} satisfies Story;
