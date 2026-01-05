/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import { useArgs } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { BlankButton } from '../..';
import { Lightbox, LightboxProps } from './lightbox';

const meta = {
  title: 'Dialogs/Lightbox',
  component: Lightbox,
  render: function Render({ selectedState, ...args }: LightboxProps) {
    const state = useState(0);
    const [, setIndex] = state;

    const [{ isOpen }, setIsOpen] = useArgs<{ isOpen: boolean }>();

    return (
      <>
        {args.data.map((item, index) => (
          <BlankButton
            key={item.image}
            onClick={() => {
              setIndex(index);
              setIsOpen({ isOpen: true });
            }}
          >
            <img
              style={{ width: 150, height: 150 }}
              src={item.image}
              alt={item.title}
            />
          </BlankButton>
        ))}
        <Lightbox
          {...args}
          selectedState={state}
          onClose={() => setIsOpen({ isOpen: false })}
          isOpen={isOpen}
        />
      </>
    );
  },
  args: {
    onClose: () => {
      alert('closed');
    },
    data: [{
      image: 'https://ik.imagekit.io/thingstek/photos/installations/aa-device-con-pannello_bJ5kjnb5SmR',
      title: 'Image 1',
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
