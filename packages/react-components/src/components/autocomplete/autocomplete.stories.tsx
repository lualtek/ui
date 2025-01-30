/* eslint-disable no-alert */
import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../..';
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

const meta = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    label: 'Autocomplete',
    invalid: false,
    icon: 'zoom',
    options,
    matchFieldWidth: false,
    style: { maxWidth: '300px' },
  },
} satisfies Meta<typeof Autocomplete>;

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
    onClickOption: value => alert(value),
  },
} satisfies Story;
