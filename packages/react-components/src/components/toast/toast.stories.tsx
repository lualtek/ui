// import { Toast, ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { useState } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';

import { Button } from '../button';
import {
  InlineToast, Toast, ToastProvider, ToastViewport,
} from './toast';

const story: ComponentMeta<typeof InlineToast> = {
  title: 'Components/Dialogs/Inline Toast',
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

const Template: ComponentStory<typeof InlineToast> = ({ ...args }) => (
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

export const SingleLine = Template.bind({});
SingleLine.args = {
  singleLine: true,
};

const TemplateToast: ComponentStory<typeof Toast> = ({ ...args }) => {
  const [toasts, setToasts] = useState<Array<{title: string}>>([]);
  const toastsShown = useRef(0);

  const onShowToast = () => {
    setToasts(oldToasts => [
      ...oldToasts,
      {
        title: `Toast ${toastsShown.current}`,
      },
    ]);
    toastsShown.current += 1;
  };

  return (
    <ToastProvider>

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

export const RadixToast = TemplateToast.bind({});
RadixToast.args = {
  dismissable: true,
};
