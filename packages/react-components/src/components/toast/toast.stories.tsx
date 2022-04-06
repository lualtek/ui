import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Toast } from './toast';

const story: ComponentMeta<typeof Toast> = {
  title: 'Components/Dialogs/Toast',
  component: Toast,
  argTypes: {
    kind: {
      options: ['info', 'warning', 'neutral', 'positive', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Toast> = args => (
  <Toast {...args}>
    Cras ultricies, elit sit amet cursus consectetur, risus felis ullamcorper nulla,
    ut scelerisque sapien lorem non sem. Integer vestibulum ornare ligula, a placerat
    lectus volutpat ultrices. Aliquam commodo malesuada purus a mollis.
  </Toast>
);

export const Single = Template.bind({});
Single.args = {
  title: 'Sample title',
};
export const Dismissable = Template.bind({});
Dismissable.args = {
  dismissable: true,
};
