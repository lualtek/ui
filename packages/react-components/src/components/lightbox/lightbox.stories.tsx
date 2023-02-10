import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Lightbox } from './lightbox';

const story: ComponentMeta<typeof Lightbox> = {
  title: 'Dialogs/Lightbox',
  component: Lightbox,
  args: {

  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof Lightbox> = ({ selectedState, ...args }) => {
  const state = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIndex] = state;
  return (
    <>
      {args.data.map((item, index) => (
        <img
          style={{ width: 150, height: 150 }}
          key={item.id}
          src={item.image}
          alt={item.title}
          onClick={() => {
            setIndex(index);
            setIsOpen(true);
          }}
        />
      ))}
      <Lightbox selectedState={state} isOpen={isOpen} {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: [{
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: 'Image 1',
  }, {
    id: '2',
    image: 'https://via.placeholder.com/250',
    title: 'Image 2',
  }],
};
