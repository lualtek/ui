/* eslint-disable import/no-extraneous-dependencies */
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

import lualtekTheme from './lualtek-theme';

addons.setConfig({
  theme: { ...themes.dark, ...lualtekTheme },
  sidebar: {
    showRoots: true,
  },
});
