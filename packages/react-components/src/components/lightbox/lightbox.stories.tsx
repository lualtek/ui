import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BlankButton, OverlayContainer } from '../..';
import { Lightbox, LightboxProps } from './lightbox';

const Template = ({ selectedState, ...args }: LightboxProps) => {
  const state = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIndex] = state;

  return (
    <>
      {args.data.map((item, index) => (
        <BlankButton
          key={item.image}
          onClick={() => {
            setIndex(index);
            setIsOpen(true);
          }}
        >
          <img
            style={{ width: 150, height: 150 }}
            src={item.image}
            alt={item.title}
          />
        </BlankButton>
      ))}
      <OverlayContainer onClose={() => setIsOpen(false)}>
        {isOpen && <Lightbox selectedState={state} {...args} />}
      </OverlayContainer>
    </>
  );
};

const meta = {
  title: 'Dialogs/Lightbox',
  component: Lightbox,
  render: args => <Template {...args} />,
  args: {
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
  },
} satisfies Meta<typeof Lightbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedState: [0, () => 0],
  },
} satisfies Story;
