/* eslint-disable no-param-reassign */
import { dirname, join, resolve } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !prop.parent.fileName.includes('node_modules') : true),
    },
  },
  viteFinal: async (config) => {
    if (config && config.resolve && config.resolve.alias) {
      config.resolve.alias['@/components'] = resolve(__dirname, '../packages/react-components/src');
      config.resolve.alias['@/charts'] = resolve(__dirname, '../packages/charts/src');
      return config;
    }

    return config;
  },
};
export default config;
