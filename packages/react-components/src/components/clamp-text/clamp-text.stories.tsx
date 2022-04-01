import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container } from '../..';
import { ClampText } from './clamp-text';

const story: ComponentMeta<typeof ClampText> = {
  title: 'Components/Typography/Clamp Text',
  component: ClampText,
  argTypes: {
    rows: {
      control: { type: 'number' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof ClampText> = args => (
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
