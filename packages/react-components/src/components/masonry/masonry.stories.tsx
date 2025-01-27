import type { Meta, StoryObj } from '@storybook/react';

import { Masonry } from './masonry';

const sampleStyle = {
  background: 'var(--dimmed-2)',
  padding: 24,
};

const meta = {
  title: 'Layouts/Masonry',

  component: Masonry,
  args: {
    gap: 24,
  },
  argTypes: {},
  render: (args) => (
    <Masonry {...args}>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        bland
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores
        perspiciatis sed fugit aperiam?
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos{' '}
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae vo
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio{' '}
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis{' '}
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores
        perspiciatis sed fugit aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti,
        odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis sed fugit aperiam?
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores
        perspiciatis
      </div>
      <div style={sampleStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores
        perspiciatis sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti,
        odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus
        dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?
      </div>
    </Masonry>
  ),
} satisfies Meta<typeof Masonry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FixedColumns: Story = {};
export const Responsive: Story = {
  args: {
    columns: {
      default: 5,
      wide: 5,
      extraLarge: 5,
      large: 4,
      medium: 3,
      small: 2,
      extraSmall: 1,
    },
  },
};
