
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

import lualtekTheme from './lualtek-theme';

addons.setConfig({
  theme: { ...themes.dark, ...lualtekTheme },
  sidebar: {
    showRoots: true,
  },
});
