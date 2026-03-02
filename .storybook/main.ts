// This file has been automatically migrated to valid ESM format by Storybook.

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const require = createRequire(import.meta.url);

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
    getAbsolutePath('storybook-addon-tag-badges'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  // staticDirs: [{ from: '../packages/react-components/src/fonts', to: '/fonts' }],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {},
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !prop.parent.fileName.includes('node_modules') : true),
    },
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tsconfigPaths()],
    });
  },
};

export default config;
