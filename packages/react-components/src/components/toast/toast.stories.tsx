import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InlineToast } from './toast';

const story: ComponentMeta<typeof InlineToast> = {
  title: 'Components/Dialogs/Inline Toast',
  component: InlineToast,
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
  dismissable: true,
};
