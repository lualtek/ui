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
import React from 'react';

import {
  Container,
  Separator, Text, Title,
} from '../..';
import { Prose } from './prose';

const meta: Meta<typeof Prose> = {
  title: 'Typography/Prose',
  component: Prose,
  args: {
    gap: 'big',
    children: (
      <>
        <Title as="h1" level="display" lineHeight="extra-small">Title</Title>
        <Text as="p" size={28}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium.
        </Text>
        <Title as="h2" level="2">Sample H2 Title</Title>
        <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>

        <Separator />

        <Title as="h2" level="2">Sample H2 Title</Title>
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>
        <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>
        <Title as="h3" level="3">Sample H3 Title</Title>
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>
        <Title as="h4" level="4">Sample H4 Title</Title>
        <Text as="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
          tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
          consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
        </Text>
      </>
    ),
  },
  argTypes: {
    gap: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    Story => (
      <Container dimension="medium">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Balanced = {
  args: {
    balanced: true,
  },
} satisfies Story;
