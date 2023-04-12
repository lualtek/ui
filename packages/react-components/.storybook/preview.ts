/* eslint-disable import/no-extraneous-dependencies */
import '@lualtek/themes';
import '../src/core.css';
import './overrides.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
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
    list: [
      { name: 'auto', color: 'linear-gradient(to bottom right, lightgray 50%, black 50.1%)' },
      { name: 'light', color: 'lightgray' },
      { name: 'dark', color: 'black', default: true },
    ],
    onChange: (theme) => {
      const iframe = document.querySelector('#storybook-preview-iframe');
      if (theme) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // @ts-expect-error
        iframe.contentDocument.documentElement.dataset.theme = theme.name;
      } else {
        // @ts-expect-error
        iframe.contentDocument.documentElement.dataset.theme = 'auto';
      }
    },
    target: 'root',
  },
};

export default preview;
