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

/* eslint-disable no-alert */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip, ResponsiveProvider } from '../..';
import { Autocomplete } from './autocomplete';

const options = [
  {
    value: 'apple',
    children: '🍎 Apple',
    decoration: <Chip dimension="small" color="green">110 Cal</Chip>,
  },
  {
    value: 'banana',
    children: '🍌 Banana',
  },
  {
    value: 'cherry',
    children: '🍒 Cherry al;kj asdfjka s;ldfja dflkjlka; fsdk fsdlkkljd klasj fkasjl ',
  },
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    label: 'Autocomplete',
    invalid: false,
    icon: 'position-marker',
    options,
    matchFieldWidth: false,
    style: { maxWidth: '300px' },
  },
  decorators: [
    Story => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    loading: true,
  },
} satisfies Story;

export const CustomEvent = {
  args: {
    onClickOption: (value: string) => alert(value),
  },
} satisfies Story;
