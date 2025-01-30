import type { Meta, StoryObj } from '@storybook/react';

import { Panel, ScrollArea, Stack } from '@/components';

import { Glow } from './glow';

const meta = {
  title: 'Widgets/Glow',
  component: Glow,
  args: {
    proximity: 170,
    spread: 80,
    opacity: 0,
    borderWidth: 2,
    borderColor: 'var(--vibrancy-background-hard)',
    glowPower: 10,
    borderOffset: 5,
    innerRadius: 24,
    globalHighlight: true,
    rainbowColors: false,
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
    <Stack direction="row" fill={false} columnGap={32} rowGap={32} wrap>
      <Glow {...args}>
        <Panel radius={24} bordered vibrant vibrancyColor="mid" style={{ width: 200, height: 200 }} />
      </Glow>
      <Glow {...args}>
        <Panel radius={24} bordered vibrant vibrancyColor="mid" style={{ width: 200, height: 200 }} />
      </Glow>
      <Glow {...args}>
        <Panel radius={24} bordered vibrant vibrancyColor="mid" style={{ width: 200, height: 200 }} />
      </Glow>
      <Glow {...args}>
        <Panel radius={24} bordered vibrant vibrancyColor="mid" style={{ width: 200, height: 200 }} />
      </Glow>
    </Stack>
  ),
} satisfies Meta<typeof Glow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomGlowColor = {
  args: {
    glowColor: 'var(--dimmed-3)',
  },
} satisfies Story;

export const RainbowGlow = {
  args: {
    rainbowColors: true,
  },
} satisfies Story;

export const WithContent = {
  args: {
    innerRadius: undefined,
    fitContent: true,
  },
  render: args => (
    <Glow {...args}>
      <Panel bordered style={{ width: '50vw' }}>
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
      </Panel>
    </Glow>
  ),
} satisfies Story;

export const CustomElement = {
  args: {
    innerRadius: undefined,
    fitContent: true,
  },
  render: args => (
    <Glow {...args}>
      <div
        style={{
          border: '1px solid var(--highlight-cyan-foreground)',
          width: 400,
          background: 'var(--highlight-cyan-background)',
        }}
      >
        <ScrollArea
          fadeDirection="vertical"
          useSystemStyle={false}
          thumbColor="var(--highlight-cyan-foreground)"
          style={{ height: 200 }}
        >
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
      </div>
    </Glow>
  ),
} satisfies Story;
