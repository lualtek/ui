// import { Toast, ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { useState } from '@storybook/addons';
import { Meta, StoryFn } from '@storybook/react';
import { useRef } from 'react';

import {
  Button, InlineToast, Toast, ToastAction,
  ToastProvider, ToastViewport,
} from '../..';

const story: Meta<typeof InlineToast> = {
  title: 'Dialogs/Inline Toast',
  component: InlineToast,
  args: {
    dismissable: false,
  },
  argTypes: {
    kind: {
      options: ['info', 'warning', 'neutral', 'positive', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof InlineToast> = ({ ...args }) => (
  <InlineToast {...args}>
    Cras ultricies, elit sit amet cursus consectetur.
  </InlineToast>
);

export const Single = Template.bind({});
Single.args = {
  title: 'Sample title',
};

export const Dismissable = Template.bind({});
Dismissable.args = {
  dismissable: true,
};

export const WithActions = Template.bind({});
WithActions.args = {
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
};

export const SingleLine = Template.bind({});
SingleLine.args = {
  singleLine: true,
};

const TemplateToast: StoryFn<typeof Toast> = ({ ...args }) => {
  const [toasts, setToasts] = useState<Array<{ title: string }>>([]);
  const toastsShown = useRef(0);

  const onShowToast = () => {
    setToasts(oldToasts => [
      ...oldToasts,
      {
        title: `Toast super ${toastsShown.current * 100000}`,
      },
    ]);
    toastsShown.current += 1;
  };

  return (
    <ToastProvider duration={3000}>
      <Button onClick={onShowToast}>Click me</Button>

      {toasts.map(({ title }) => (
        <Toast
          key={title}
          title={title}
          {...args}
        />
      ))}

      <ToastViewport />
    </ToastProvider>
  );
};

export const Floating = TemplateToast.bind({});
