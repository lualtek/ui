import { ComponentStory, Meta } from '@storybook/react';

import { Chip, List } from '../..';
import { Autocomplete } from './autocomplete';

const story: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    label: 'Autocomplete',
    invalid: false,
  },
};

export default story;

const options = [
  {
    value: 'apple',
    children: '🍎 Apple',
    decoration: <Chip dimension="small" color="green">110 Cal</Chip>,
  },
  {
    value: 'banana',
    children: '🍌 Banana',
  },
  {
    value: 'cherry',
    children: '🍒 Cherry',
  },
];

const Template: ComponentStory<typeof Autocomplete> = args => (
  <>
    <Autocomplete
      style={{ maxWidth: '300px' }}
      icon="zoom"
      options={options}
      {...args}
    />
    <List>
      <List.Li>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus non laboriosam facere?
        {' '}
      </List.Li>
      <List.Li>
        Eum, assumenda ad sunt dolorum aspernatur quia sit! Mollitia eligendi
        accusantium alias non enim quaerat quidem fugiat architecto.
      </List.Li>
    </List>
  </>
);

export const Default = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const CustomEvent = Template.bind({});
CustomEvent.args = {
  // eslint-disable-next-line no-alert
  onClickOption: value => alert(value),
};
