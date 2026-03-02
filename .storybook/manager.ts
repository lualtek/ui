import { type TagBadgeParameters } from 'storybook-addon-tag-badges';
import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

import lualtekTheme from './lualtek-theme';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
addons.setConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  theme: { ...themes.dark, ...lualtekTheme },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  sidebar: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
        sidebar: [
          {
            type: 'component',
            skipInherited: true,
          },
        ],
        toolbar: false,
        mdx: true,
      },
    },
  ] satisfies TagBadgeParameters[],
});
