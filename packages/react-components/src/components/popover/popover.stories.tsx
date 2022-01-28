/* eslint-disable import/no-extraneous-dependencies */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Polymorphic } from '../..';
import { Popover, PopoverContent, PopoverTrigger } from '.';

const story: ComponentMeta<Polymorphic.IntrinsicElement<typeof Popover>> = {
  title: 'Components/Actions/Popover',
  component: Popover,
};

const Template: ComponentStory<typeof Popover> = (args: any) => (
  <Popover {...args}>
    <PopoverTrigger>Trigger</PopoverTrigger>
    <PopoverContent>Content</PopoverContent>
  </Popover>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Ciao',
};

export default story;
