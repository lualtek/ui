import type { Meta, StoryObj } from '@storybook/react';

import {
  Icon, Text, Title,
} from '../..';
import { Card } from './card';

const meta = {
  title: 'Layouts/Card',
  component: Card,
  args: {
    bordered: false,
    vibrant: false,
    highlightOnHover: false,
    children: (
      <>
        <Title level="3">Card title</Title>
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
      </>
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Vibrant = {
  args: {
    vibrant: true,
  },
};
export const Dimmed = {
  args: {
    dimmed: 0,
  },
};

export const WithLeft = {
  args: {
    left: <Icon source="sun" dimension={32} />,
  },
};

export const WithRight = {
  args: {
    right: <Icon source="sun" dimension={32} />,
  },
};

export const WithLeftAndRight = {
  args: {
    left: <Icon source="sun" dimension={32} />,
    right: <Icon source="moon-stars" dimension={32} />,
  },
};
