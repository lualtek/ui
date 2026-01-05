/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '@/components';

import { ScrollArea } from './scroll-area';

const meta = {
  title: 'Layouts/Scroll Area',
  component: ScrollArea,
  args: {
    canScroll: true,
    gutterBehavior: 'auto',
    hideScrollbars: false,
  },
  argTypes: {
    gutterBehavior: {
      options: ['auto', 'stable', 'stable both-edges'],
      control: { type: 'inline-radio' },
    },
  },
  render: args => (
    <ScrollArea {...args} style={{ maxHeight: 300, maxWidth: 400 }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
      reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
      error animi porro voluptate natus!
      Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
      Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
      reiciendis enim quas molestias quae?
      Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
      beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
      voluptatem nostrum minus ea!
      Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
      reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
      error animi porro voluptate natus!
      Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
      Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
      reiciendis enim quas molestias quae?
      Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
      beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
      voluptatem nostrum minus ea!
      Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
      reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
      error animi porro voluptate natus!
      Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
      Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
      reiciendis enim quas molestias quae?
      Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
      beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
      voluptatem nostrum minus ea!
      Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
      Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
      reiciendis enim quas molestias quae?
      Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
      beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
      voluptatem nostrum minus ea!
      Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
      Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
      reiciendis enim quas molestias quae?
      Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
      beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
      voluptatem nostrum minus ea!
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Custom = {
  args: {
    useSystemStyle: false,
    hideScrollbars: false,
  },
} satisfies Story;

export const WithCustomColors = {
  args: {
    useSystemStyle: false,
    hideScrollbars: false,
    thumbColor: 'red',
    trackColor: 'var(--vibrancy-background-mid)',
  },
} satisfies Story;

export const hideScrollbars = {
  args: {
    useSystemStyle: false,
    hideScrollbars: true,
    thumbColor: 'red',
  },
} satisfies Story;

export const FixedGutter = {
  args: {
    useSystemStyle: false,
    hideScrollbars: false,
    gutterBehavior: 'stable',
  },
} satisfies Story;

export const WidthFade = {
  args: {
    fadeDirection: 'vertical',
    fadeSize: 16,
  },
  render: args => (
    <ScrollArea {...args} style={{ maxHeight: 300, maxWidth: 400 }}>
      <Stack vPadding={8}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
        reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
        error animi porro voluptate natus!
        Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
        Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
        reiciendis enim quas molestias quae?
        Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
        beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
        voluptatem nostrum minus ea!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
        reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
        error animi porro voluptate natus!
        Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
        Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
        reiciendis enim quas molestias quae?
        Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
        beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
        voluptatem nostrum minus ea!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.Quos temporibus veniam, possimus, velit,
        reprehenderit magnam ab totam eaque adipisci ratione praesentium explicabo voluptatum laborum eum
        error animi porro voluptate natus!
        Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
        Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
        reiciendis enim quas molestias quae?
        Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
        beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
        voluptatem nostrum minus ea!
        Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
        Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
        reiciendis enim quas molestias quae?
        Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
        beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
        voluptatem nostrum minus ea!
        Commodi eos molestias neque voluptates consectetur tempore adipisci nisi quod labore non.
        Praesentium quaerat non officia id doloribus laborum, aperiam asperiores omnis earum sequi fugit
        reiciendis enim quas molestias quae?
        Minus voluptatum odit maxime voluptas ad expedita temporibus, at sed. Iusto, expedita rerum,
        beatae ducimus ut amet ipsam ad quas, quisquam quo totam! Deserunt blanditiis doloremque
        voluptatem nostrum minus ea!
      </Stack>
    </ScrollArea>
  ),
} satisfies Story;
