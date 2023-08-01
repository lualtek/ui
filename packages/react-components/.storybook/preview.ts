import type { Preview } from '@storybook/react';
import { themes, ensure} from '@storybook/theming';
import lualtekTheme from './lualtek-theme';

import '@lualtek/themes/web';
import '../src/core.css';
import './overrides.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      theme: { ...themes.dark, ...lualtekTheme },
    },
    themes: {
      default: 'dark',
      list: [
        { name: 'auto', color: 'linear-gradient(to bottom right, lightgray 50%, black 50.1%)' },
        { name: 'light', color: 'lightgray' },
        { name: 'dark', color: 'black' },
      ],
      onChange: (theme) => {
        const iframe: any = document.querySelector('#storybook-preview-iframe');
        if (iframe) {
          if (theme) {
            iframe.contentDocument.documentElement.dataset.theme = theme.name;
          } else {
            iframe.contentDocument.documentElement.dataset.theme = 'auto';
          }
        }
      },
      target: 'root',
    }
  }
};

export default preview;
