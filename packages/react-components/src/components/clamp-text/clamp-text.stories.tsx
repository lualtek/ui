import { Meta, StoryFn } from '@storybook/react';

import { Container } from '../..';
import { ClampText } from './clamp-text';

const story: Meta<typeof ClampText> = {
  title: 'Typography/Clamp Text',
  component: ClampText,
  argTypes: {
    rows: {
      control: { type: 'number' },
    },
  },
};

export default story;

const Template: StoryFn<typeof ClampText> = args => (
  <Container dimension="medium">
    <ClampText {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quos, a incidunt veritatis odio ullam ea dolores, ad dolorum beatae exercitationem illo
      aut debitis cupiditate? Blanditiis voluptas enim minima excepturi nam.
    </ClampText>
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  rows: 3,
};
