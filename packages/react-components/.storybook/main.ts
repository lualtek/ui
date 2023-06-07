import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'node:path'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  docs: {
    autodocs: true,
  },
  features: {
    storyStoreV7: true,
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-addon-themes',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    }, {
      name: '@storybook/addon-styling',
      options: {
        cssModules: {
          auto: true,
          localIdentName: '[local]--[hash:base64:5]',
        },
        postCss: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    if (config && config.resolve && config.resolve.alias) {
      config.resolve.alias['@/components'] = path.resolve(__dirname, '../src/');
      return config;
    }
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

export default config;
