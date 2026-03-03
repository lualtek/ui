import '@lualtek/themes/web';
import '../packages/react-components/src/core.css';
import './overrides.css';

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';

import lualtekTheme from './lualtek-theme';

const preview: Preview = {
  decorators: [
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
