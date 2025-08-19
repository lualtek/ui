import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SlideActions } from './slide-actions';

const meta: Meta<typeof SlideActions> = {
  title: 'Actions/Slide Actions',
  component: SlideActions,
  args: {},
  argTypes: {},
} satisfies Meta<typeof SlideActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
