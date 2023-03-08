import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { OverlayContainer } from '../..';
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
          key={item.image}
          src={item.image}
          alt={item.title}
          onClick={() => {
            setIndex(index);
            setIsOpen(true);
          }}
        />
      ))}
      <OverlayContainer onClose={() => setIsOpen(false)}>
        {isOpen && <Lightbox {...args} selectedState={state} />}
      </OverlayContainer>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: [{
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-device-con-pannello_bJ5kjnb5SmR',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-termoigrometro_4hIRcoH4bZcf.jpeg',
    title: 'Image 1',
  }, {
    image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-tensiometro_ysEqRIkGmne.jpeg',
    title: 'Image 2',
  }],
};
