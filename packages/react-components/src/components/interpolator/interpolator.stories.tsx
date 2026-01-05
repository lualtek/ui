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
import { useCallback } from 'react';

import {
  Avatar,
  Button, Icon, LinearProgress, Stack,
} from '../..';
import { Interpolator } from './interpolator';

const meta = {
  title: 'Widgets/Interpolator',
  component: Interpolator,
  args: {
    interpolating: false,
    enterScale: [0.5, 2.5],
    exitScale: [3.5, 0.5],
    exitComponent: <Button>Button</Button>,
    enterComponent: <LinearProgress style={{ width: 300 }} />,
  },
  render: function Render({ ...args }) {
    const [{ isInterpolating }, updateArgs] = useArgs<{ isInterpolating: boolean }>();

    const handleClose = useCallback(
      () => {
        updateArgs({ isInterpolating: true });
        setTimeout(() => {
          updateArgs({ isInterpolating: false });
        }, 2000);
      }, [updateArgs],
    );

    return (
      <Stack hAlign="center" vAlign="center" fill={false} rowGap={88}>
        <button type="button" onClick={() => handleClose()}>Interpolate</button>

        <Interpolator
          {...args}
          interpolating={isInterpolating}
        />
      </Stack>
    );
  },
} satisfies Meta<typeof Interpolator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleOne = {
  args: {},
} satisfies Story;

export const ExampleTwo = {
  args: {
    enterScale: [2, 2],
    enterRotation: '5deg',
    exitRotation: '-50deg',
    exitScale: [0.5, 0.5],
    duration: 100,
    exitComponent: <Avatar dimension="big" src="https://mighty.tools/mockmind-api/content/human/72.jpg" />,
    enterComponent: <Icon dimension={32} source="check-double" />,
  },
} satisfies Story;
