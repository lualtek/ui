
import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';
import {
  defaultConfig,
  type TagBadgeParameters,
// @ts-expect-error something wrong
} from 'storybook-addon-tag-badges';

import lualtekTheme from './lualtek-theme';

addons.setConfig({
  theme: { ...themes.dark, ...lualtekTheme },
  sidebar: {
    ...addons.getConfig().sidebar,
    showRoots: true,
  },
  tagBadges: [
    {
      tags: 'mobile-only',
      badge: {
        text: 'Mobile Only',
        style: {
          backgroundColor: '#001c13',
          color: '#e0eb0b',
        },
        tooltip: 'This component is designed for mobile devices and touch gestures.',
      },
      display: {
        sidebar: [{
          type: 'component',
          skipInherited: true,
        }],
        toolbar: false,
        mdx: true,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...defaultConfig,
  ] satisfies TagBadgeParameters[],
});
