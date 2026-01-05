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

import { Button, Stack } from '../..';
import { Overlay } from './overlay';

const meta = {
  title: 'Layouts/Overlay',
  component: Overlay,
  args: {
    obfuscate: true,
    children: (
      <Stack
        fill={false}
        hAlign="center"
        vAlign="center"
      >
        I am over the top
      </Stack>
    ),
  },
  render: function Render({ ...args }) {
    const [{ isVisible }, setIsVisible] = useArgs<{ isVisible: boolean }>();
    const handleClose = (visibility: boolean) => setIsVisible({ isVisible: visibility });

    return (
      <>
        <Button onClick={() => handleClose(true)}>Open Overlay</Button>
        <Overlay onClose={() => handleClose(false)} {...args}>
          {isVisible && (
            <>
              {args.children}
              <Button onClick={() => handleClose(false)}>Close</Button>
            </>
          )}
        </Overlay>
      </>
    );
  },
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
