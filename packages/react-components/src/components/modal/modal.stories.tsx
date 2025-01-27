import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, IconButton, ResponsiveProvider, Stack, TextChip, Textfield, Title, useOverlayContext } from '../..';
import { Modal } from './modal';

const DefaultChildren = () => (
  <Stack hPadding={24}>
    <Textfield label="Test" />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero
    magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio
    qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
    et magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum
    perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
    ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et
    magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum
    perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
    ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et
    magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum
    perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
    ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et
    magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor
    sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum
    perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
    ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et
    magnam distinctio qui quod ducimus libero magni earum perspiciatis. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
    <button type="button">click</button>
  </Stack>
);

const meta: Meta<typeof Modal> = {
  title: 'Dialogs/Modal',
  component: Modal,
  args: {
    autoFocus: true,
    children: <DefaultChildren />,
    onClose: () => {
      alert('Modal closed');
    },
  },
  decorators: [
    (Story) => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: function Render({ ...args }) {
    const [{ isVisible }, setIsVisible] = useArgs<{ isVisible: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isVisible: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Show Modal</Button>
        <Modal {...args} key="dynamic-modal" isOpen={isVisible} onClose={() => handleClose(false)}>
          <Modal.Content heading="Modal title">{args.children}</Modal.Content>
        </Modal>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

const CustomContentModal = () => {
  const { onClose, headingId } = useOverlayContext();

  return (
    <Stack vAlign="center">
      <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
        <Title level="5" id={headingId}>
          {headingId}
        </Title>
        <IconButton onClick={() => onClose?.()} icon="remove" kind="flat" aria-label="Close modal" />
      </Stack>
      <Textfield label="Test" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero
      magni earum perspiciatis.
      <img
        width="100%"
        height="auto"
        src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80"
      />
    </Stack>
  );
};

export const CustomContent = {
  args: {
    children: <CustomContentModal />,
  },
} satisfies Story;

export const WithTitleComponent = {
  args: {},
  render: function Render({ ...args }) {
    const [{ isVisible }, setIsVisible] = useArgs<{ isVisible: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isVisible: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Show Modal</Button>
        <Modal {...args} key="dynamic-modal" isOpen={isVisible} onClose={() => handleClose(false)}>
          <Modal.Content heading={<TextChip text="MA" />}>{args.children}</Modal.Content>
        </Modal>
      </>
    );
  },
} satisfies Story;
