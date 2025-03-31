import '@lualtek/themes/web';
import '../packages/react-components/src/core.css';
import './overrides.css';

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { type ReactRenderer } from '@storybook/react';
import { Preview } from '@storybook/react';
import { } from '@storybook/react';
import { themes } from '@storybook/theming';

import lualtekTheme from './lualtek-theme';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
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
