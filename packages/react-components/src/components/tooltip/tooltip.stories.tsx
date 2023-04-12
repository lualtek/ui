import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../..';
import { Tooltip, TooltipProvider } from './tooltip';

const story: Meta<typeof Tooltip> = {
  title: 'Dialogs/Tooltip',
  component: Tooltip,
  args: {
    side: 'bottom',
  },
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: StoryFn<typeof Tooltip> = args => (
  <TooltipProvider>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit expedita,
    saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Impedit expedita, saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Impedit expedita, saepe numquam illo quas, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Impedit expedita, saepe numquam illo quas,Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Impedit expedita, saepe numquam illo quas,
    {' '}
    <Tooltip {...args} trigger={<Text as="span" sentiment="informative">HTML</Text>}>
      HTML stands for HyperText Markup Language.
    </Tooltip>
    {' '}
    eos dolorum modi earum quidem molestias recusandae, voluptas delectus aliquam nemo temporibus.
    Quas perspiciatis sunt ut.
  </TooltipProvider>
);

export const Default = Template.bind({});
