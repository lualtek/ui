/* eslint-disable import/no-extraneous-dependencies */
import '@lualtek/themes';
import '../src/core.css';
import './overrides.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'auto', color: 'linear-gradient(to bottom right, lightgray 50%, black 50.1%)' },
      { name: 'light', color: 'lightgray' },
      { name: 'dark', color: 'black' },
    ],
    onChange: (theme) => {
      const iframe = document.querySelector('#storybook-preview-iframe');
      if (theme) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        iframe.contentDocument.documentElement.dataset.theme = theme.name;
      } else {
        iframe.contentDocument.documentElement.dataset.theme = 'auto';
      }
    },
    target: 'root',
  },
};
