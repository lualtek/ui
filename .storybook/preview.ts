import { Preview } from "@storybook/react";
import type { ReactRenderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from '@storybook/theming';
import lualtekTheme from './lualtek-theme';

import '@lualtek/themes/web';
import '../packages/react-components/src/core.css';
import './overrides.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        auto: "auto",
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
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
};

export default preview;
