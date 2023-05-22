import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Button, IconButton, OverlayContainer, ResponsiveProvider,
  Stack, Textfield,
  Title, useOverlayContext,
} from '../..';
import { Modal } from './modal';

const ModalShell = ({ ...args }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>
      <OverlayContainer onClose={() => setIsVisible(false)}>
        {isVisible && (
          <Modal
            key="dynamic-modal"
            {...args}
          >
            {args.children}
          </Modal>
        )}
      </OverlayContainer>
    </ResponsiveProvider>
  );
};

const meta = {
  title: 'Dialogs/Modal',
  component: Modal,
  args: {
    autoFocus: true,
  },
  render: args => (
    <ModalShell {...args}>
      <Modal.Content title="Modal title">
        <Textfield label="Test" />
        <Stack hPadding={24} vPadding={24}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
          distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
          distinctio qui quod ducimus libero magni earum perspiciatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam
          distinctio qui quod ducimus libero magni earum perspiciatis.
          <img width="100%" height="400" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
          <button type="button">click</button>
        </Stack>
      </Modal.Content>
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
