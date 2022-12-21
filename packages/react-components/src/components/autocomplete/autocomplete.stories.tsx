import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Autocomplete } from './autocomplete';

const story: ComponentMeta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  // argTypes: {
  //   dimension: {
  //     options: ['small', 'regular', 'big'],
  //     control: { type: 'radio' },
  //   },
  // },
};

export default story;

const Template: ComponentStory<typeof Autocomplete> = args => <Autocomplete {...args} />;

export const Default = Template.bind({});
