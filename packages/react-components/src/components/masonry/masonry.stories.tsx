import type { Meta, StoryObj } from '@storybook/react';

import { Masonry } from './masonry';

const meta = {
  title: 'Layouts/Masonry',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  component: Masonry,
  args: {
    gap: 24,
  },
  argTypes: {},
  render: args => (
    <Masonry {...args}>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        bland
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis sed fugit aperiam?
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos
        {' '}
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae vo
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio
        {' '}
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis
        {' '}
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores
        perspiciatis sed fugit aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus
        dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis
      </div>
      <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati aut deleniti, odit beatae voluptates unde
        blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis
        sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti,
        odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda
        delectus optio maiores perspiciatis sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis
        temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?
      </div>
    </Masonry>
  ),
} satisfies Meta<typeof Masonry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
export const WithBreakPoints = {
  args: {
    columns: {
      default: 6,
      extraLarge: 5,
      large: 4,
      medium: 3,
      small: 2,
      extraSmall: 1,
    },
  },
} satisfies Story;
