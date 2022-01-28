/* eslint-disable import/no-extraneous-dependencies */
import { addons } from '@storybook/addons';

import lualtekTheme from './lualtek-theme';

addons.setConfig({
  theme: lualtekTheme,
  sidebar: {
    showRoots: true,
  },
});
