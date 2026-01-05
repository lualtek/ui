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

import '@lualtek/themes/web';
import '../packages/react-components/src/core.css';
import './overrides.css';

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';

import lualtekTheme from './lualtek-theme';

const preview: Preview = {
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    withThemeByDataAttribute({
      themes: {
        auto: 'auto',
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],

  parameters: {
    backgrounds: { disable: true },
    docs: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      theme: { ...themes.dark, ...lualtekTheme },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
