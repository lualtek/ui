/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      builder: {
        lazyCompilation: true
      }
    }
  },
  features: {
    storyStoreV7: true
  },
  addons: ['@storybook/addon-actions', '@storybook/addon-links', 'storybook-css-modules-preset', 'storybook-addon-themes', {
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false
    }
  }, {
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require('postcss')
      }
    }
  }, '@storybook/addon-mdx-gfm'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  webpackFinal: async config => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@/components'] = path.resolve(__dirname, '../src/');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  docs: {
    autodocs: false
  }
};
export default config;
