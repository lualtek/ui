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

  tags: [''],
};

export default preview;
