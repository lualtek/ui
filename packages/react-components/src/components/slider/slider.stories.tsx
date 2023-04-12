import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Slider } from './slider';

const story: ComponentMeta<typeof Slider> = {
  title: 'Navigation/Slider',
  component: Slider,
  args: {
    snapAlign: 'center',
  },
  argTypes: {
    snapAlign: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const style = {
  background: 'var(--dimmed-3)',
  padding: 24,
};

const Template: ComponentStory<typeof Slider> = args => (
  <Slider {...args}>
    <div style={{ minWidth: '30vw', ...style }}>Aaskdjfhasdf </div>
    <div style={style}>Bsdfasdfa sdfsdfg</div>
    <div style={style}>Caasdfgasfg</div>
    <div style={style}>afgafgafgag afga dfgadfgD</div>
    <div style={style}>Ea gfgasdf gafgafgadfg</div>
    <div style={style}>F afgafgafg</div>
    <div style={style}>a gfafgafgafg afga fdgasdfg afga sG</div>
    <div style={style}>gf H</div>
    <div style={style}>ga fgagI</div>
    <div style={style}>Ja fgagafgafg</div>
  </Slider>
);

export const Default = Template.bind({});
