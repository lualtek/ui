import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Button, IconButton, ResponsiveProvider,
  Stack, Textfield,
  Title, useOverlayContext,
} from '../..';
import { Modal } from './modal';

const ModalShell = ({ ...args }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>
      <Modal
        key="dynamic-modal"
        isOpen={isVisible}
        onClose={() => setIsVisible(false)}
        {...args}
      >
        <Modal.Content title="Modal title">
          {args.children}
        </Modal.Content>
      </Modal>
    </>
  );
};

const meta = {
  title: 'Dialogs/Modal',
  component: Modal,
  args: {
    autoFocus: true,
  },
  decorators: [
    Story => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: args => (
    <ModalShell {...args}>
      <Stack hPadding={24}>
        <Textfield label="Test" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
        distinctio qui quod ducimus libero magni earum perspiciatis.
        <button type="button">click</button>
      </Stack>
    </ModalShell>
  ),
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

const CustomContentModal = () => {
  const { onClose, titleId } = useOverlayContext();

  return (
    <Stack vAlign="center">
      <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
        <Title level="5" id={titleId}>{titleId}</Title>
        <IconButton onClick={() => onClose?.()} icon="remove" kind="flat" aria-label="Close modal" />
      </Stack>
      <Textfield label="Test" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      <img width="100%" height="auto" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
    </Stack>
  );
};

export const CustomContent = {
  render: args => (
    <ModalShell {...args}>
      <CustomContentModal />
    </ModalShell>
  ),
} satisfies Story;
