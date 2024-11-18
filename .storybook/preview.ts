import '@lualtek/themes/web';
import '../packages/react-components/src/core.css';
import './overrides.css';

import { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import lualtekTheme from './lualtek-theme';

const preview: Preview = {
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
};

export default preview;
