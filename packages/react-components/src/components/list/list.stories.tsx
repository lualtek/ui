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

import { List } from './list';

const meta = {
  title: 'Typography/List',
  component: List,
  args: {
    hideMarker: false,
    children: (
      <>
        <List.Li>List item text</List.Li>
        <List.Li>List item text List item textList text</List.Li>
        <List.Li>List item text</List.Li>
      </>
    ),
  },
  argTypes: {
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'radio' },
    },
  },
  render: ({ ...args }) => (
    <List as="ul" {...args}>
      <List.Li>List item text</List.Li>
      <List.Li>List item text List item textList text</List.Li>
      <List.Li>List item text</List.Li>
    </List>
  ),
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const WithCustomMarker = {
  args: {},
  render: ({ ...args }) => (
    <List as="ul" {...args}>
      <List.Li marker="chat" markerColor="green" hideMarker>List item text</List.Li>
      <List.Li marker="chat" markerColor="green">List item text List item textList text</List.Li>
      <List.Li marker="chat" markerColor="green">List item text</List.Li>
    </List>
  ),
} satisfies Story;

