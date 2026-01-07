import { useState } from 'storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useRef } from 'react';

import {
  Button, InlineToast, Toast, ToastAction,
  ToastProvider, ToastViewport,
} from '../..';

const meta = {
  title: 'Dialogs/Inline Toast',
  component: InlineToast,
  args: {
    dismissable: false,
    children: 'Cras ultricies, elit sit amet cursus consectetur.',
  },
  argTypes: {
    kind: {
      options: ['info', 'warning', 'neutral', 'positive', 'danger'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <InlineToast {...args}>
      {args.children}
    </InlineToast>
  ),
} satisfies Meta<typeof InlineToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single = {
  args: {
    title: 'Sample title',
  },
} satisfies Story;

export const Dismissable = {
  args: {
    singleLine: true,
    dismissable: true,
  },
} satisfies Story;

export const WithActions = {
  args: {
    dismissable: true,
    actions: (
      <>
        {/* eslint-disable-next-line no-alert */}
        <ToastAction altText="Click me" onClick={() => alert('dio')}>
          Click Me
        </ToastAction>
        {/* eslint-disable-next-line no-alert */}
        <ToastAction altText="Click me" onClick={() => alert('dio')}>
          Click Me
        </ToastAction>
      </>
    ),
  },
} satisfies Story;

export const SingleLine = {
  args: {},
} satisfies Story;

const TemplateToast = ({ ...args }) => {
  const [toasts, setToasts] = useState<Array<{ title: string; children: ReactNode }>>([]);
  const toastsShown = useRef(0);

  const onShowToast = () => {
    setToasts(oldToasts => [
      ...oldToasts,
      {
        title: `Toast super ${toastsShown.current * 100000}`,
        children: 'Cras ultricies, elit sit amet cursus consectetur.',
      },
    ]);
    toastsShown.current += 1;
  };

  return (
    <ToastProvider duration={3000} swipeDirection="right">
      <Button onClick={onShowToast}>Click me</Button>

      {toasts.map(({ title, children }) => (
        <Toast
          key={title}
          title={title}
          {...args}
        >
          {children}
        </Toast>
      ))}

      <ToastViewport />
    </ToastProvider>
  );
};

export const Floating = TemplateToast.bind({});
